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
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

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
    column: {
        float: 'left',
        margin: '10px'
    },
    crediColumn: {
        float: 'left',
        marginTop: '50px',
        margin: '10px'
    },
}));

export default function Credits(props) {
    const classes = useStyles();
    const { myCredits, setCredits } = props;
    const [openCredits, setopenCredits] = useState(false);
    const [tabValue, setTabValue] = React.useState(0);
    const [amount, setAmount] = React.useState(0);
    const [cvc, setcvc] = useState('');
    const [expiry, setexpiry] = useState('');
    const [dateError, setdateError] = useState(false);
    const [name, setname] = useState('');
    const [cardnumber, setnumber] = useState('');

    let today = new Date();
    let mm = today.getMonth() + 1;
    const yy = today.getFullYear().toString().substr(-2);
    if (mm < 10) {
        mm = `0${mm}`;
    }

    today = `${mm}/${yy}`;

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setAmount(0);
    };

    const changeCredits = async (uid, credits) => {
        setopenCredits(false);
        setCredits(parseInt(props.myCredits) + parseInt(credits));
        await axios.post('/api/users/credits', {
            id: uid,
            credits
        });
    };

    function clearNumber(value = '') {
        return value.replace(/\D+/g, '');
    }

    function formatExpirationDate(value) {
        const clearValue = clearNumber(value);

        if (clearValue.length >= 3) {
            return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
        }

        return clearValue;
    }

    return (
        <div className={classes.div}>
            <Typography variant="body2" className={classes.userNameText} onClick={() => { setopenCredits(true); }}>
                <img src="../../../Assets/images/coin.png" alt="" />
                {myCredits}
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
                                                type="number"
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
                                                type="number"
                                                inputProps={{ min: '100', max: '999', step: '1' }}
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
                                                type="number"
                                                inputProps={{ min: '10', max: '99', step: '1' }}
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
                                            <div className={classes.crediColumn}>
                                                <Cards
                                                    cvc={cvc}
                                                    expiry={expiry}
                                                    name={name}
                                                    number={cardnumber}
                                                />
                                            </div>
                                            <Grid className={classes.column}>
                                                <div>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        type="number"
                                                        name="number"
                                                        value={cardnumber}
                                                        pattern="[\d| ]{16,22}"
                                                        placeholder="Card Number"
                                                        onChange={(event) => {
                                                            setnumber(event.target.value);
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        name="name"
                                                        value={name}
                                                        type="text"
                                                        placeholder="Name"
                                                        onChange={(event) => {
                                                            setname(event.target.value);
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        format="MM/yy"
                                                        value={expiry}
                                                        placeholder="Expiry date"
                                                        onChange={(event) => {
                                                            setexpiry(formatExpirationDate(event.target.value));
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        name="cvc"
                                                        value={cvc}
                                                        type="number"
                                                        inputProps={{ min: '100', max: '9999', step: '1' }}
                                                        pattern="\d{3,4}"
                                                        placeholder="CVC"
                                                        onChange={(event) => {
                                                            if (event.target.value) setcvc(event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
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
                                    type="number"
                                    autoComplete="Amount"
                                    value={amount}
                                    onChange={(event) => {
                                        if (tabValue === 1 && event.target.value > props.Credits) {
                                            setAmount(props.Credits);
                                        }
                                        if (event.target.value > 0) {
                                            setAmount(event.target.value);
                                        }
                                    }}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    autoFocus
                                    onClick={() => {
                                        if (expiry < today) {
                                            setdateError(true);
                                        } else {
                                            changeCredits(props.uId,
                                                (tabValue === 0 ? amount : amount * -1));
                                        }
                                    }}
                                >
                                    Done
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={dateError}
                onClose={() => setdateError(false)}
                closeAfterTransition
            >
                <Fade in={dateError}>
                    <div className={classes.paper}>
                        <Typography variant="h4" className={classes.title}>
                            Credits failed to update because your card is expired
                        </Typography>
                        <Button
                            className={classes.okButton}
                            variant="contained"
                            color="primary"
                            onClick={() => setdateError(false)}
                        >
                            OK
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
