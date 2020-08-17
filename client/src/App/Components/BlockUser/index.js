import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 275,
        marginTop: 15,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    price: {
        fontSize: '2rem',
        marginRight: '15px'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    blockedUser: {
        color: red[500]
    },
}));

export default function Block(props) {
    const classes = useStyles();
    const { id, isBlocked } = props;

    const blockUser = async () => {
        await axios.post(`api/users/block/${id}`);
    };

    const unblockUser = async () => {
        await axios.post(`api/users/unblock/${id}`);
    };

    return (
        <Tooltip Tooltip title={isBlocked ? 'Unblock User' : 'Block User'} arrow>
            <IconButton className={isBlocked ? classes.blockedUser : ''} onClick={isBlocked ? unblockUser : blockUser}>
                <BlockIcon />
            </IconButton>
        </Tooltip>
    );
}