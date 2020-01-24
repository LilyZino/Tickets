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
    searchInput: {
        width: '90%',
    },
    searchButton: {
        width: '10%'
    }
});

export default function ConcertsSearch(props) {
    const classes = useStyles();
    const [enteredArtist, setEnteredArtist] = useState('');

    const setSearchFilter = () => {
        const filter = {
            artist: enteredArtist
        };

        props.setFilter(filter);
    };

    return (
        <div className={classes.search}>
            <TextField
                id="outlined-basic"
                className={classes.searchInput}
                label="Search"
                variant="outlined"
                type="text"
                value={enteredArtist}
                onChange={(event) => setEnteredArtist(event.target.value)}
            />
            <Button variant="contained" color="primary" onClick={setSearchFilter}>Search</Button>
        </div>
    );
}