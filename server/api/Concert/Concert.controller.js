import Concert from './Concert.model';
import { informConcertsUpdated } from '../../config/sockets';

export const getAllConcerts = async (req, res) => {
    const concerts = await Concert.find();
    res.send(concerts);
};

export const addConcert = async (req, res) => {
    const concert = new Concert({
        artist: req.body.artist,
        location: req.body.location,
        time: req.body.time
    });

    await concert.save();

    informConcertsUpdated();
    res.send();
};

export const getConcert = async (req, res) => {
    const concert = await Concert.find(req.params.id);
    res.send(concert);
};