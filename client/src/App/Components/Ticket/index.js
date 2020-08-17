import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RepeatIcon from '@material-ui/icons/Repeat';
import AttachMoney from '@material-ui/icons/AttachMoney';
import AttachFile from '@material-ui/icons/AttachFile';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AddTicketFade from '../AddTicket/newTicketFade';
import { authenticationService } from '../../_services';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '45%',
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
    badges: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    chip: {
        margin: '0px 4px',
        fontSize: 'x-small'
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
    const [upForExchange, setUpForExchange] = useState(props.upForExchange);
    const [open, setOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isTicketPhysical, setIsTicketPhysical] = useState(isPhysical);
    const [enteredConcert, setEnteredConcert] = useState(concert._id);
    const [enteredPrice, setEnteredPrice] = useState(price);
    const [enteredAmount, setEnteredAmount] = useState(amount);
    const [enteredDesc, setEnteredDesc] = useState(desc);
    const [enteredFile, setEnteredFile] = useState(file);
    const [exchangeExpanded, setExchangeExpanded] = useState(false);
    const [fileExpanded, setFileExpanded] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState();
    const [genres, setGenres] = useState([]);
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

    const toggleExchangeExpanded = () => {
        setExchangeExpanded(!exchangeExpanded);
    };

    const toggleFileExpanded = () => {
        setFileExpanded(!fileExpanded);
    };

    const setAsExchangeTicket = async () => {
        axios.put('/api/exchangecycles/tickets', {
            ticket: {
                id,
                artist: concert.artist,
                genre: concert.genre,
                userId
            },
            requestedGenre: selectedGenre
        }, { headers: { Authorization: `Bearer ${token}` } });
        setExchangeExpanded(false);
        setUpForExchange(true);
    };

    useEffect(() => {
        (async () => {
            if (exchangeExpanded) {
                const serverGenres = await axios.get('/api/concerts/genres');
                setGenres(serverGenres.data);
            }
        })();
    }, [exchangeExpanded]);

    return (
        <Card className={classes.card} elavation="2" hidden={isDeleted}>
            <CardContent>
                <div className={classes.badges}>
                    {
                        (upForExchange && isSold)
                            ? <Chip className={classes.chip} color="secondary" icon={<RepeatIcon />} label="Exchanged Successfully" />
                            : upForExchange
                                ? <Chip className={classes.chip} color="secondary" icon={<RepeatIcon />} label="Up for exchange" />
                                : isSold
                                    ? (<Chip className={classes.chip} color="secondary" icon={<AttachMoney />} label="Sold" />)
                                    : null
                    }
                    {concert.isDeleted
                        ? (
                            <Chip
                                label="This concert was removed by admin"
                            />
                        ) : null}
                </div>
                <div className={classes.cardContent}>
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
                        <Typography className={classes.price}>
                            {`${price}₪`}
                        </Typography>
                    </div>
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
                {!upForExchange && !isSold && !isPhysical
                    ? (
                        <IconButton onClick={() => {
                            toggleExchangeExpanded();
                        }}
                        >
                            <RepeatIcon />
                        </IconButton>
                    ) : null}
                {file
                    ? (
                        <IconButton onClick={() => {
                            toggleFileExpanded();
                        }}
                        >
                            <AttachFile />
                        </IconButton>
                    ) : null}
            </CardActions>
            <Collapse in={exchangeExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        Switching Tickets
                    </Typography>
                    <Typography>
                        For what ticket's genre you would like to exchange this ticket:
                        <Select
                            labelId="genreLabel"
                            label="Genres"
                            id="Genres"
                            value={selectedGenre}
                            onChange={(event) => { setSelectedGenre(event.target.value); }}
                        >
                            {genres.map((genre) => (
                                <MenuItem key={genre} value={genre}>
                                    {genre}
                                </MenuItem>
                            ))}
                        </Select>
                    </Typography>
                    <Button onClick={() => { setAsExchangeTicket(); }}>
                        Exchange
                    </Button>
                </CardContent>
            </Collapse>
            <Collapse in={fileExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        File Attached
                    </Typography>
                    <img className={classes.img} src={`http://localhost:9000/public/${file}`} alt="img" />
                </CardContent>
            </Collapse>
        </Card>
    );
}