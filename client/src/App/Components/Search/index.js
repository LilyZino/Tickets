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

export default function Search(props) {
    const classes = useStyles();
    const [enteredTitle, setEnteredTitle] = useState('');

    const setSearchFilter = () => {
        const filter = {
            title: enteredTitle
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
                value={enteredTitle}
                onChange={(event) => setEnteredTitle(event.target.value)}
            />
            <Button variant="contained" color="primary" onClick={setSearchFilter}>Search</Button>
        </div>
    );
}