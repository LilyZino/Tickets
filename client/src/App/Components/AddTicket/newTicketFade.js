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
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    expandOpen: {
        background: 'gray',
    }
}));

export default function AddTicketFade(props) {
    const classes = useStyles();
    const updateTextBox = {
        display: props.AddMode ? 'none' : 'block'
    };
    const [concerts, setConcerts] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [isTicketPhysical, setTicketPhysical] = useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
        setTicketPhysical(false);
    };
    const handlePhysicalTicket = () => {
        setTicketPhysical(!isTicketPhysical);
        setExpanded(false);
    };

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/concerts');
            setConcerts(response.data);
            console.log('type', typeof event.target.value);
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
                                <InputLabel id="concertLabel">Concert</InputLabel>
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
                                />
                                <TextField
                                    style={updateTextBox}
                                    label="Sold"
                                    value={props.enteredSold}
                                    onChange={(event) => {
                                        if (event.target.value >= props.enteredAmount) props.setEnteredSold(props.enteredAmount);
                                        else props.setEnteredSold(event.target.value);
                                    }}
                                />
                                <TextField
                                    label="Price"
                                    value={props.enteredPrice}
                                    onChange={(event) => {
                                        props.setEnteredPrice(event.target.value);
                                    }}
                                />
                                <br />
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: isTicketPhysical,
                                    })}
                                    onClick={() => {
                                        handlePhysicalTicket();
                                        props.setTicketPhysical(!isTicketPhysical);
                                    }}
                                >
                                    <InputLabel>My ticket is physical </InputLabel>
                                </IconButton>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <InputLabel>My ticket is digital </InputLabel>
                                </IconButton>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <div className="form-group files">
                                        <InputLabel>Upload Your File </InputLabel>
                                        <br />
                                        <input
                                            type="file"
                                            className="form-control"
                                            multiple=""
                                            name="MyFile"
                                            accept="image/png, image/jpeg"
                                            onChange={(event) => {
                                                props.setEnteredFile(event.target.files[0]);
                                            }}
                                        />
                                    </div>
                                </Collapse>
                                <Button className={classes.submitBtn} type="submit" variant="contained" color="primary" onClick={props.handleSubmit}>
                                    {props.AddMode ? 'Add Ticket' : 'Edit Ticket'}
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </Fade>
            </div>
        </Modal>
    );
}