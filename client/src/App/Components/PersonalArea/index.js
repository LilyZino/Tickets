import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import TicketsFeed from '../TicketsFeed';

const useStyles = makeStyles({
    hello: {
        marginTop: '10px'
    }
});

export default function PersonalArea() {
    const classes = useStyles();
    const [tickets, setTickets] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        (async () => {
            const userId = '5e19e0e24975240b38166236';
            const getTicketsResponse = await axios.get(`/api/tickets/user/${userId}`);
            const getUserResponse = await axios.get(`/api/users/${userId}`);

            setTickets(getTicketsResponse.data);
            setUser(getUserResponse.data);

            console.log(getTicketsResponse.data);
            console.log(getUserResponse.data);
        })();
    }, []);

    return (
        <div>
            <Typography variant="h4" className={classes.hello}>
                Hello {user.name}
            </Typography>
            <Typography variant="h6">
                Here are your tickets:
            </Typography>
            <TicketsFeed tickets={tickets} />
        </div>
    );
}