import mongoose from 'mongoose';
import User from './user.model';
import Ticket from '../Ticket/Ticket.model';
import { sendAuthenticationMail } from '../MailAuth/MailAuth.service';
import { informReportsUpdated } from '../../config/sockets';

const jwt = require('jsonwebtoken');

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const addUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name) {
        return res
            .status(400)
            .json({ msg: 'Please enter name' });
    }
    if (!password) {
        return res
            .status(400)
            .json({ msg: 'Please enter Password' });
    }
    if (!email) {
        return res
            .status(400)
            .json({ msg: 'Please enter email' });
    }
    if (!phone) {
        return res
            .status(400)
            .json({ msg: 'Please enter phone' });
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        console.log('invalid');
        return res
            .status(400)
            .json({ msg: 'email is invalid' });
    }

    try {
        let user = await User.findOne({ name });

        if (user) {
            return res
                .status(400)
                .json({ msg: 'User already exists' });
        }

        user = await User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ msg: 'Email already exists' });
        }

        user = new User({
            name, email, password, phone
        });

        await user.save();

        await sendAuthenticationMail(email, name);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const blockUser = (req, res) => {
    console.log(req.params.id);

    return User.updateOne(
        { _id: req.params.id }, // <-- find stage
        {
            $set: { // <-- set stage
                id: req.params.id, // <-- id not _id
                isBlocked: true,
            }
        }
    ).then(() => {
        res.status(200).json({ message: 'Block successful!' });
    });
};

export const unblockUser = (req, res) => {
    console.log(req.params.id);

    return User.updateOne(
        { _id: req.params.id }, // <-- find stage
        {
            $set: { // <-- set stage
                id: req.params.id, // <-- id not _id
                isBlocked: false,
            }
        }
    ).then(() => {
        res.status(200).json({ message: 'Unblock successful!' });
    });
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // Check for ObjectId format and post
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

export const getUsersSoldTicketsCount = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // Check for ObjectId format and post
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const soldTickets = await Ticket.aggregate([{
            $match: { user: new mongoose.Types.ObjectId(req.params.id) }
        },
        {
            $group: {
                _id: '$id',
                count: { $sum: 1 },
            }
        },
        ]);

        const soldTicketsCount = soldTickets[0].count;
        res.json(soldTicketsCount);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

export const login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const loggedUser = await User.findOne({ name, password });
        console.log(`user${loggedUser}`);

        if (loggedUser == null) return res.status(404).json({ msg: 'User name or password are incorrect' });

        if (!loggedUser.isAuthenticated) return res.status(404).json({ msg: 'User was not authenticated, please check your mail' });

        if (loggedUser.isBlocked) return res.status(404).json({ msg: 'User was blocked by the admin' });

        const token = jwt.sign(
            loggedUser.toJSON(),
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
        );

        return ({
            _id: loggedUser._id,
            name: loggedUser.name,
            isAdmin: loggedUser.isAdmin,
            token
        });
    } catch (error) {
        console.error(`my error:${error.message}`);
        res.status(500).send('Server Error');
    }
};

export const setUserRank = async (req, res) => {
    await User.updateOne({
        'purchases._id': req.body.rankId
    },
    {
        $inc: { 'purchases.$.rank': req.body.rank }
    }).catch((err) => {
        console.log(err);
    });

    User.updateOne(
        {
            'purchases._id': req.body.rankId
        },
        {
            $inc: { 'purchases.rank': req.body.rank }
        }
    );
    return User.updateOne(
        {
            _id: req.body.id// <-- find stage
        },
        {
            $inc: { rank: req.body.rank }
        }
    ).then(() => {
        res.status(200).json({ message: 'Update successful!' });
    });
};

export const setUserCredits = async (req, res) => {
    return User.updateOne(
        {
            _id: req.body.id// <-- find stage
        },
        {
            $inc: { credits: req.body.credits }
        }
    ).then(() => {
        res.status(200).json({ message: 'Update successful!' });
    });
};

export const getUserCredits = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);

        // Check for ObjectId format and post
        if (!id.match(/^[0-9a-fA-F]{24}$/) || !user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user.credits);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

export const getUserPurchases = async (req, res) => {
    try {
        const { id } = req.params;
        const userPurchases = await User.findById(id).populate({
            path: 'purchases.ticket',
            model: 'ticket',
            populate: {
                path: 'concert',
                model: 'concert'
            }
        }).populate({
            path: 'purchases.ticket',
            model: 'ticket',
            populate: {
                path: 'user',
                model: 'user'
            }
        });

        // Check for ObjectId format and post
        if (!id.match(/^[0-9a-fA-F]{24}$/) || !userPurchases) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(userPurchases.purchases);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

export const reportUser = async (req, res) => {
    try {
        const { ReportComplaint, target, userName } = req.body;
        const report = ReportComplaint.toString();
        const complainer = userName.toString();

        await User.findByIdAndUpdate(
            target,
            {
                $push: {
                    reports: {
                        complaint:
                            report,
                        byUser:
                            complainer
                    }
                }
            }
        );
        informReportsUpdated();
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

export const removeReport = async (req, res) => {
    try {
        const { object, target } = req.body;
        let userId = {};
        await User.find().where('name').equals(target).then((user) => {
            userId = user[0]._id;
        });

        await User.updateOne(
            {
                _id: userId
            },
            {
                $pullAll: {
                    reports: [object]
                }
            }
        );
        informReportsUpdated();
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};