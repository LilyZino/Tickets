import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

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

export default function Ticket(props) {
    const classes = useStyles();
    const { id, price, amount, concert } = props;

    const handleDelete = async () => {
        await axios.delete(`api/tickets/${id}`);
    };

    return (
        <Card className={classes.card}>
            <div className={classes.cardContent}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {concert.artist}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {`${concert.location}, ${moment(concert.time).format('DD/MM/YYYY HH:mm')}`}
                    </Typography>
                    <Typography>
                        {amount} Tickets
                    </Typography>
                </CardContent>
                <Typography align="right" className={classes.price}>
                    {`${price}₪`}
                </Typography>
            </div>
            <CardActions>
                <IconButton>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}