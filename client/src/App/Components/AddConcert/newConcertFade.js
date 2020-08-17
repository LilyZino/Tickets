import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
            tabIndex={-1}
        >
            <div>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form noValidate autoComplete="off">
                            <Grid className={classes.form}>
                                <Typography variant="h5">
                                    Can't find the concert you were looking for?
                                </Typography>
                                <Typography variant="subtitle1">
                                    Add a new one
                                </Typography>
                                <TextField
                                    label="Artist"
                                    value={enteredArtist}
                                    margin="dense"
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
                                        margin="dense"
                                    />
                                </MuiPickersUtilsProvider>
                                <TextField
                                    label="Location"
                                    value={enteredLocation}
                                    margin="dense"
                                    onChange={(event) => {
                                        setEnteredLocation(event.target.value);
                                    }}
                                />
                                <Select
                                    value={enteredGenre}
                                    onChange={(event) => {
                                        setEnteredGenre(event.target.value);
                                    }}
                                >
                                    <MenuItem value="Rock">Rock</MenuItem>
                                    <MenuItem value="Pop">Pop</MenuItem>
                                    <MenuItem value="Israeli">Israeli</MenuItem>
                                    <MenuItem value="Metal">Metal</MenuItem>
                                    <MenuItem value="Rap">Rap</MenuItem>
                                </Select>
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