import React, { useState } from 'react';
import TicketsList from '../TicketsList';
import Search from '../TicketsSearch';
import Typography from '@material-ui/core/Typography';

export default function TicketsFeed(props) {
    const { tickets } = props;
    const [filter, setFilter] = useState({});

    const handleFilter = (searchFilter) => {
        setFilter(searchFilter);
    };

    return (
        <div>
            {tickets.length != 0
                && (
                    <div>
                        <Search setFilter={handleFilter} />
                        <TicketsList filter={filter} tickets={tickets} />
                    </div>
                    )}
            {tickets.length == 0
                && (
                    <Typography component="h1" variant="h5" >
                        You have no tickets
                    </Typography>
                )}
        </div>
    );
}