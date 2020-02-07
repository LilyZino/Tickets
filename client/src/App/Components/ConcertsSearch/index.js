import React, { useState } from 'react';
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
    }
});

export default function ConcertsSearch(props) {
    const classes = useStyles();
    const [enteredArtist, setEnteredArtist] = useState('');
    const [enteredDate, setEnteredDate] = useState(new Date());
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
        setEnteredDate(date);
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
            <Button className={classes.item} variant="contained" color="primary" onClick={setSearchFilter}>Search</Button>
        </div>
    );
}