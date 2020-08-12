import React, { useState } from 'react';
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
import Chip from '@material-ui/core/Chip';
import SoldImage from '../../../Assets/Images/sold.png';
import AddTicketFade from '../AddTicket/newTicketFade';
import { authenticationService } from '../../_services';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '40%',
        margin: 15,
        backgroundColor: '#fbfbfb'
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
        fontSize: '2rem'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    soldimg: {
        marginRight: '15px'
    },
    chip: {
        margin: '4px 0px'
    },
    img: {
        borderRadius: '10px',
        width: '100px',
        height: '100px'
    },
    sideDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }
}));

export default function Ticket(props) {
    const classes = useStyles();
    const { id, price, amount, concert, desc, file, onDelete, isSold, isPhysical } = props;
    const [open, setOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isTicketPhysical, setIsTicketPhysical] = useState(isPhysical);
    const [enteredConcert, setEnteredConcert] = useState(concert._id);
    const [enteredPrice, setEnteredPrice] = useState(price);
    const [enteredAmount, setEnteredAmount] = useState(amount);
    const [enteredDesc, setEnteredDesc] = useState(desc);
    const [enteredFile, setEnteredFile] = useState(file);
    const { token } = authenticationService.currentUserValue.data;
    const userId = authenticationService.currentUserValue.data
        ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;

    const editTicket = async () => {
        const formData = new FormData();

        if (!isTicketPhysical) {
            formData.append('file', enteredFile, enteredFile.name);
        }

        formData.append('_id', id);
        formData.append('concertId', enteredConcert);
        formData.append('price', enteredPrice);
        formData.append('amount', enteredAmount);
        formData.append('userId', userId);
        formData.append('isPhysical', isTicketPhysical);
        formData.append('desc', enteredDesc);

        await axios.post('api/tickets/', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    };

    return (
        <Card className={classes.card} elavation="2" hidden={isDeleted}>
            <CardContent className={classes.cardContent}>
                <div>

                    <Typography variant="h5" component="h2">
                        {concert.artist}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {`${concert.location}, ${moment(concert.time).format('DD/MM/YYYY HH:mm')}`}
                    </Typography>
                    <Typography>
                        {amount} Tickets
                    </Typography>
                    {desc ? (
                        <Typography>
                            Description: {desc}
                        </Typography>
                    ) : null}
                </div>
                <div className={classes.sideDiv}>
                    {concert.isDeleted
                        ? (
                            <Chip
                                label="This concert was deleted by admin"
                                className={classes.chip}
                            />
                        ) : null}
                    {isSold ? (
                        <Typography>
                            <img src={SoldImage} height="60px" width="60px" alt="sold" />
                        </Typography>
                    ) : null}
                    {file ? (
                        <img className={classes.img} src={`http://localhost:9000/public/${file}`} alt="img" />
                    ) : null}
                    <Typography className={classes.price}>
                        {`${price}₪`}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                {!isSold ? (
                    <IconButton onClick={() => setOpen(true)}>
                        <EditIcon />
                    </IconButton>
                ) : null}
                <AddTicketFade
                    open={open}
                    AddMode={false}
                    submitText="Update Ticket"
                    enteredAmount={enteredAmount}
                    setEnteredAmount={setEnteredAmount}
                    enteredDesc={enteredDesc}
                    setEnteredDesc={setEnteredDesc}
                    enteredPrice={enteredPrice}
                    setEnteredPrice={setEnteredPrice}
                    enteredConcert={enteredConcert}
                    setEnteredConcert={setEnteredConcert}
                    enteredFile={enteredFile}
                    setEnteredFile={setEnteredFile}
                    isTicketPhysical={isTicketPhysical}
                    setIsTicketPhysical={setIsTicketPhysical}
                    handleSubmit={editTicket}
                    handleClose={() => setOpen(false)}
                />

                <IconButton onClick={() => {
                    setIsDeleted(true);
                    onDelete(id);
                }}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}