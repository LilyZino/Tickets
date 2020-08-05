import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { green, red, grey } from '@material-ui/core/colors';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles(() => ({
    card: {
        width: '40%',
        margin: 15,
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
    },
    thumbUp: {
        color: green[500]
    },
    thumbDown: {
        color: red[500]
    },
    noThumb: {
        color: grey
    }
}));

export default function SoldTicket(props) {
    const classes = useStyles();
    const { concert, file, price, user, rankId, ticketRank } = props;
    const [ticRank, setTicketRank] = useState(ticketRank);

    const changeRank = async (rank) => {
        if (rank + ticRank > -2 && rank + ticRank < 2) {
            setTicketRank(ticRank + rank);
            await axios.post('/api/users/rank', {
                id: user,
                rank,
                rankId
            });
        }
    };

    return (
        <Card className={classes.card} elavation="2">
            <div className={classes.cardContent}>
                <ListItemIcon>
                    <div>
                        <div>
                            <IconButton className={ticRank === 1 ? classes.thumbUp : classes.noThumb} onClick={() => changeRank(1)}>
                                <ThumbUpIcon />
                            </IconButton>
                        </div>
                        <div>
                            <IconButton className={ticRank === -1 ? classes.thumbDown : classes.noThumb} onClick={() => changeRank(-1)}>
                                <ThumbDownIcon />
                            </IconButton>
                        </div>
                    </div>
                </ListItemIcon>
                <ListItemText>
                    <Typography variant="h5" component="h2">
                        {concert.artist} - {price}₪
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
                </ListItemText>
            </div>
        </Card>
    );
}