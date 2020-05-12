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
    const [sellerUser, setsellerUser] = useState('');
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

    const changeRank = async (a, b) => {
        console.log(a)
        console.log(b)

        await axios.post('/api/users/rank', {
            id: a,
            rank: b
        });
    };

    const handleOpen = (ticket) => {
        if (authenticationService.currentUserValue) { setOpen(true); } else { setLogin(true); }
    };

    const handleClose = () => {
        setOpen(false);
        setLogin(false);
    };

    const buyTicket = async () => {
        console.log('seller', sellerUser);
        const { token } = authenticationService.currentUserValue.data;
        const userId = authenticationService.currentUserValue.data
            ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
        await axios.post('/api/tickets/buy', {
            _id: props.id,
            sold: enteredSold,
            seller: props.ticket.user._id,
            userId
        }, { headers: { Authorization: `Bearer ${token}` } });
        
    };

    return (
        <ListItem button key={props.ticket._id}>
            <ListItemIcon>
                <ConfirmationNumberIcon />
            </ListItemIcon>
            <ListItemIcon>
                <div>
                    <div>
                    <IconButton onClick={() => changeRank(props.ticket.user._id, 1)}>
                        <ArrowDropUpIcon />
                    </IconButton>
                    </div>
                    <IconButton onClick={() => changeRank(props.ticket.user._id, -1)}>
                        <ArrowDropDownIcon />
                        </IconButton> 
                </div>
            </ListItemIcon>
            <ListItemText
                primary={`${props.ticket.amount - props.ticket.sold} Tickets Available`}
                secondary={`By ${props.ticket.user.name}, Rank: ${props.ticket.user.rank}, 
                            Phone: ${props.ticket.user.phone}, Mail: ${props.ticket.user.email}`}
            />
            <Typography>
                {`${props.ticket.price}₪`}
            </Typography>
            <Button 
                className={classes.submitBtn} type="submit" color="primary" 
                onClick={handleOpen}>
                    Buy
            </Button>
            <BuyTicketFade
                open={open}
                AddMode
                setsellerUser={props.ticket.user._id}
                sellerUser={props.ticket.user._id}
                setEnteredConcert={props.ticket.concertId}
                enteredConcert={props.ticket.concertId}
                enteredAmount={props.ticket.amount}
                setEnteredAmount={setEnteredAmount}
                enteredSold={props.ticket.sold}
                setEnteredSold={setEnteredSold}
                enteredPrice={props.ticket.price}
                buyTicket={buyTicket}
                handleClose={handleClose}
            />
        </ListItem>
    );
};