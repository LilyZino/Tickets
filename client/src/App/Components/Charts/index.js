import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    columns: {
        columnCount: 2
    },
    twiterFeed: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

export default function Charts() {
    const classes = useStyles();

    return (
        <div>
        </div>
    );
}

