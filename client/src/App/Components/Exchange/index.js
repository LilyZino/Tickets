import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Chip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles({
    pos: {
        marginBottom: 12,
    },
    h6: {
        fontSize: '1.2rem',
    },
    optionTitle: {
        fontSize: '1rem',
        color: 'grey'
    },
    cardTitle: {
        display: 'flex',
        /* align-items: center; */
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    root: {
        marginBottom: '10px'
    }
});

export default function Exchange(props) {
    const classes = useStyles();
    const { get, give, approved, denied, approveFunction, denyFunction, index, unApprovedCount, userCredit } = props;
    const priceExchange = get.ticket.price - give.ticket.price;

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <div className={classes.cardTitle}>
                        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                            {`Exchange option #${index + 1}`}
                        </Typography>
                        {
                            denied && denied.isDenied
                                ? (
                                    <Chip
                                        color="primary"
                                        icon={<BlockIcon />}
                                        label={denied.deniedByUser
                                            ? 'You denied this exchange'
                                            : 'Someone else denied this exchange'}
                                    />
                                )
                                : (
                                    approved
                                        ? <Chip color="secondary" icon={<CheckIcon />} label="You approved this exchange" />
                                        : <></>
                                )
                        }
                    </div>
                    <div>
                        <Typography className={classes.h6}>
                            <span className={classes.optionTitle}>
                                {'Give: '}
                            </span>
                            {
                                !give
                                    ? null
                                    : (priceExchange > 0
                                        ? <span>{`${give.artist} + ${priceExchange}`} <img height="16px" src="../../../Assets/images/coin.png" alt="" /></span>
                                        : give.artist)
                            }
                        </Typography>
                        <Typography variant="h5" component="h2">
                            <span className={classes.optionTitle}>
                                {'Get: '}
                            </span>
                            {
                                !get
                                    ? null
                                    : (priceExchange < 0
                                        ? <span>{`${get.artist} + ${Math.abs(priceExchange)}`} <img height="16px" src="../../../Assets/images/coin.png" alt="" /></span>
                                        : get.artist)
                            }
                        </Typography>
                        {
                            approved && !denied.isDenied
                                ? (
                                    <Typography variant="h5" className={classes.optionTitle}>
                                        you need to wait for {unApprovedCount} other users to approve the exchange
                                    </Typography>
                                )
                                : <></>
                        }
                        {
                            priceExchange > 0 && Math.abs(priceExchange) > userCredit
                                ? (
                                    <Typography variant="h5" className={classes.optionTitle}>
                                        you don't have enough credits to proceed with this exchange
                                    </Typography>
                                )
                                : null
                        }
                    </div>
                </CardContent>
                {console.log(approved)}
                {console.log(denied)}
                {
                    !(approved || (denied && denied.isDenied) || (priceExchange > 0 && Math.abs(priceExchange) > userCredit))
                        ? (
                            <CardActions>
                                <IconButton onClick={() => approveFunction()}>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton onClick={() => denyFunction()}>
                                    <BlockIcon />
                                </IconButton>
                            </CardActions>
                        )
                        : <></>
                }
            </Card>
        </div>
    );
}