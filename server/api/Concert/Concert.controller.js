import Concert from './Concert.model';
import Ticket from '../Ticket/Ticket.model';
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
    
    // get the concerts I sell tickets to
    const myconcerts = await Ticket.find({'user': req.params.rec}, {concert:1, _id:0}).populate('concert');
    
    // get the concert ids
    var concertids = []
    for (var i = 0; i < myconcerts.length; i++)
        concertids.push(myconcerts[i].concert._id)
    
    // get the concert genres
    var concertgenres = []
    for (var i = 0; i < myconcerts.length; i++)
        concertgenres.push(myconcerts[i].concert.genre)

    // get the concerts in this genre that I don't already sell
    const recConcerts = await Concert.find({
        genre:{ $exists: true },
        genre: {$in: concertgenres},
        _id: {$nin: concertids}
    });
    
    // From the recommended concerts get those that have available tickets
    const finalconcerts = await Ticket.find({
        concert: {$in: recConcerts}
    },{'concert':1}).populate('concert');

    // extract concerts from tickets
    var concerts = []
    for (var i = 0; i < finalconcerts.length; i++)
        concerts.push(finalconcerts[i].concert)

    res.send(concerts);
};