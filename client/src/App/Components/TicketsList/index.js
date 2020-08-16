import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Ticket from '../Ticket';

const useStyles = makeStyles(() => ({
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
}));

const TicketsList = (props) => {
    const classes = useStyles();
    const { tickets, filter } = props;
    const [filteredTickets, setFilteredTickets] = useState(tickets);

    const handleDelete = async (id) => {
        await axios.delete(`api/tickets/${id}`);
    };

    useEffect(() => {
        const ticketsToRender = filter ? tickets.filter((ticket) => {
            if (filter.artist && filter.artist !== '' && !ticket.concert.artist.toLowerCase().includes(filter.artist.toLowerCase())) {
                return false;
            }

            if (filter.location && filter.location !== '' && !ticket.concert.location.toLowerCase().includes(filter.location.toLowerCase())) {
                return false;
            }

            if (filter.maxPrice && filter.maxPrice !== '' && ticket.price >= filter.maxPrice) {
                return false;
            }

            return true;
        }) : tickets;

        setFilteredTickets(ticketsToRender);
    }, [tickets, filter, props]);

    return (
        <div className={classes.grid}>
            {
                filteredTickets.map((ticket) => (
                    <Ticket
                        key={ticket._id}
                        id={ticket._id}
                        price={ticket.price}
                        desc={ticket.description}
                        amount={ticket.amount}
                        concert={ticket.concert}
                        file={ticket.file}
                        isSold={ticket.isSold}
                        onDelete={handleDelete}
                        upForExchange={ticket.upForExchange}
                        isPhysical={ticket.isPhysical}
                    />
                ))
            }
        </div>
    );
};

export default TicketsList;