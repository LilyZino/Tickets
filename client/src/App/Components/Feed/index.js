import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PostsList from '../PostsList';
import Search from '../Search';

const useStyles = makeStyles({
});

export default function Feed() {
    const classes = useStyles();

    return (
        <div>
            <PostsList userId="5e19e11a4975240b38166237" />
            <Search></Search>
        </div>
    );
}