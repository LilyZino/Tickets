import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { authenticationService } from '../../_services';
import TicketsFeed from '../TicketsFeed';

const useStyles = makeStyles({
    title: {
        marginTop: '10px'
    },
    center: {
        textAlign: 'center'
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
            <div className={classes.center}>
                <Typography variant="h3" className={classes.title}>Personal Area</Typography>
                <Typography>Here you can find the {ticketsCount} concert, you putted up tickets for sale</Typography>
            </div>
            <TicketsFeed tickets={tickets} isMine />
        </div>
    );
}
