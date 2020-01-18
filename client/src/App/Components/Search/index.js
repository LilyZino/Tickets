import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Search.css';

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

export default function Search() {
    const classes = useStyles();
    const [enteredFilter, setEnteredFilter] = useState('');

    return (
        <div className={classes.search}>
            <TextField
                id="outlined-basic"
                className={classes.searchInput}
                label="Search"
                variant="outlined"
                type="text"
                value={enteredFilter}
                onChange={(event) => setEnteredFilter(event.target.value)}
            />
            <Button variant="contained" color="primary">Search</Button>
        </div>
    );
}