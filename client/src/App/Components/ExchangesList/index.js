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

            const exchangesData = (await axios.get(`/api/exchangeCycles/${userId}`)).data;
            console.log(exchangesData);

            setExchanges(exchangesData);
            setUserId(userId);
        })();
    }, []);

    return (
        <div>
            <Typography variant="h4" className={classes.title}> Welcome the exchange area</Typography>
            <Typography>Here you can find the exchanges possibilities</Typography>
            {exchanges.length === 0 ? <div /> : exchanges.map((exchange, index) => (
                <Exchange
                    get={
                        exchange.where((path) => {
                            path.end.id = 
                        });
                        // _.findIndex(exchange, (node) => node.userId === userId) !== -1
                        //     ? exchange[(_.findIndex(exchange, (node) => node.userId === userId) - 1 + exchange.length) % exchange.length]
                        //     : null
                    }
                    give={
                        _.findIndex(exchange, (node) => node.userId === userId) !== -1
                            ? exchange[(_.findIndex(exchange, (node) => node.userId === userId))]
                            : null
                    }
                    index={index}
                    key={uuid()}
                />
            ))}
        </div>
    );
}