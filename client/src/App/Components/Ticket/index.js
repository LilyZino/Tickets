import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';
import AddTicketFade from '../AddTicket/newTicketFade';
import { authenticationService } from '../../_services';
import base64 from 'base-64';
import FileImage from 'file-loader!../../../../../public/uploads/file-1589182346652.file';

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
    const { id, price, amount, concert, sold, file, onDelete } = props;
    const [open, setOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [enteredConcert, setEnteredConcert] = useState(concert._id);
    const [enteredPrice, setEnteredPrice] = useState(price);
    const [enteredAmount, setEnteredAmount] = useState(amount);
    const [enteredSold, setEnteredSold] = useState(sold);
    const [enteredFile, setEnteredFile] = useState(file);
    //console.log(sold);

    const handleSubmit = async () => {
        const { token } = authenticationService.currentUserValue.data;
        const userId = authenticationService.currentUserValue.data
            ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
        await axios.post('/api/tickets', {
            _id: id,
            concertId: enteredConcert,
            price: enteredPrice,
            amount: enteredAmount,
            sold: enteredSold,
            file: enteredFile,
            userId
        }, { headers: { Authorization: `Bearer ${token}` } });
    };

    function filedata(afile) {
        if (afile) {
            return afile.data
        }
        return {}
    }

    return (
        <Card className={classes.card} elavation="2" hidden={isDeleted}>
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
                    <Typography>
                        {sold} Sold
                    </Typography>
                    {file ? (
                        <embed
                            src={`file-loader!../../../../../public/uploads/${file}`} //width="65" height="65"
                            //{`../../../../../public/uploads/${file}`}{FileImage}
                        />
                    ) : null}
                </CardContent>
                <Typography align="right" className={classes.price}>
                    {`${price}₪`}
                </Typography>
            </div>
            <CardActions>
                <IconButton onClick={() => setOpen(true)}>
                    <EditIcon />
                </IconButton>
                <AddTicketFade
                    open={open}
                    AddMode={false}
                    submitText="Update Ticket"
                    enteredAmount={enteredAmount}
                    setEnteredAmount={setEnteredAmount}
                    enteredSold={enteredSold}
                    setEnteredSold={setEnteredSold}
                    enteredPrice={enteredPrice}
                    setEnteredPrice={setEnteredPrice}
                    enteredConcert={enteredConcert}
                    setEnteredConcert={setEnteredConcert}
                    enteredFile={enteredFile}
                    setEnteredFile={setEnteredFile}
                    handleSubmit={handleSubmit}
                    handleClose={() => setOpen(false)}
                />

                <IconButton onClick={() => {
                    setIsDeleted(true);
                    onDelete(id);
                }}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}