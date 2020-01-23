import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
import axios from 'axios';
import ConcertsList from '../ConcertsList';
import Search from '../ConcertsSearch';

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
        // const sockets = io();
        // sockets.on('posts-updated', () => {
        //     console.log('posts was updated');
        //     getAllPosts();
        // });

        getAllConcerts();
    }, []);

    return (
        <div>
            <Search setFilter={handleFilter} />
            <ConcertsList filter={filter} concerts={concerts} />
        </div>
    );
}