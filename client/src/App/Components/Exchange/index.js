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

const useStyles = makeStyles({
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

export default function Exchange(props) {
    const classes = useStyles();
    const { get, give, index } = props;

    const approveExchange = async () => {
        const approveResult = await axios.post('/api/exchangeCycles/approve', { getId: get.id, giveId: give.id });
    };

    return (
        <div>
            {console.log(give)}
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                        {`Exchange option #${index + 1}`}
                    </Typography>
                    <Typography className={classes.h6}>
                        <span className={classes.optionTitle}>
                            {'Give: '}
                        </span>
                        {
                            give
                                ? give.artist
                                : null
                        }
                    </Typography>
                    <Typography variant="h5" component="h2">
                        <span className={classes.optionTitle}>
                            {'Get: '}
                        </span>
                        {

                            get
                                ? get.artist
                                : null
                        }
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={() => approveExchange()}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton>
                        <BlockIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}