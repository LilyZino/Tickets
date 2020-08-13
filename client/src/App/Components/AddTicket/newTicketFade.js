import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';

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
        outline: 'none'
    },
    paper: {
        width: '30%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        borderRadius: '5px',
        outline: 'none'
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
    const { open, handleClose, enteredConcert, enteredPrice, AddMode, enteredAmount, enteredDesc, setEnteredDesc, setEnteredFile, isTicketPhysical, setIsTicketPhysical, setEnteredConcert, handleSubmit } = props;

    const classes = useStyles();
    const [concerts, setConcerts] = useState([]);
    const [expanded, setExpanded] = useState(!isTicketPhysical);

    const togglePhysicalTicketExpand = () => {
        setIsTicketPhysical(!isTicketPhysical);
        setExpanded(!expanded);
    };

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
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open} className={classes.paper}>
                <form noValidate autoComplete="off">
                    <Grid className={classes.form}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="concertLabel">Concert</InputLabel>
                            <Select
                                labelId="concertLabel"
                                label="Concert"
                                id="concert"
                                value={enteredConcert}
                                onChange={(event) => { setEnteredConcert(event.target.value); }}
                            >
                                {concerts.filter(concert => !concert.isDeleted).map((concert) => (
                                    <MenuItem key={concert._id} value={concert._id}>
                                        {`${concert.artist} - ${concert.location}, ${moment(concert.time).format('DD/MM/YYYY HH:mm')}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            type="number"
                            inputProps={{ min: '1', max: '10', step: '1' }}
                            label="Amount"
                            value={enteredAmount}
                            onChange={(event) => {
                                props.setEnteredAmount(event.target.value);
                            }}
                        />
                        <TextField
                            label="Description"
                            value={enteredDesc}
                            multiline
                            rows={4}
                            onChange={(event) => {
                                setEnteredDesc(event.target.value);
                            }}
                        />
                        <TextField
                            label="Price"
                            value={enteredPrice}
                            onChange={(event) => {
                                props.setEnteredPrice(event.target.value);
                            }}
                        />
                        <FormControlLabel
                            control={<Switch checked={!isTicketPhysical} onChange={togglePhysicalTicketExpand} name="Digital Ticket" />}
                            label="Digital Ticket"
                        />
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <AttachFileIcon />
                            </IconButton>
                            <input
                                type="file"
                                multiple=""
                                name="MyFile"
                                accept="image/png, image/jpeg, application/pdf"
                                onChange={(event) => {
                                    setEnteredFile(event.target.files[0]);
                                }}
                            />
                        </Collapse>
                        <Button className={classes.submitBtn} type="submit" variant="contained" color="secondary" onClick={handleSubmit}>
                            {AddMode ? 'Add Ticket' : 'Edit Ticket'}
                        </Button>
                    </Grid>
                </form>
            </Fade>
        </Modal>
    );
}