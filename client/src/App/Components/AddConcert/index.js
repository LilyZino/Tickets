import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import AddIcon from '@material-ui/icons/Add';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Fuse from 'fuse.js';
import moment from 'moment';
import { authenticationService } from '../../_services';
import NewConcertFade from './newConcertFade';
import { registerSocketEvent, initSockets } from '../../_services/socketService';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        '&:hover': {
            transform: 'rotate(360deg)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.standard,
            })
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '15px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    submitBtn: {
        marginTop: '16px'
    },
    error: {
        textAlign: 'center',
        color: 'red'
    },
    avatar: {
        margin: 'auto',
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function AddConcert() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [suggestion, setSuggestion] = useState(false);
    const [login, setLogin] = useState(false);
    const [enteredArtist, setEnteredArtist] = useState('');
    const [enteredTime, setEnteredTime] = useState(new Date());
    const [enteredLocation, setEnteredLocation] = useState('');
    const [enteredGenre, setEnteredGenre] = useState('');
    const [concerts, setConcerts] = useState([]);
    const [concertsToSuggest] = useState([]);
    const options = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 3,
        // location: 0,
        // threshold: 0.5,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        keys: [
            'artist'
        ]
    };

    const getAllConcerts = async () => {
        const response = await axios.get('/api/concerts');
        setConcerts(response.data);
    };

    useEffect(() => {
        initSockets();
        registerSocketEvent('concerts-updated', () => {
            getAllConcerts();
        });

        getAllConcerts();
    }, []);

    const handleOpen = () => {
        if (authenticationService.currentUserValue) { setOpen(true); } else { setLogin(true); }
    };

    const handleClose = () => {
        setOpen(false);
        setLogin(false);
        setSuggestion(false);
        concertsToSuggest.pop();
    };

    const handleSuggestion = async () => {
        const { token } = authenticationService.currentUserValue.data;
        concertsToSuggest.pop();
        await axios.put('/api/concerts', {
            artist: enteredArtist,
            time: enteredTime,
            location: enteredLocation,
            genre: enteredGenre,
        }, { headers: { Authorization: `Bearer ${token}` } });
    };

    const handleSubmit = async () => {
        const timeFuse = new Fuse(concerts, {
            threshold: 0.3,
            keys: [
                'time'
            ]
        });
        const timePattern = moment(enteredTime).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        const filteredConcerts = timeFuse.search(timePattern);
        const finalConcerts = [];
        filteredConcerts.forEach((concert) => { finalConcerts.push(concert.item); });
        const fuse = new Fuse(finalConcerts, options);
        const pattern = enteredArtist;
        concertsToSuggest.push(fuse.search(pattern));
        if (concertsToSuggest[0].length > 0) {
            console.log('suggesting');
            setSuggestion(true);
        } else {
            console.log('adding');
            handleSuggestion();
            setOpen(false);
        }
    };

    return (
        <div>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <NewConcertFade
                open={open}
                AddMode
                enteredArtist={enteredArtist}
                setEnteredArtist={setEnteredArtist}
                enteredTime={enteredTime}
                setEnteredTime={setEnteredTime}
                enteredLocation={enteredLocation}
                setEnteredLocation={setEnteredLocation}
                enteredGenre={enteredGenre}
                setEnteredGenre={setEnteredGenre}
                handleSubmit={handleSubmit}
                handleClose={() => setOpen(false)}
            />
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={login}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={login}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <ErrorIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            you must login first
                        </Typography>
                    </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={suggestion}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={suggestion}>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            We found an event similar to what you entered.
                            <br />
                            If you wish to add the event anyway, press the ignore button
                        </Typography>
                        <br />
                        {concertsToSuggest[0] ? (concertsToSuggest[0].map((concert) => (
                            <div>
                                <Typography variant="h4" component="h2">
                                    {concert.item.artist}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary" variant="h6">
                                    {`${concert.item.location}, ${moment(concert.item.time).format('DD/MM/YYYY HH:mm')}${concert.item.genre ? `, ${concert.item.genre}` : ''}`}
                                </Typography>
                            </div>
                        ))) : null }
                        <Button className={classes.submitBtn} type="submit" variant="contained" color="primary" onClick={handleClose}>
                            OK, thanks!
                        </Button>
                        <Button className={classes.submitBtn} type="submit" variant="contained" color="primary" onClick={handleSuggestion}>
                            Ignore Suggestion
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}