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
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { registerSocketEvent } from '../../_services/socketService';
import Maps from '../Maps';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import ErrorIcon from '@material-ui/icons/Error';
import BuyTicketFade from './buyTicketFade';
import { authenticationService } from '../../_services';

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
    },
    submitBtn: {
        marginTop: '16px'
    }
}));

export default (props) => {
    const classes = useStyles();
    const { id, artist, location, time, genre } = props;
    const [expanded, setExpanded] = useState(false);
    const [mapexpanded, setmapExpanded] = useState(false);
    const [concertTickets, setConcertTickets] = useState([]);
    
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [enteredConcert, setEnteredConcert] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredSold, setEnteredSold] = useState('');

    useEffect(() => {
        const getTicketForConcert = async () => {
            if (!expanded) return;

            const response = await axios.get(`/api/tickets/concert/${id}`);
            setConcertTickets(response.data);
            console.log(response.data)
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
        console.log(a)
        console.log(b)

        await axios.post('/api/users/rank', {
            id: a,
            rank: b
        });
    };

    const handleOpen = () => {
        if (authenticationService.currentUserValue) { setOpen(true); } else { setLogin(true); }
    };

    const handleClose = () => {
        setOpen(false);
        setLogin(false);
    };

    const buyTicket = async () => {
        // const { token } = authenticationService.currentUserValue.data;
        // const userId = authenticationService.currentUserValue.data
        //     ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
        // await axios.post('/api/tickets/', {
        //     _id: id,
        //     concertId: enteredConcert,
        //     price: enteredPrice,
        //     amount: enteredAmount,
        //     sold: enteredSold,
        //     userId
        // }, { headers: { Authorization: `Bearer ${token}` } });
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
                                            <Button 
                                                className={classes.submitBtn} type="submit" color="primary" 
                                                onClick={handleOpen}>
                                                    Buy
                                            </Button>
                                            <BuyTicketFade
                                                open={open}
                                                AddMode
                                                enteredAmount={ticket.amount}
                                                setEnteredAmount={setEnteredAmount}
                                                enteredSold={ticket.sold}
                                                setEnteredSold={setEnteredSold}
                                                enteredPrice={ticket.price}
                                                setEnteredPrice={setEnteredPrice}
                                                enteredConcert={enteredConcert}
                                                setEnteredConcert={setEnteredConcert}
                                                buyTicket={buyTicket}
                                                handleClose={handleClose}
                                            />
                                        </ListItem>
                                    );
                                })}
                    </List>
                </CardContent>
            </Collapse>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={login}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={login}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <ErrorIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" className={classes.error}>
                            you must login first
                        </Typography>
                    </div>
                </Fade>
            </Modal>
        </Card>
        
    );
};