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

export const editConcert = async (req, res) => {
    return Concert.updateOne(
        { _id: req.body._id }, // <-- find stage
        {
            $set: { // <-- set stage
                id: req.body.id, // <-- id not _id
                artist: req.body.artist,
                location: req.body.location,
                time: req.body.time,
                genre: req.body.genre,
            }
        }
    ).then(() => {
        informConcertsUpdated();
        res.status(200).json({ message: 'Update successful!' });
    });
};

export const getConcert = async (req, res) => {
    const concert = await Concert.find(req.params.id);
    res.send(concert);
};

export const deleteConcert = async (req, res) => {
    try {
        const concert = await Concert.findByIdAndDelete(req.params.id);

        // Check for ObjectId format and post
        if (!concert) {
            return res.status(404).json({ msg: 'Concert not found' });
        }

        res.json(concert);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

export const getConcertList = async (req, res) => {
    let i;

    const myconcerts = await Ticket.find(
        { user: req.params.id },
        { concert: 1, _id: 0 }
    ).populate('concert');

    // get the concert ids
    const concertids = [];
    myconcerts.forEach((x) => { concertids.push(x.concert._id); });

    // get the concert genres
    const concertgenres = [];
    myconcerts.forEach((x) => { if (x.concert.genre) concertgenres.push(x.concert.genre); });
    concertgenres.sort();

    const names = []; const count = []; let prev2;

    // count distincts genres
    concertgenres.forEach((x) => {
        if (x !== prev2) {
            names.push(x);
            count.push(1);
        } else {
            count[count.length - 1]++;
        }
        prev2 = x;
    });
    const countOfGenres = [];

    // make an array of genre and count
    for (i = 0; i < names.length; i++) {
        countOfGenres.push({ c: count[i], name: names[i] });
    }

    // Sort the genre list by count
    const bubbleSort = (arr) => {
        for (i = 0; i < arr.length - 1; i++) {
            let change = false;
            for (let j = 0; j < arr.length - (i + 1); j++) {
                if (arr[j].c > arr[j + 1].c) {
                    change = true;
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
            if (!change) break;
        }
        return arr;
    };
    const sortedcountOfGenres = bubbleSort(countOfGenres);
    const filteredGenres = [];

    // extract the genres by ascending order
    for (i = names.length - 1; i >= 0; i--) {
        filteredGenres.push(sortedcountOfGenres[i].name);
    }
    res.send(filteredGenres);
};

export const getConcertsRecommendations = async (req, res) => {
    // get the concerts I sell tickets to
    const myconcerts = await Ticket.find(
        { user: req.params.id },
        { concert: 1, _id: 0 }
    ).populate('concert');

    // get the concert ids
    const concertids = [];
    myconcerts.forEach((x) => { concertids.push(x.concert._id); });

    // get the concert genres
    const concertgenres = [];
    myconcerts.forEach((x) => { if (x.concert.genre) concertgenres.push(x.concert.genre); });

    // get the concerts in these genres that I don't already sell
    const recConcerts = await Concert.find({
        $and: [
            { genre: { $exists: true } },
            { genre: { $in: concertgenres } },
            { _id: { $nin: concertids } }]
    });

    // From the recommended concerts get those that have available tickets
    const finalconcerts = await Ticket.find({
        concert: { $in: recConcerts },
    }, { concert: 1 }).populate('concert');

    // extract concerts from tickets
    const concerts = [];
    finalconcerts.forEach((x) => { concerts.push(x.concert); });

    res.send(concerts);
};
export const getGenres = async (req, res) => {
    const genres = await Concert.distinct('genre');
    res.send(genres);
    // res.send("genres");
};