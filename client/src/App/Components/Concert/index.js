import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
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
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { registerSocketEvent } from '../../_services/socketService';
import Maps from '../Maps';

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
    const { id, artist, location, time, genre, editable } = props;
    const [expanded, setExpanded] = useState(false);
    const [mapexpanded, setmapExpanded] = useState(false);
    const [concertTickets, setConcertTickets] = useState([]);


    useEffect(() => {
        const getTicketForConcert = async () => {
            if (!expanded) return;

            const response = await axios.get(`/api/tickets/concert/${id}`);
            setConcertTickets(response.data);
            console.log(response.data);
        };

        getTicketForConcert();

        registerSocketEvent('tickets-updated', () => {
            getTicketForConcert();
        });
    }, [expanded, id]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handlemapExpandClick = () => {
        setmapExpanded(!mapexpanded);
    };

    const changeRank = async (a, b) => {
        console.log(a);
        console.log(b);

        await axios.post('/api/users/rank', {
            id: a,
            rank: b
        });
    };


    return (
        <Card className={classes.card} elevation={2}>
            <CardContent>
                <Typography variant="h4" component="h2">
                    {artist}
                </Typography>
                <Typography className={classes.pos} color="textSecondary" variant="h6">
                    {`${location}, ${moment(time).format('DD/MM/YYYY HH:mm')}${genre ? `, ${genre}` : ''}`}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton
                    className={classes.iconLocation}
                    onClick={handlemapExpandClick}
                    aria-expanded={mapexpanded}
                    aria-label="show more"
                >
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

                {
                    editable
                        ? (
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="Edit"
                            >
                                <EditIcon />
                            </IconButton>
                        ) : null
                }
            </CardActions>
            <Collapse in={mapexpanded} timeout="auto" unmountOnExit>
                <Maps location={`${location}`} />
            </Collapse>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        Available tickets:
                    </Typography>
                    <List>
                        {concertTickets.length === 0 || concertTickets.filter((ticket) => ticket.amount - ticket.sold !== 0).length === 0
                            ? (
                                <Typography>
                                    There are no tickets avalible for this concert :(
                                </Typography>
                            )
                            : concertTickets.filter((ticket) => ticket.amount - ticket.sold !== 0)
                                .map((ticket) => {
                                    return (
                                        <ListItem button key={ticket._id}>
                                            <ListItemIcon>
                                                <ConfirmationNumberIcon />
                                            </ListItemIcon>
                                            <ListItemIcon>
                                                <div>
                                                    <div>
                                                        <IconButton onClick={() => changeRank(ticket.user._id, 1)}>
                                                            <ArrowDropUpIcon />
                                                        </IconButton>
                                                    </div>
                                                    <IconButton onClick={() => changeRank(ticket.user._id, -1)}>
                                                        <ArrowDropDownIcon />
                                                    </IconButton>
                                                </div>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`${ticket.amount - ticket.sold} Tickets Available`}
                                                secondary={`By ${ticket.user.name}, Rank: ${ticket.user.rank}, Phone: ${ticket.user.phone}, Mail: ${ticket.user.email}`}
                                            />
                                            <Typography>
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