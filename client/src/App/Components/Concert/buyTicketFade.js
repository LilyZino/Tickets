import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

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

export default function AddTicketFade(props) {
    const { open, AddMode, enteredAmount, setEnteredSold, enteredTotal, setEnteredTotal, enteredPrice, buyTicket, handleClose } = props;
    const classes = useStyles();
    const [value, setValue] = useState(0);

    return (
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
            <div>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form noValidate autoComplete="off">
                            <Grid className={classes.form}>
                                {/* <InputLabel id="concertLabel">Concert</InputLabel>
                            <Select
                                labelId="concertLabel"
                                label="Concert"
                                id="concert"
                                value={props.enteredConcert}
                                onChange={(event) => { props.setEnteredConcert(event.target.value); }}
                            >
                                {concerts.map((concert) => (
                                    <MenuItem key={concert._id} value={concert._id}>
                                        {`${concert.artist} - ${concert.location}, ${moment(concert.time).format('DD/MM/YYYY HH:mm')}`}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TextField
                                label="Amount"
                                value={props.enteredAmount}
                                onChange={(event) => {
                                    props.setEnteredAmount(event.target.value);
                                }}
                            /> */}
                                <InputLabel id="concertLabel">How many tickets would you like to buy?</InputLabel>
                                {/* <TextField
                                style={updateTextBox}
                                //label="How many tickets do you want to buy?"
                                value={props.enteredSold}
                                onChange={(event) => {
                                    if(event.target.value >= props.enteredAmount)
                                        props.setEnteredSold(props.enteredAmount);
                                    else
                                        props.setEnteredSold(event.target.value);
                                }}
                            /> */}
                                <TextField
                                    type="number"
                                    inputProps={{ min: '0', max: enteredAmount, step: '1' }}
                                    onChange={(event) => {
                                        setValue(event.target.value);
                                        if (event.target.value >= enteredAmount) setEnteredSold(enteredAmount);
                                        else setEnteredSold(event.target.value);
                                    }}
                                />

                                <br />
                                {
                                    setEnteredTotal(value * enteredPrice)
                                }
                                <InputLabel id="concertLabel">Total amount: {enteredTotal}</InputLabel>
                                {/* <TextField
                                label="Price"
                                value={props.enteredPrice}
                                onChange={(event) => {
                                    props.setEnteredPrice(event.target.value);
                                }}
                            /> */}
                                <Button className={classes.submitBtn} type="submit" variant="contained" color="primary" onClick={buyTicket}>
                                    {AddMode ? 'Buy Ticket' : 'Buy Ticket'}
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </Fade>
            </div>
        </Modal>
    );
}