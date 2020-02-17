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

export const getConcertList = async (req, res) => {
    let i;

    const myconcerts = await Ticket.find(
        { user: req.params.id },
        { concert: 1, _id: 0 }
    ).populate('concert');

    // get the concert ids
    const concertids = [];
    for (i = 0; i < myconcerts.length; i++) concertids.push(myconcerts[i].concert._id);

    // get the concert genres
    const concertgenres = [];
    for (i = 0; i < myconcerts.length; i++) if (myconcerts[i].concert.genre) concertgenres.push(myconcerts[i].concert.genre);
    concertgenres.sort();

    const names = []; const count = []; let prev2;

    for (i = 0; i < concertgenres.length; i++) {
        if (concertgenres[i] !== prev2) {
            names.push(concertgenres[i]);
            count.push(1);
        } else {
            count[count.length - 1]++;
        }
        prev2 = concertgenres[i];
    }
    const countOfGenres = [];

    for (i = 0; i < names.length; i++) {
        countOfGenres.push({ c: count[i], name: names[i] });
    }

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

    for (i = names.length - 1; i >= 0; i--) {
        filteredGenres.push(sortedcountOfGenres[i].name);
    }
    res.send(filteredGenres);
};

export const getConcertsRecommendations = async (req, res) => {
    let i;

    // get the concerts I sell tickets to
    const myconcerts = await Ticket.find(
        { user: req.params.id },
        { concert: 1, _id: 0 }
    ).populate('concert');

    // get the concert ids
    const concertids = [];
    for (i = 0; i < myconcerts.length; i++) concertids.push(myconcerts[i].concert._id);

    // get the concert genres
    const concertgenres = [];
    for (i = 0; i < myconcerts.length; i++) {
        if (myconcerts[i].concert.genre) {
            concertgenres.push(myconcerts[i].concert.genre);
        }
    }

    // get the concerts in these genres that I don't already sell
    const recConcerts = await Concert.find({
        genre: { $exists: true },
        // eslint-disable-next-line no-dupe-keys
        genre: { $in: concertgenres },
        _id: { $nin: concertids }
    });
    console.log(recConcerts);
    // From the recommended concerts get those that have available tickets
    const finalconcerts = await Ticket.find({
        concert: { $in: recConcerts },
    }, { concert: 1 }).populate('concert', 'artist location time genre', null, { sort: ['genre'] });
    console.log(finalconcerts);
    // extract concerts from tickets
    const concerts = [];
    for (i = 0; i < finalconcerts.length; i++) concerts.push(finalconcerts[i].concert);

    res.send(concerts);
};