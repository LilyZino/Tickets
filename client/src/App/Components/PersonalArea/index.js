import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { authenticationService } from '../../_services';
import TicketsFeed from '../TicketsFeed';

const useStyles = makeStyles({
    hello: {
        marginTop: '10px'
    }
});

export default function PersonalArea() {
    const classes = useStyles();
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        (async () => {
            if (authenticationService.currentUserValue) {
                const userId = authenticationService.currentUserValue.data
                    ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
                const getTicketsResponse = await axios.get(`/api/tickets/user/${userId}`);
                setTickets(getTicketsResponse.data);
                console.log(getTicketsResponse.data);
            }
        })();

        console.log('personal area tickets', tickets)
    }, []);

    return (
        <div>
            <Typography variant="h6">
                Here are your tickets:
            </Typography>
            <TicketsFeed tickets={tickets} />
        </div>
    );
}
