import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import axios from 'axios';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import BuyTicketFade from './buyTicketFade';
import { authenticationService } from '../../_services';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: '5px'
    },
    okButton: {
        marginTop: '20px'
    },
    userNameText: {
        float: 'left',
        margin: '0.3em',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
        textAlign: 'center'
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
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default (props) => {
    const classes = useStyles();
    const { id, ticket } = props;
    const [open, setOpen] = useState(false);
    const [enteredSold, setEnteredSold] = useState('');
    const [enteredTotal, setEnteredTotal] = useState('');
    const [userCredits, setuserCredits] = useState('');
    const [openAfterPurchaseMessage, setOpenAfterPurchaseMessage] = useState(false);
    const [PurchaseFailedMessage, setPurchaseFailedMessage] = useState(false);

    useEffect(() => {
        const GetCredits = async () => {
            const userId = authenticationService.currentUserValue.data
                ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;

            await axios.put('/api/users/credits', {
                id: userId,
            }).then((credit) => {
                setuserCredits(credit);
            });
        };
        if (!userCredits) {
            GetCredits();
        }
    });

    const changeRank = async (userId, rank) => {
        await axios.post('/api/users/rank', {
            id: userId,
            rank
        });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const buyTicket = async () => {
        const { token } = authenticationService.currentUserValue.data;
        const userId = authenticationService.currentUserValue.data
            ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
        if (userCredits.data >= enteredTotal) {
            setOpenAfterPurchaseMessage(true);
            await axios.post('/api/tickets/buy', {
                _id: id,
                sold: enteredSold,
                seller: ticket.user._id,
                totalPrice: enteredTotal,
                newcredit: userCredits.data - enteredTotal,
                userId
            }, { headers: { Authorization: `Bearer ${token}` } });
        } else {
            setPurchaseFailedMessage(true);
        }
    };

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
                secondary={`By ${ticket.user.name}, Rank: ${ticket.user.rank}, 
                            Phone: ${ticket.user.phone}, Mail: ${ticket.user.email}`}
            />
            <Typography>
                {`${ticket.price}₪`}
            </Typography>
            <Button
                className={classes.submitBtn}
                type="submit"
                color="primary"
                onClick={handleOpen}
            >
                Buy
            </Button>
            <BuyTicketFade
                open={open}
                AddMode
                enteredAmount={ticket.amount}
                setEnteredSold={setEnteredSold}
                enteredTotal={enteredTotal}
                setEnteredTotal={setEnteredTotal}
                enteredPrice={ticket.price}
                buyTicket={buyTicket}
                handleClose={handleClose}
            />
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={openAfterPurchaseMessage}
                onClose={() => setOpenAfterPurchaseMessage(false)}
                closeAfterTransition
            >
                <Fade in={openAfterPurchaseMessage}>
                    <div className={classes.paper}>
                        <Typography variant="h4" className={classes.title}>
                            Your purchase was successful!
                        </Typography>
                        <Typography variant="h5" className={classes.title}>
                            Please check your mail for confirmation
                        </Typography>
                        <Button
                            className={classes.okButton}
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenAfterPurchaseMessage(false)}
                        >
                            OK
                        </Button>
                    </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={PurchaseFailedMessage}
                onClose={() => setPurchaseFailedMessage(false)}
                closeAfterTransition
            >
                <Fade in={PurchaseFailedMessage}>
                    <div className={classes.paper}>
                        <Typography variant="h4" className={classes.title}>
                            You don't have sufficient credits to complete this transaction.
                        </Typography>
                        <Typography variant="h5" className={classes.title}>
                            Please update your credit balance.
                        </Typography>
                        <Button
                            className={classes.okButton}
                            variant="contained"
                            color="primary"
                            onClick={() => setPurchaseFailedMessage(false)}
                        >
                            OK
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </ListItem>
    );
};