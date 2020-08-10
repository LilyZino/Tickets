import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ticket from '../Ticket';
import SoldTicket from '../SoldTicket';

const TicketsList = (props) => {
    const { tickets, filter, isMine } = props;
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
        <div>
            {isMine ? (
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
                    />
                ))) : (
                filteredTickets.map((ticket) => (
                    <SoldTicket
                        ticketRank={ticket.rank}
                        key={ticket._id}
                        rankId={ticket._id}
                        price={ticket.ticket.price}
                        concert={ticket.ticket.concert}
                        file={ticket.ticket.file}
                        user={ticket.ticket.user}
                    />
                )))}
        </div>
    );
};

export default TicketsList;