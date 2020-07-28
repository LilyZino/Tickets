import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
    search: {
        display: 'flex',
        paddingTop: 10,
        paddingBottom: 10,
    },
    searchButton: {
        width: '10%'
    },
    item: {
        flex: 1,
        padding: 4,
    },
    button: {
        margin: 'auto',
        height: '40px'
    }
});

export default function ConcertsSearch(props) {
    const classes = useStyles();
    const [enteredArtist, setEnteredArtist] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [enteredLocation, setEnteredLocation] = useState('');

    const setSearchFilter = () => {
        const filter = {
            artist: enteredArtist,
            date: enteredDate,
            location: enteredLocation
        };

        props.setFilter(filter);
    };

    const handleDateChange = (date) => {
        const searchDate = moment(date).isValid()
            ? moment(date).format('YYYY-MM-DD')
            : '';

        setEnteredDate(searchDate);
    };

    return (
        <div className={classes.search}>
            <TextField
                className={classes.item}
                label="Artist"
                type="text"
                value={enteredArtist}
                onChange={(event) => setEnteredArtist(event.target.value)}
            />
            <TextField
                className={classes.item}
                label="Location"
                type="text"
                value={enteredLocation}
                onChange={(event) => setEnteredLocation(event.target.value)}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={classes.item}
                    disableToolbar
                    autoOk
                    error={false}
                    placeholder="Date"
                    invalidDateMessage=""
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={enteredDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            <Button className={classes.button} variant="contained" color="secondary" onClick={setSearchFilter}>Search</Button>
        </div>
    );
}