import mongoose from 'mongoose';
import Concert from './Concert.model';
import Ticket from '../Ticket/Ticket.model';
import User from '../User/user.model';
import { informConcertsUpdated } from '../../config/sockets';

export const getAllConcerts = async (req, res) => {
    const concerts = await Concert.find();
    res.send(concerts);
};

export const addConcert = async (req, res) => {
    const concert = new Concert({
        artist: req.body.artist,
        location: req.body.location,
        time: req.body.time,
        genre: req.body.genre
    });

    await concert.save();

    informConcertsUpdated();
    res.send();
};

export const getConcert = async (req, res) => {
    const concert = await Concert.find(req.params.id);
    res.send(concert);
};

export const getConcertsRecommendations = async (req, res) => {
    
    // get the concerts I sell tickets for
    const tickets = await Ticket.find({'user': req.params.rec}, {concert:1, _id:0}).populate('concert');
    
    // get the concert ids
    var concertids = []
    for (var i = 0; i < tickets.length; i++)
        concertids.push(tickets[i].concert._id)
    
    // get the concert genres
    var concertgenres = []
    for (var i = 0; i < tickets.length; i++)
        concertgenres.push(tickets[i].concert.genre)

    // get the concerts in this genre that I don't already sell
    const concerts2 = await Concert.find({
        genre:{ $exists: true },
        genre: {$in: concertgenres},
        _id: {$nin: concertids}
    });
    
    

    res.send(concerts2);
};