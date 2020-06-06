import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    card: {
        minWidth: 275,
        marginTop: 15,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    price: {
        fontSize: '2rem'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));

export default function SoldTicket(props) {
    const classes = useStyles();
    const { concert, file } = props;

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
                            >
                                <a href={`http://localhost:9000/public/${file}`} download={`${concert.artist}-ticket`}>
                            Download
                                </a>
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
        </div>
    );
}