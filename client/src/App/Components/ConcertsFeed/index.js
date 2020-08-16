import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ConcertsList from '../ConcertsList';
import Search from '../ConcertsSearch';
import CircularProgress from '@material-ui/core/CircularProgress';
import { registerSocketEvent, initSockets } from '../../_services/socketService';

const useStyles = makeStyles({
    loader: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px'
    }
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
            <Search setFilter={handleFilter} />
            {isLoaded
                ? <ConcertsList editable={editable} filter={filter} concerts={concerts} />
                : <div className={classes.loader}><CircularProgress color="secondary" /></div>}
        </div>
    );
}