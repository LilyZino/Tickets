/* eslint-disable no-use-before-define */
import Ticket from './Ticket.model';
import User from '../User/user.model';
import { informTicketsUpdated } from '../../config/sockets';
import { sendConfirmationMail, sendConfirmationOfSaleMail } from '../MailAuth/MailAuth.service';

export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const addTicket = async (req, res) => {
    try {
        let newTicket;
        if (req.files[0]) {
            newTicket = new Ticket({
                user: req.body.userId,
                concert: req.body.concertId,
                price: req.body.price,
                amount: req.body.amount,
                file: req.files[0].filename,
                description: req.body.desc,
                isPhysical: false
            });
        } else {
            newTicket = new Ticket({
                user: req.body.userId,
                concert: req.body.concertId,
                price: req.body.price,
                amount: req.body.amount,
                description: req.body.desc,
                isPhysical: true
            });
        }

        const ticket = await newTicket.save();

        informTicketsUpdated();

        res.json(ticket);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const editTicket = async (req, res) => {
    return Ticket.updateOne(
        { _id: req.body._id }, // <-- find stage
        {
            $set: { // <-- set stage
                id: req.body.id, // <-- id not _id
                user: req.body.userId,
                concert: req.body.concertId,
                price: req.body.price,
                amount: req.body.amount,
                description: req.body.desc
            }
        }
    ).then(() => {
        res.status(200).json({ message: 'Update successful!' });
    });
};

export const buyTicket = async (req, res) => {
    const { _id, seller, userId, newcredit, totalPrice } = req.body;

    const ticketId = _id;
    const buyerId = userId;

    const ticket = await Ticket.findById(_id).populate('user').populate('concert');
    const buyer = await User.findById(userId);

    try {
        // decrcease buyer credits & add to his purchases
        await User.findByIdAndUpdate(
            buyerId,
            {
                $push: {
                    purchases: {
                        ticket: {
                            _id
                        }
                    }
                },
                $inc: {
                    credits: (ticket.price * -1)
                }
            }
        );

        // update seller credit (add ticket price to seller credit)
        await User.updateOne(
            { _id: ticket.user._id },
            {
                $inc: {
                    credits: ticket.price
                }
            }
        );

        // mark ticket as sold
        await Ticket.updateOne(
            { _id: ticketId },
            {
                $set: {
                    isSold: true
                }
            }
        );

        if (ticket.user) {
            await sendConfirmationOfSaleMail(
                ticket.user.email,
                ticket.user.name,
                ticket.concert.artist,
                ticket.concert.time,
                ticket.price,
                buyer.name
            );
        }
        if (buyer) {
            await sendConfirmationMail(
                buyer.email,
                buyer.name,
                ticket.concert.artist,
                ticket.concert.time,
                ticket.concert.location,
                ticket.price,
            );
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

export const buyTicket2 = async (req, res) => {
    const { _id, seller, userId, newcredit, totalPrice } = req.body;
    await Ticket.find().where('_id').equals(_id).populate('concert')
        .then(result => {
            if (result) {
                func(result[0]);
            }
        });
    async function func(ticket) {
        try {
            const user = await User.findById(seller);
            const buyer = await User.findById(userId);
            if (user) {
                await sendConfirmationOfSaleMail(
                    user.email,
                    user.name,
                    ticket.concert.artist,
                    ticket.concert.time,
                    totalPrice,
                    buyer.name
                );
            }
            if (buyer) {
                await sendConfirmationMail(
                    buyer.email,
                    buyer.name,
                    ticket.concert.artist,
                    ticket.concert.time,
                    ticket.concert.location,
                    totalPrice,
                );
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: 'Server Error' });
        }
    }
    await User.findByIdAndUpdate(
        userId,
        {
            $push: {
                purchases: {
                    ticket: {
                        _id
                    }
                }
            },
            $set: {
                credits: newcredit
            }
        }
    );
    await User.updateOne(
        { _id: seller },
        {
            $inc: {
                credits: totalPrice
            }
        }
    );
    await Ticket.updateOne(
        { _id },
        {
            $set: {
                isSold: true
            }
        }
    );
};

export const getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        // Check for ObjectId format and post
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        res.json(ticket);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

export const getTicketsByUser = async (req, res) => {
    try {
        const tickets = await Ticket.find().where('user').equals(req.params.userId).populate('concert');

        if (!tickets) {
            return res.status(404).json({ msg: 'This user has no tickets' });
        }

        res.json(tickets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);

        // Check for ObjectId format and post
        if (!ticket) {
            return res.status(404).json({ msg: 'Ticekt not found' });
        }

        res.json(ticket);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

export const getTicketsByConcert = async (req, res) => {
    try {
        const tickets = await Ticket.find().where('concert').equals(req.params.concertId).populate('user');

        return res.send(tickets);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};