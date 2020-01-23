import Concert from './Concert.model';

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
    res.send();
};

export const getConcert = async (req, res) => {
    const concert = await Concert.find(req.params.id);
    res.send(concert);
};