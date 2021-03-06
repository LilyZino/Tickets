import Ticket from './Ticket.model';
import { informTicketsUpdated } from '../../config/sockets';
import { purchaseTicket } from '../../common/tickets';

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
        const newTicket = new Ticket({
            user: req.body.userId,
            concert: req.body.concertId,
            price: req.body.price,
            amount: req.body.amount,
            file: req.files[0] ? req.files[0].filename : '',
            description: req.body.desc,
            isPhysical: req.body.isPhysical
        });

        const ticket = await newTicket.save();
        informTicketsUpdated();
        res.json(ticket);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const editTicket = async (req, res) => {
    console.log(req);

    return Ticket.updateOne(
        { _id: req.body._id }, // <-- find stage
        {
            $set: { // <-- set stage
                id: req.body.id, // <-- id not _id
                user: req.body.userId,
                concert: req.body.concertId,
                price: req.body.price,
                amount: req.body.amount,
                description: req.body.desc,
                file: req.files[0] ? req.files[0].filename : '',
                isPhysical: req.body.isPhysical
            }
        }
    ).then(() => {
        res.status(200).json({ message: 'Update successful!' });
    });
};

export const buyTicket = async (req, res) => {
    const { _id, userId } = req.body;
    try {
        await purchaseTicket(_id, userId);
    } catch (error) {
        res.status(500).send('Server Error');
    }
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