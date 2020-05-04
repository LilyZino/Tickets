import React, { useState } from 'react';
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
import AddTicketFade from './newTicketFade';
import base64 from 'base-64';
//import fs from 'fs';

import { authenticationService } from '../../_services';
import FormData from 'form-data';


const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(6),
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

export default function AddTicket() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [enteredConcert, setEnteredConcert] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [ticketFile, setEnteredFile] = useState('');
    

    const handleOpen = () => {
        if (authenticationService.currentUserValue) { setOpen(true); } else { setLogin(true); }
    };

    const handleClose = () => {
        setOpen(false);
        setLogin(false);
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();

        const { token } = authenticationService.currentUserValue.data;
        const userId = authenticationService.currentUserValue.data
            ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
        const formData = new FormData();
        formData.append('file', ticketFile, ticketFile.name);
        formData.append('concertId', enteredConcert);
        formData.append('price', enteredPrice);
        formData.append('amount', enteredAmount);
        formData.append('userId', userId);

        axios.post('api/tickets/upload', formData, {
            headers: {
                'Content-Type': 'undefined'
        }}).then(res => { // then print response status
                console.log("file uploded ", res.statusText)
        }).catch(err => {
            console.log("file not uploaded", err.response);
        })
        
        // await axios.put('/api/tickets', {
        //     concertId: enteredConcert,
        //     price: enteredPrice,
        //     amount: enteredAmount,
        //     userId
        // }, { headers: { Authorization: `Bearer ${token}` } });
    };

    return (
        <div>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                <AddIcon />
            </Fab>

            <AddTicketFade
                open={open}
                AddMode
                enteredAmount={enteredAmount}
                setEnteredAmount={setEnteredAmount}
                enteredPrice={enteredPrice}
                setEnteredPrice={setEnteredPrice}
                enteredConcert={enteredConcert}
                setEnteredConcert={setEnteredConcert}
                ticketFile={ticketFile}
                setEnteredFile={setEnteredFile}
                handleSubmit={handleSubmit}
                handleClose={handleClose}
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
                        <Typography component="h1" variant="h5" className={classes.error}>
                            you must login first
                        </Typography>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}