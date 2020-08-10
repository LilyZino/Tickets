import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

export default function AddConcertFade(props) {
    const { open, handleClose, enteredArtist, setEnteredArtist, AddMode, enteredTime, setEnteredTime, enteredLocation, setEnteredLocation, enteredGenre, setEnteredGenre, handleSubmit } = props;

    const classes = useStyles();
    const dateToday = new Date();

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
                                        minDate={dateToday}
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
                                <Button className={classes.submitBtn} variant="contained" color="primary" onClick={handleSubmit}>
                                    {AddMode ? 'Add Concert' : 'Edit Concert'}
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </Fade>
            </div>
        </Modal>
    );
}