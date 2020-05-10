/* eslint-disable radix */
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import axios from 'axios';
import Tab from '@material-ui/core/Tab';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    userNameText: {
        float: 'left',
        margin: '0.3em',
        marginTop: '5%',
        textAlign: 'center',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    div: {
        display: 'inline',
        cursor: 'pointer'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
}));

export default function Credits(props) {
    const classes = useStyles();
    const [openCredits, setopenCredits] = useState(false);
    const [tabValue, setTabValue] = React.useState(0);
    const [amount, setAmount] = React.useState(0);
    const [selectedDate, setselectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setselectedDate(date);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setAmount(0);
    };

    const changeCredits = async (uid, credits) => {
        setopenCredits(false);
        props.setCredits(parseInt(props.Credits) + parseInt(credits));
        await axios.post('/api/users/credits', {
            id: uid,
            credits: credits
        });
    };

    return (
        <div className={classes.div}>
            <Typography variant="body2" className={classes.userNameText} onClick={() => { setopenCredits(true); }}>
                You have {props.Credits} credits
            </Typography>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={openCredits}
                onClose={() => setopenCredits(false)}
                closeAfterTransition
            >
                <Fade in={openCredits}>
                    <div className={classes.paper}>
                        <Paper square>
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                variant="fullWidth"
                                indicatorColor="secondary"
                                textColor="secondary"
                                aria-label="icon label tabs example"
                            >
                                <Tab icon={<PaymentIcon />} label="Deposit" />
                                <Tab icon={<AccountBalanceIcon />} label="Withrawal" />
                            </Tabs>
                        </Paper>{// todo insert to paper
                        }
                        <form noValidate autoComplete="off">
                            <Grid className={classes.form}>
                                {tabValue === 1
                                    && (
                                        <div className={classes.div}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="BankAccount"
                                                label="Bank account"
                                                name="BankAccount"
                                                autoComplete="BankAccount"
                                            />
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="BankBranch"
                                                label="Bank Branch"
                                                name="BankBranch"
                                                autoComplete="BankBranch"
                                            />
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="BankNumber"
                                                label="Bank number"
                                                name="BankNumber"
                                                autoComplete="BankNumber"
                                            />
                                        </div>
                                    )}
                                {tabValue === 0
                                    && (
                                        <div className={classes.div}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                label="Credit card"
                                            />
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Expiration date"
                                                    format="MM/yyyy"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                label="CVV"
                                            />
                                        </div>
                                    )}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Amount"
                                    label="Amount"
                                    name="Amount"
                                    autoComplete="Amount"
                                    value={amount}
                                    onChange={(event) => {
                                        if (tabValue === 1 && event.target.value > props.Credits) {
                                            setAmount(props.Credits);
                                        } else {
                                            setAmount(event.target.value);
                                        }
                                        console.log(`${props.Credits} ${event.target.value} ${tabValue}`);
                                    }}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    autoFocus
                                    onClick={() => { changeCredits(props.uId,
                                        (tabValue === 0 ? amount : amount * -1)); }}
                                >
                                    Done
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
