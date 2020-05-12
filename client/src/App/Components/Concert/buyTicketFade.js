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
//import InputSpinner from "react-native-input-spinner";
//import NumberInput from 'material-ui-number-input';
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

export default function AddTicketFade(props) {
    const classes = useStyles();
    const updateTextBox = {
        display: props.AddMode ? 'block' : 'none'
    };
    const [concerts, setConcerts] = useState([]);
    const [value, setValue] = useState(0);

    const onChange = () => {
        setValue(1);
    }

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/concerts');
            setConcerts(response.data);
        })();
    }, []);

    return (
        <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
        >
        <div>
            <Fade in={props.open}>
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
                            <TextField type="number" 
                                inputProps={{ min: "0", max: props.enteredAmount, step: "1" }}
                                onChange={(event) => {
                                    setValue(event.target.value);
                                    if(event.target.value >= props.enteredAmount)
                                        props.setEnteredSold(props.enteredAmount);
                                    else 
                                        props.setEnteredSold(event.target.value);
                                }} />
                            
                            <br/>
                            {
                                props.setEnteredTotal(value * props.enteredPrice)
                            }
                            <InputLabel id="concertLabel">Total amount: {props.enteredTotal}</InputLabel>
                            {/* <TextField
                                label="Price"
                                value={props.enteredPrice}
                                onChange={(event) => {
                                    props.setEnteredPrice(event.target.value);
                                }}
                            /> */}
                            <Button className={classes.submitBtn} type="submit" variant="contained" color="primary" onClick={props.buyTicket}>
                                {props.AddMode ? 'Buy Ticket' : 'Buy Ticket'}
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Fade>
        </div>
    </Modal>
    );
}