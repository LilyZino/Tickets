import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import _ from 'lodash';
import uuid from 'uuid/v4';
import CircularProgress from '@material-ui/core/CircularProgress';
import { authenticationService } from '../../_services';
import Exchange from '../Exchange';

const useStyles = makeStyles((theme) => ({
    loader: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px'
    },
    root: {
        minWidth: 275,
        marginTop: '10px'
    },
    title: {
        marginTop: '10px'
    },
    center: {
        textAlign: 'center'
    },
    pos: {
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: '14px'
    },
    h6: {
        fontSize: '1.2rem',
    },
    optionTitle: {
        fontSize: '1rem',
        color: 'grey'
    },
    snackBarRoot: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    noExchangesMessage: {
        marginTop: '20px',
        textAlign: 'center'
    }
}));

export default function ExchangesList() {
    const classes = useStyles();
    const [exchanges, setExchanges] = useState([]);
    const [userId, setUserId] = useState();
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);
    const [userCredit, setUserCredit] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const userId = authenticationService.currentUserValue.data
                ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;

            setUserId(userId);

            const exchangesData = (await axios.get(`/api/exchangeCycles/${userId}`)).data;
            setExchanges(exchangesData);

            const userCreditsData = (await axios.put('/api/users/credits', { id: userId })).data;
            setUserCredit(userCreditsData);
            setIsLoaded(true);
        })();
    }, []);

    const approveExchange = async (exchange, get, give, exchangeIndex, exchangePathIndex) => {
        const approveResult = await axios.post('/api/exchangeCycles/approve', { exchange, getId: get.id, giveId: give.id });
        const updatedExchanges = [...exchanges];
        (updatedExchanges[exchangeIndex])[exchangePathIndex].relationship.isApproved = true;
        setExchanges(updatedExchanges);

        if (approveResult.data.isExchangeComplete) {
            setSnackBarOpen(true);
        }
    };

    const denyExchange = async (get, give, exchangeIndex, exchangePathIndex) => {
        await axios.post('/api/exchangeCycles/deny', { getId: get.id, giveId: give.id });
        const updatedExchanges = [...exchanges];
        (updatedExchanges[exchangeIndex])[exchangePathIndex].relationship.isDenied = true;
        setExchanges(updatedExchanges);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    };

    return (
        <div>
            <div className={classes.center}>
                <Typography variant="h3" className={classes.title}>Exchanges Area</Typography>
                <Typography>Here you can find the exchanges possibilities</Typography>
            </div>
            {
                isLoaded ? (
                    exchanges.length === 0 || !userId
                        ? <Typography className={classes.noExchangesMessage}>It seems that you doesn't have any exchange offers, return often to check wether there are new offers</Typography>
                        : exchanges.map((exchange, index) => {
                            const exchangePathIndex = _.findIndex(exchange, (path) => path.end.userId === userId);
                            const exchangePath = exchange[exchangePathIndex];

                            return (
                                <Exchange
                                    get={exchangePath.start}
                                    give={exchangePath.end}
                                    approved={exchangePath.relationship.isApproved}
                                    denied={{
                                        isDenied: exchange.some((path) => path.relationship.isDenied),
                                        deniedByUser: exchangePath.relationship.isDenied
                                    }}
                                    approveFunction={() => approveExchange(exchange, exchangePath.start, exchangePath.end, index, exchangePathIndex)}
                                    denyFunction={() => denyExchange(exchangePath.start, exchangePath.end, index, exchangePathIndex)}
                                    index={index}
                                    unApprovedCount={exchange.filter((path) => path.relationship.isApproved !== true).length}
                                    key={uuid()}
                                    userCredit={userCredit}
                                />
                            );
                        })
                ) : <div className={classes.loader}><CircularProgress color="secondary" /></div>
            }
            <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Congrats, The exchange was completed successfully!
                </Alert>
            </Snackbar>
        </div>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}