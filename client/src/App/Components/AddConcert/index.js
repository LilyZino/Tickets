import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import AddIcon from '@material-ui/icons/Add';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { authenticationService } from '../../_services';


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
    rotation: {

    }
}));

export default function AddTicket() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [enteredArtist, setEnteredArtist] = useState('');
    const [enteredTime, setEnteredTime] = useState(new Date());
    const [enteredLocation, setEnteredLocation] = useState('');
    const [enteredGenre, setEnteredGenre] = useState('');

    const handleOpen = () => {
        if (authenticationService.currentUserValue) { setOpen(true); } else { setLogin(true); }
    };

    const handleClose = () => {
        setOpen(false);
        setLogin(false);
    };

    const handleSubmit = async () => {
        const { token } = authenticationService.currentUserValue.data;
        const userId = authenticationService.currentUserValue.data
            ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
        await axios.put('/api/concerts', {
            artist: enteredArtist,
            time: enteredTime,
            location: enteredLocation,
            genre: enteredGenre,
        }, { headers: { Authorization: `Bearer ${token}` } });
    };

    return (
        <div>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form noValidate autoComplete="off">
                            <Grid className={classes.form}>
                                <TextField
                                    label="Artist"
                                    value={enteredArtist}
                                    onChange={(event) => {
                                        setEnteredArtist(event.target.value);
                                    }}
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DateTimePicker
                                        autoOk
                                        ampm={false}
                                        value={enteredTime}
                                        onChange={setEnteredTime}
                                    />
                                </MuiPickersUtilsProvider>
                                <TextField
                                    label="Location"
                                    value={enteredLocation}
                                    onChange={(event) => {
                                        setEnteredLocation(event.target.value);
                                    }}
                                />
                                <TextField
                                    label="Genre"
                                    value={enteredGenre}
                                    onChange={(event) => {
                                        setEnteredGenre(event.target.value);
                                    }}
                                />
                                <Button className={classes.submitBtn} type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                                    Add Concert
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </Fade>
            </Modal>
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
                        <Typography component="h1" variant="h5" className={classes.error}>
                            you must login first
                        </Typography>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}