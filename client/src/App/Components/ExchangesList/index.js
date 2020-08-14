import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { authenticationService } from '../../_services';
import Exchange from '../Exchange';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginTop: '10px'
    },
    title: {
        marginTop: '10px'
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
}));

export default function ExchangesList() {
    // const theme = useTheme();
    const classes = useStyles();
    const [exchanges, setExchanges] = useState([]);
    const [userId, setUserId] = useState();
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);
    //         color: theme.palette.secondary.main,

    useEffect(() => {
        (async () => {
            const userId = authenticationService.currentUserValue.data
                ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;

            console.log('userId Effect', userId);
            setUserId(userId);

            const exchangesData = (await axios.get(`/api/exchangeCycles/${userId}`)).data;
            console.log(exchangesData);
            setExchanges(exchangesData);
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
        const denyResult = await axios.post('/api/exchangeCycles/deny', { getId: get.id, giveId: give.id });
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
            <Typography variant="h4" className={classes.title}> Welcome the exchange area</Typography>
            <Typography>Here you can find the exchanges possibilities</Typography>
            {exchanges.length === 0 || !userId ? <div /> : exchanges.map((exchange, index) => {
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
                    />
                );
            })}
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