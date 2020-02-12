import React, { useEffect, useState } from 'react';
import Ticket from '../Ticket';

const TicketsList = (props) => {
    const { tickets, filter } = props;
    const [filteredTickets, setFilteredTickets] = useState(tickets);

    useEffect(() => {
        const ticketsToRender = filter ? tickets.filter((ticket) => {
            console.log(ticket);

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
            {filteredTickets.map((ticket) => (
                <Ticket
                    key={ticket._id}
                    id={ticket._id}
                    price={ticket.price}
                    sold={ticket.sold}
                    amount={ticket.amount}
                    concert={ticket.concert}
                />
            ))}
        </div>
    );
};

export default TicketsList;