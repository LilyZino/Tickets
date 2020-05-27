import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BlockIcon from '@material-ui/icons/Block';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

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
    }
}));

export default function User(props) {
    const classes = useStyles();
    const { id, name, email, phone, rank, isBlocked } = props;

    const blockUser = async () => {
        await axios.post(`api/users/block/${id}`);
    };

    const unblockUser = async () => {
        await axios.post(`api/users/unblock/${id}`);
    };

    return (
        <Card className={classes.card} elavation="2">
            <div className={classes.cardContent}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography>
                        {email}
                    </Typography>
                    <Typography>
                        {phone}
                    </Typography>
                    <Typography>
                        Rank: {rank}
                    </Typography>
                </CardContent>
            </div>
            <CardActions>
                {
                    isBlocked
                        ? (
                            <div>
                                <IconButton onClick={unblockUser}>
                                    <BlockIcon />
                                </IconButton>
                            </div>
                        ) : (
                            <IconButton onClick={blockUser}>
                                <InsertEmoticonIcon />
                            </IconButton>
                        )
                }

            </CardActions>
        </Card>
    );
}