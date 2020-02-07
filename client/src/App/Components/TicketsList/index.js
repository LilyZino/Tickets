import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Ticket from '../Ticket';

const TicketsList = (props) => {
    const { tickets, filter } = props;
    const [filteredTickets, setFilteredTickets] = useState(tickets);

    useEffect(() => {
        const ticketsToRender = tickets.filter((ticket) => {
            if (_.isEmpty(filter)) return tickets;

            if (filter.artist) {
                return ticket.concert.artist.toLowerCase().includes(filter.artist);
            }

            return true;
        });

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