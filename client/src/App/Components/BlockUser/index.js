import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(() => ({
    blockedUser: {
        color: red[500]
    },
}));

export default function Block(props) {
    const classes = useStyles();
    const { id } = props;
    const [isBlocked, setIsBlocked] = useState(props.isBlocked);

    const blockUser = async () => {
        await axios.post(`api/users/block/${id}`);
        setIsBlocked(true);
    };

    const unblockUser = async () => {
        await axios.post(`api/users/unblock/${id}`);
        setIsBlocked(false);
    };

    return (
        <Tooltip Tooltip title={isBlocked ? 'Unblock User' : 'Block User'} arrow>
            <IconButton className={isBlocked ? classes.blockedUser : ''} onClick={isBlocked ? unblockUser : blockUser}>
                <BlockIcon />
            </IconButton>
        </Tooltip>
    );
}