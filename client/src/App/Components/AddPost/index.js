import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { authenticationService } from '../../_services';
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

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
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
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    submitBtn: {
        marginTop: '16px'
    },
    error:{
        textAlign:'center',
        color: 'red'
    },
    avatar:{
        margin: 'auto',
    },
}));

export default function AddPost(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [enteredArtist, setEnteredArtist] = useState('');
    const [enteredCount, setEnteredCount] = useState('');
    const [enteredDate, setEnteredDate] = useState(moment().format('YYYY-MM-DD'));
    const [enteredDescription, setEnteredDescription] = useState('');


    const handleOpen = () => {
        if (authenticationService.currentUserValue )
            setOpen(true);
        else 
            setLogin(true)
    };

    const handleClose = () => {
        setOpen(false);
        setLogin(false)
    };

    const handleSubmit = () => {
        const token = authenticationService.currentUserValue.data.token
        const userId = authenticationService.currentUserValue.data ? 
                    authenticationService.currentUserValue.data._id :  authenticationService.currentUserValue._id;
        console.log("my val: " + userId)
        console.log("my token: " + token)
        axios.put('/api/posts', {
            title: enteredTitle,
            text: enteredDescription,
            artist: enteredArtist,
            price: enteredPrice,
            count: enteredCount,
            userId: userId
        }, { headers: {"Authorization" : `Bearer ${token}`}} );
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
                                <TextField
                                    label="Title"
                                    value={enteredTitle}
                                    onChange={(event) => {
                                        setEnteredTitle(event.target.value);
                                    }}
                                />
                                <TextField
                                    label="Artist"
                                    value={enteredArtist}
                                    onChange={(event) => {
                                        setEnteredArtist(event.target.value);
                                    }}
                                />                                <TextField
                                    label="Count"
                                    value={enteredCount}
                                    onChange={(event) => {
                                        setEnteredCount(event.target.value);
                                    }}
                                />
                                <TextField
                                    id="datetime-local"
                                    label="Date"
                                    type="date"
                                    className={classes.textField}
                                    value={enteredDate}
                                    onChange={(event) => {
                                        setEnteredDate(event.target.value);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="Price"
                                    value={enteredPrice}
                                    onChange={(event) => {
                                        setEnteredPrice(event.target.value);
                                    }}
                                />
                                <TextField
                                    label="Description"
                                    value={enteredDescription}
                                    onChange={(event) => {
                                        setEnteredDescription(event.target.value);
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
                    <Typography component="h1" variant="h5"  className={classes.error}>
                        you must login first
                    </Typography> 
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}