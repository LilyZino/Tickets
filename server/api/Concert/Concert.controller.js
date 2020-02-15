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
    //const users = await User.find();
    console.log('in');

    const concerts = await Concert.find().where('genre').equals('Pop');

    res.send(concerts);
};