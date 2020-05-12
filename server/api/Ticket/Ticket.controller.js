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
        const newTicket = new Ticket({
            user: req.body.userId,
            concert: req.body.concertId,
            price: req.body.price,
            amount: req.body.amount,
            sold: 0
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
    return Ticket.updateOne(
        { _id : req.body._id },  // <-- find stage
        { $set: {                // <-- set stage
           id: req.body.id,     // <-- id not _id
           user: req.body.userId,
            concert: req.body.concertId,
            price: req.body.price,
            amount: req.body.amount,
            sold: req.body.sold
          } 
        }   
      ).then(result => {
        res.status(200).json({ message: "Update successful!" });
      });
}

export const buyTicket = async (req, res) => {
    const { _id, sold, seller, userId, newcredit } = req.body;
    const ticket = await Ticket.find().where('_id').equals(_id).populate('concert').then(result => {
        if(result){
            func(result);}
        });
    async function func(ticket){
        try {
            var user = await User.findById(seller);
            if (user) {
                await sendConfirmationOfSaleMail(user.email, user.name, ticket);
            }
            var buyer = await User.findById(userId);
            if (buyer) {
                await sendConfirmationMail(buyer.email, buyer.name, ticket);
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: 'Server Error' });
        }
    }
    const mycredit = await User.updateOne(
        { _id : userId },  
        { $set: {               
            credits: newcredit
          } 
        }   
      );
    return Ticket.updateOne(
        { _id : _id },  
        { $set: {               
            sold: sold
          } 
        }   
      ).then(result => {
        res.status(200).json({ message: "Update successful!" });
      });
}

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