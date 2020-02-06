import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        margin: 'auto',
    },
    title: {
        textAlign: 'center'
    },
    error: {
        textAlign: 'center',
        color: 'red'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    submitBtn: {
        marginTop: '16px'
    },
}));

export default function EntryModal(props) {
    const classes = useStyles();
    const textStyles = {
        display: props.isRegister ? 'block' : 'none'
    };
    return (
        <div>
            <Modal
                className={classes.button}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" className={classes.title}>
                            Sign in
                        </Typography>
                        <Typography component="h5" className={classes.error}>
                            {props.errorText}
                        </Typography>
                        <form noValidate autoComplete="off">
                            <Grid className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="UserName"
                                    label="User Name"
                                    name="UserName"
                                    autoComplete="UserName"
                                    value={props.enteredUname}
                                    onChange={(event) => {
                                        props.setEnteredUname(event.target.value);
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={props.enteredPass}
                                    onChange={(event) => {
                                        props.setEnteredPass(event.target.value);
                                    }}
                                />
                                <TextField
                                    style={textStyles}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    label="email"
                                    type="email"
                                    id="email"
                                    autoComplete="current-email"
                                    value={props.enteredEmail}
                                    onChange={(event) => {
                                        props.setEnteredEmail(event.target.value);
                                    }}
                                />
                                <TextField
                                    style={textStyles}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="phone"
                                    label="phone"
                                    type="phone"
                                    id="phone"
                                    autoComplete="phone"
                                    value={props.enteredPhone}
                                    onChange={(event) => {
                                        props.setEnteredPhone(event.target.value);
                                    }}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    autoFocus
                                    className={classes.submit}
                                    onClick={props.handleSubmit}
                                >
                                    {!props.isRegister ? 'Sign In' : 'Sign Up'}
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
