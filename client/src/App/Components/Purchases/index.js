import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TicketsFeed from '../TicketsFeed';
import { authenticationService } from '../../_services';

const useStyles = makeStyles({
    title: {
        marginTop: '10px'
    },
    error: {
        textAlign: 'center'
    }
});

export default function Purchases() {
    const classes = useStyles();
    const [tickets, setTickets] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    const GetPurchases = async () => {
        if (authenticationService.currentUserValue) {
            const userId = authenticationService.currentUserValue.data
                ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
            const getTicketsResponse = await axios.get(`/api/users/purchases/${userId}`);
            console.log(getTicketsResponse);
            console.log(getTicketsResponse.data);
            setTickets(getTicketsResponse.data);
            setisLoaded(true);
        }
    };
    useEffect(() => {
        GetPurchases();
    }, []);

    return (
        <div>
            {tickets
                && (
                    <div>
                        <Typography variant="h4" className={classes.title}>My purchases</Typography>
                        <Typography>Here is your purchase history</Typography>
                        <TicketsFeed tickets={tickets} isMine={false} />
                    </div>
                )}
            {!tickets && isLoaded
                && (
                    <Typography component="h1" variant="h5" className={classes.error}>
                        There is no purchase history
                    </Typography>
                )}
        </div>
    );
}