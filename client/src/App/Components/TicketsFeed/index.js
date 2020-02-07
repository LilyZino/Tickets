import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import TicketsList from '../TicketsList';
import Search from '../TicketsSearch';

export default function TicketsFeed(props) {
    const { tickets } = props;
    const [filter, setFilter] = useState({});

    const handleFilter = (searchFilter) => {
        setFilter(searchFilter);
    };

    return (
        <div>
            <Search setFilter={handleFilter} />
            <TicketsList filter={filter} tickets={tickets} />
        </div>
    );
}