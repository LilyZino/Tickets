import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { authenticationService } from '../../_services';
import SoldTicket from '../SoldTicket';

const useStyles = makeStyles({
    title: {
        marginTop: '10px'
    },
    error: {
        textAlign: 'center'
    },
    center: {
        textAlign: 'center'
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
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
                    <div className={classes.center}>
                        <Typography variant="h3" className={classes.title}>Your Purchases</Typography>
                        <div className={classes.grid}>
                            {tickets.map((ticket) => (
                                <SoldTicket
                                    ticketRank={ticket.rank}
                                    key={ticket._id}
                                    rankId={ticket._id}
                                    price={ticket.ticket.price}
                                    concert={ticket.ticket.concert}
                                    file={ticket.ticket.file}
                                    user={ticket.ticket.user}
                                />
                            ))}
                        </div>
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