import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LogoutIcon from '@material-ui/icons/MeetingRoom';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authenticationService } from '../../_services';
import EntryModal from './entryModal';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: '5px'
    },
    okButton: {
        marginTop: '20px'
    },
    userNameText: {
        float: 'left',
        margin: '0.3em',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center'
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

export default function Entrance() {
    const classes = useStyles();
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openAfterRegistrationMessage, setOpenAfterRegistrationMessage] = useState(false);
    const [enteredUname, setEnteredUname] = useState('');
    const [enteredPass, setEnteredPass] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [loginError, setloginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [Uname, setUname] = useState('');

    const history = useHistory();

    useEffect(() => {
        (async () => {
            if (authenticationService.currentUserValue) {
                setUname(authenticationService.currentUserValue.data.name);
            }
        })();
    }, []);

    const handleOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
        setloginError('');
        history.replace('/');
    };

    const handleOpenRegister = () => {
        setOpenRegister(true);
    };

    const handleCloseRegister = () => {
        setOpenRegister(false);
        setRegisterError('');
    };

    const logOut = () => {
        authenticationService.logout();
        setUname('');
        history.replace('/');
    };

    const handleLoginSubmit = () => {
        setloginError('');
        authenticationService.login(enteredUname, enteredPass)
            .then(() => {
                setOpenLogin(false);
                setOpenRegister(false);
                setUname(enteredUname);
            }).catch((response) => {
                setloginError(response.response.data.msg);
            });
    };

    const handleRegisterSubmit = () => {
        setRegisterError('');
        authenticationService.register(enteredUname, enteredPass, enteredEmail)
            .then(() => {
                setOpenRegister(false);
                setOpenAfterRegistrationMessage(true);
            })
            .catch((response) => {
                setRegisterError(response.response.data.msg);
            });
    };

    return (
        <div>
            {Uname != ''
                && (
                    <Typography component="h1" variant="h5" className={classes.userNameText}>
                        Hello {Uname}
                    </Typography>
                )}
            {authenticationService.currentUserValue
                && (
                    <IconButton className={classes.ExitToAppIcon} color="inherit" aria-label="Logout" onClick={logOut}>
                        <LogoutIcon />
                    </IconButton>
                )}
            {!authenticationService.currentUserValue
                && (
                    <Button
                        className={classes.button}
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleOpenLogin}
                    >
                        Login
                    </Button>
                )}
            {!authenticationService.currentUserValue
                && (
                    <Button
                        className={classes.button}
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleOpenRegister}
                    >
                        Register
                    </Button>
                )}
            {/* login */}
            <EntryModal
                open={openLogin}
                handleClose={handleCloseLogin}
                handleSubmit={handleLoginSubmit}
                errorText={loginError}
                enteredUname={enteredUname}
                enteredPass={enteredPass}
                setEnteredUname={setEnteredUname}
                setEnteredPass={setEnteredPass}
                isRegister={false}
            />
            {/* register */}
            <EntryModal
                open={openRegister}
                handleClose={handleCloseRegister}
                handleSubmit={handleRegisterSubmit}
                errorText={registerError}
                enteredUname={enteredUname}
                enteredPass={enteredPass}
                enteredEmail={enteredEmail}
                setEnteredUname={setEnteredUname}
                setEnteredPass={setEnteredPass}
                setEnteredEmail={setEnteredEmail}
                isRegister
            />
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={openAfterRegistrationMessage}
                onClose={() => setOpenAfterRegistrationMessage(false)}
                closeAfterTransition
            >
                <Fade in={openAfterRegistrationMessage}>
                    <div className={classes.paper}>
                        <Typography variant="h4" className={classes.title}>
                            You registered successfully!
                        </Typography>
                        <Typography variant="h5" className={classes.title}>
                            Please check your mail to complete registration
                        </Typography>
                        <Button
                            className={classes.okButton}
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenAfterRegistrationMessage(false)}
                        >
                            OK
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
