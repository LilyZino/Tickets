import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

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
    }
}));

export default function AddPost() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [enteredArtist, setEnteredArtist] = useState('');
    const [enteredDate, setEnteredDate] = useState(moment().format('YYYY-MM-DD'));
    const [enteredDescription, setEnteredDescription] = useState('');


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        axios.put('/api/posts', {
            title: enteredTitle,
            text: enteredDescription,
            artist: enteredArtist,
            price: enteredPrice,
            userId: '5e19e11a4975240b38166237'
        });
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
        </div>
    );
}