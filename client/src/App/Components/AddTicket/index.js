import React, { useState, useEffect } from 'react';
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
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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
}));

export default function AddTicket(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [enteredConcert, setEnteredConcert] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [concerts, setConcerts] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/concerts');
            setConcerts(response.data);
        })();
    }, []);

    const handleOpen = () => {
        if (authenticationService.currentUserValue) { setOpen(true); } else { setLogin(true); }
    };

    const handleClose = () => {
        setOpen(false);
        setLogin(false);
    };

    const handleSubmit = async () => {
        // debugger
        const { token } = authenticationService.currentUserValue.data;
        const userId = authenticationService.currentUserValue.data
            ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
        console.log(`my val: ${userId}`);
        console.log(`my token: ${token}`);
        await axios.put('/api/tickets', {
            concertId: enteredConcert,
            price: enteredPrice,
            amount: enteredAmount,
            userId
        }, { headers: { Authorization: `Bearer ${token}` } });
    };

    return (
        <div>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpen}>
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
                                <InputLabel id="concertLabel">Concert</InputLabel>
                                <Select
                                    labelId="concertLabel"
                                    label="Concert"
                                    id="concert"
                                    value={enteredConcert}
                                    onChange={(event) => { setEnteredConcert(event.target.value); }}
                                >
                                    {concerts.map((concert) => (
                                        <MenuItem key={concert._id} value={concert._id}>
                                            {`${concert.artist} - ${concert.location}, ${moment(concert.time).format('DD/MM/YYYY HH:mm')}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <TextField
                                    label="Amount"
                                    value={enteredAmount}
                                    onChange={(event) => {
                                        setEnteredAmount(event.target.value);
                                    }}
                                />
                                <TextField
                                    label="Price"
                                    value={enteredPrice}
                                    onChange={(event) => {
                                        setEnteredPrice(event.target.value);
                                    }}
                                />
                                <Button className={classes.submitBtn} type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                                    Add Ticket
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