import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { path } from 'd3';
import { authenticationService } from '../../_services';
import Exchange from '../Exchange';

const useStyles = makeStyles({
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
    }
});

export default function ExchangesList() {
    // const theme = useTheme();
    const classes = useStyles();
    const [exchanges, setExchanges] = useState([]);
    const [userId, setUserId] = useState();
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

    const approveExchange = async (get, give, exchangeIndex, exchangePathIndex) => {
        const approveResult = await axios.post('/api/exchangeCycles/approve', { getId: get.id, giveId: give.id });
        const updatedExchanges = [...exchanges];
        (updatedExchanges[exchangeIndex])[exchangePathIndex].relationship.isApproved = true;
        setExchanges(updatedExchanges);
    };

    const denyExchange = async () => {
        // const approveResult = await axios.post('/api/exchangeCycles/approve', { getId: get.id, giveId: give.id });

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
                        approveFunction={() => approveExchange(exchangePath.start, exchangePath.end, index, exchangePathIndex)}
                        denyFunction={() => denyExchange(exchangePath.start, exchangePath.end)}
                        index={index}
                        unApprovedCount={exchange.filter((path) => path.relationship.isApproved !== true).length}
                        key={uuid()}
                    />
                );
            })}
        </div>
    );
}