import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import ConcertsList from '../ConcertsList';
import Search from '../ConcertsSearch';
import { registerSocketEvent, initSockets } from '../../_services/socketService';

const useStyles = makeStyles({
    loader: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px'
    },
    title: {
        marginTop: '10px'
    },
    center: {
        textAlign: 'center'
    },
});

export default function ConcertsFeed(props) {
    const classes = useStyles();
    const { editable } = props;
    const [concerts, setConcerts] = useState([]);
    const [filter, setFilter] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const getAllConcerts = async () => {
        const response = await axios.get('/api/concerts');
        setConcerts(response.data);
        setIsLoaded(true);
    };

    const handleFilter = (searchFilter) => {
        setFilter(searchFilter);
    };

    useEffect(() => {
        initSockets();
        registerSocketEvent('concerts-updated', () => {
            getAllConcerts();
        });

        getAllConcerts();
    }, []);

    return (
        <div>
            <div className={classes.center}>
                <Typography variant="h3" className={classes.title}>Tickets</Typography>
                <Typography>Welcome to Tickets, here you can buy or sell unused tickets</Typography>
            </div>
            <Search setFilter={handleFilter} />
            {isLoaded
                ? <ConcertsList editable={editable} filter={filter} concerts={concerts} />
                : <div className={classes.loader}><CircularProgress color="secondary" /></div>}
        </div>
    );
}