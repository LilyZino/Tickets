import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConcertsList from '../ConcertsList';
import Search from '../ConcertsSearch';
import { registerSocketEvent, initSockets } from '../../_services/socketService';

export default function ConcertsFeed() {
    const [concerts, setConcerts] = useState([]);
    const [filter, setFilter] = useState({});

    const getAllConcerts = async () => {
        const response = await axios.get('/api/concerts');
        setConcerts(response.data);
        console.log('useEffect getAllConcerts:', response);
    };

    const handleFilter = (searchFilter) => {
        setFilter(searchFilter);
    };

    useEffect(() => {
        initSockets();
        registerSocketEvent('concerts-updated', () => {
            console.log('concerts was updated');
            getAllConcerts();
        });

        getAllConcerts();
    }, []);

    return (
        <div>
            <Search setFilter={handleFilter} />
            <ConcertsList filter={filter} concerts={concerts} />
        </div>
    );
}