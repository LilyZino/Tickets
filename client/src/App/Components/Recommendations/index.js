import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ConcertsList from '../ConcertsList';
import { registerSocketEvent, initSockets } from '../../_services/socketService';
import { authenticationService } from '../../_services';

const useStyles = makeStyles({
    title: {
        marginTop: '10px'
    }
});

export default function Recommendations() {
    const classes = useStyles();
    const [concerts, setConcerts] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [filter] = useState({});
    const GetRecs = async () => {
        if (authenticationService.currentUserValue) {
            const userId = authenticationService.currentUserValue.data
                ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
            console.log(userId);
            const response = await axios.get(`/api/concerts/recs/${userId}`);

            setConcerts(response.data);
            console.log('useEffect GetRecs:', response.data);
        }
    };
    const GetList = async () => {
        if (authenticationService.currentUserValue) {
            const userId = authenticationService.currentUserValue.data
                ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
            console.log(userId);
            const response = await axios.get(`/api/concerts/list/${userId}`);
            setGenreList(response.data);
            console.log('useEffect GetRecs:', response.data);
        }
    };
    useEffect(() => {
        initSockets();
        registerSocketEvent('concerts-updated', () => {
            console.log('concerts was updated');
            GetRecs();
            GetList();
        });

        GetRecs();
        GetList();
    }, []);

    let concertsToShow = [];

    genreList.forEach((x) => {
        concertsToShow.push(...concerts.filter((concert) => { return x === concert.genre; }));
    });
    concertsToShow = concertsToShow.slice(0, 5);

    return (
        <div>
            <Typography variant="h4" className={classes.title}>Recommended for you</Typography>
            <Typography>Here are some concerts we think you might be interested in</Typography>
            <ConcertsList filter={filter} concerts={concertsToShow} />
        </div>
    );
}