import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    search: {
        display: 'flex',
        paddingTop: 10,
        paddingBottom: 10,
    },
    item: {
        flex: 1,
        padding: 4,
    },
    button: {
        margin: 8
    }
});

export default function TicketsSearch(props) {
    const classes = useStyles();
    const [enteredArtist, setEnteredArtist] = useState('');
    const [enteredMaxPrice, setEnteredMaxPrice] = useState('');
    const [enteredLocation, setEnteredLocation] = useState('');

    const setSearchFilter = () => {
        const filter = {
            artist: enteredArtist,
            maxPrice: enteredMaxPrice,
            location: enteredLocation
        };

        props.setFilter(filter);
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
                label="Max Price"
                type="text"
                value={enteredMaxPrice}
                onChange={(event) => setEnteredMaxPrice(event.target.value)}
            />
            <TextField
                className={classes.item}
                label="Location"
                type="text"
                value={enteredLocation}
                onChange={(event) => setEnteredLocation(event.target.value)}
            />
            <Button className={classes.button} variant="contained" color="secondary" onClick={setSearchFilter}>Search</Button>
        </div>
    );
}