import Ticket from './Ticket.model';
import { informTicketsUpdated } from '../../config/sockets';
import path from "path";
import fs from "fs"; 

export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const addFile = async (req, res) => {
    try {
        console.log(req.body);
        if(req.body.isPhysical == 'true'){
            var newTicket = new Ticket({
                    user: req.body.userId,
                    concert: req.body.concertId,
                    price: req.body.price,
                    amount: req.body.amount,
                    isPhysical: req.body.isPhysical,
                    sold: 0
                });
            saveAfter(newTicket);
        } else {
            console.log(req.files);
            var newFile = req.files;
            var newTicket;
            fs.readFile(newFile[0].path, function (err, buffer) {
                newTicket = new Ticket({
                    user: req.body.userId,
                    concert: req.body.concertId,
                    price: req.body.price,
                    amount: req.body.amount,
                    isPhysical: req.body.isPhysical,
                    file: newFile[0].filename,
                    sold: 0
                });
                saveAfter(newTicket);
            });
        }
        async function saveAfter(newTicket) {
            try{
                const ticket = await newTicket.save();
                informTicketsUpdated();
                //res.json(ticket);
            } catch(err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        // if (!req.files || Object.keys(req.files).length === 0) {
        //     console.log("No files");
        //   return res.status(400).send('No files were uploaded.');
        // }
    }
}
export const addTicket = async (req, res) => {
    try {
        console.log(req.body);
        const newTicket = new Ticket({
            user: req.body.userId,
            concert: req.body.concertId,
            price: req.body.price,
            amount: req.body.amount,
            file: req.body.file,
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