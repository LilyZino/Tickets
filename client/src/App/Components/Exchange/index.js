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
    const { get, give, approved, approveFunction, denyFunction, index } = props;

    return (
        <div>
            {console.log(give)}
            <Card className={classes.root}>
                <CardContent>
                    <div className={classes.cardTitle}>
                        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                            {`Exchange option #${index + 1}`}
                        </Typography>
                        {
                            approved
                                ? <Chip color="secondary" icon={<CheckIcon />} label="You approved this exchange" />
                                : <></>
                        }
                    </div>
                    <div>
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
                    </div>
                </CardContent>
                {
                    !approved
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