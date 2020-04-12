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
import AddTicketFade from '../AddTicket/newTicketFade';
import { authenticationService } from '../../_services';

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
    const { id, name, email, phone } = props;
    const [open, setOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const onDelete = (idToDelete) => {
        console.log('delete', idToDelete);
    };

    return (
        <Card className={classes.card} elavation="2" hidden={isDeleted}>
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
                </CardContent>
            </div>
            <CardActions>
                <IconButton onClick={() => setOpen(true)}>
                    <EditIcon />
                </IconButton>
                <AddTicketFade
                    open={open}
                    AddMode={false}
                    submitText="Update Ticket"
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