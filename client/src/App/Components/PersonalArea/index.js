import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PostsList from '../PostsList';

const useStyles = makeStyles({
});

export default function PersonalArea() {
    const classes = useStyles();

    return (
        <div>
            <PostsList userId="5e19e0e24975240b38166236" />
        </div>
    );
}