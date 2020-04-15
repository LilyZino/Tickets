import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { authenticationService } from '../../_services';
import TicketsFeed from '../TicketsFeed';

const useStyles = makeStyles({
    title: {
        marginTop: '10px'
    }
});

export default function PersonalArea() {
    const classes = useStyles();
    const [tickets, setTickets] = useState([]);
    const [ticketsCount, setTicketsCount] = useState([]);

    useEffect(() => {
        (async () => {
            if (authenticationService.currentUserValue) {
                const userId = authenticationService.currentUserValue.data
                    ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
                const getTicketsResponse = await axios.get(`/api/tickets/user/${userId}`);
                const getTicketsCountResponse = await axios.get(`/api/users/ticketCount/${userId}`);
                setTickets(getTicketsResponse.data);
                setTicketsCount(getTicketsCountResponse.data);
            }
        })();
    }, []);

    return (
        <div>
            <Typography variant="h4" className={classes.title}> Welcome to your personal area</Typography>
            <Typography>Here you can find the {ticketsCount} concert, you putted up tickets for sale</Typography>
            <TicketsFeed tickets={tickets} />
        </div>
    );
}
