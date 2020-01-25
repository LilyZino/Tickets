import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Collapse from '@material-ui/core/Collapse';
import axios from 'axios';
import MapIcon from '@material-ui/icons/Map';
import { registerSocketEvent } from '../../_services/socketService';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 275,
        marginTop: 15
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
    iconLocation: {
        marginLeft: 'auto',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

export default (props) => {
    const classes = useStyles();
    const { id, artist, location, time } = props;
    const [expanded, setExpanded] = useState(false);
    const [concertTickets, setConcertTickets] = useState([]);

    const getTicketForConcert = async () => {
        if (!expanded) return;

        const response = await axios.get(`/api/tickets/concert/${id}`);
        console.log('get all ticekts of concert', response.data);
        setConcertTickets(response.data);
    };

    useEffect(() => {
        getTicketForConcert();

        registerSocketEvent('tickets-updated', () => {
            console.log('tickets was updated');
            getTicketForConcert();
        });
    }, [expanded, id]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.card} elevation={2}>
            <CardContent>
                <Typography variant="h4" component="h2">
                    {artist}
                </Typography>
                <Typography className={classes.pos} color="textSecondary" variant="h6">
                    {`${location}, ${moment(time).format('DD/MM/YYYY HH:mm')}`}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton className={classes.iconLocation}>
                    <MapIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>

            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        Available tickets:
                    </Typography>
                    <List>
                        {concertTickets.length === 0
                            ? (
                                <Typography>
                                    There are no tickets avalible for this concert :(
                                </Typography>
                            )
                            : concertTickets.filter((ticket) => !ticket.isSold)
                                .map((ticket) => {
                                    return (
                                        <ListItem button key={ticket._id}>
                                            <ListItemIcon>
                                                <ConfirmationNumberIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`${ticket.amount} Tickets`}
                                                secondary={ticket.user.name}
                                            />
                                            <Typography variant="h6">
                                                {`${ticket.price}₪`}
                                            </Typography>
                                        </ListItem>
                                    );
                                })}
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    );
};