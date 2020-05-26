import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 275,
        marginTop: 15,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        alignItems: 'center'
    },
    soldimg: {
        marginRight: '15px'
    }
}));

export default function SoldTicket(props) {
    const classes = useStyles();
    const { concert, file } = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Card className={classes.card} elavation="2">
                <div className={classes.cardContent}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {concert.artist}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {`${concert.location}, ${moment(concert.time).format('DD/MM/YYYY HH:mm')}`}
                        </Typography>
                        {file ? (
                            <Button
                                className={classes.submitBtn}
                                type="submit"
                                color="primary"
                                onClick={handleOpen}
                            >
                        Show Ticket
                            </Button>
                        ) : null}
                    </CardContent>
                    {/* <div align="right" className={classes.soldimg}>
                        <Typography className={classes.price}>
                            {`${price}₪`}
                        </Typography>
                    </div> */}
                </div>
            </Card>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Typography>
                            <embed src={`http://localhost:9000/public/${file}`} alt="img" height="400px" width="400px" />
                        </Typography>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}