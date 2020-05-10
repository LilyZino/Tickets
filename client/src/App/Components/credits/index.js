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
// import EntryModal from './entryModal';
import Smiley from '../SmileyCanvas';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    // button: {
    //     margin: '5px'
    // },
    // okButton: {
    //     marginTop: '20px'
    // },
    userNameText: {
        float: 'left',
        margin: '0.3em',
        marginTop: '5%',
        // marginRight: '23.0em',
        textAlign: 'center'
    },
    div:{
        display:'inline'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // title: {
    //     textAlign: 'center'
    // },
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
    // const [openLogin, setOpenLogin] = useState(false);
    // const [openRegister, setOpenRegister] = useState(false);
    const [openCredits, setopenCredits] = useState(false);
    // const [enteredUname, setEnteredUname] = useState('');
    // const [enteredPass, setEnteredPass] = useState('');
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [enteredPhone, setEnteredPhone] = useState('');
    // const [loginError, setloginError] = useState('');
    // const [registerError, setRegisterError] = useState('');
    const [creditsAmount, setcreditsAmount] = useState('0');

    // const history = useHistory();

    // useEffect(() => {
    //     (async () => {
    //         if (authenticationService.currentUserValue) {
    //             setUname(authenticationService.currentUserValue.data.name);
    //         }
    //     })();
    // }, []);

    const handleOpenLogin = () => {
        // setOpenLogin(true);
    };

    const handleCloseLogin = () => {
        // setOpenLogin(false);
        // setloginError('');
        // history.replace('/');
    };

    const handleOpenRegister = () => {
        // setOpenRegister(true);
    };

    const handleCloseRegister = () => {
        // setOpenRegister(false);
        // setRegisterError('');
    };

    const handleRegisterSubmit = () => {
        // setRegisterError('');
        // authenticationService.register(enteredUname, enteredPass, enteredEmail, enteredPhone)
        //     .then(() => {
        //         setOpenRegister(false);
        //         setopenCredits(true);
        //     })
        //     .catch((response) => {
        //         setRegisterError(response.response.data.msg);
        //     });
    };

    const updateCredits = () =>{

    };

    return (
        <div className={classes.div}>
            <Typography variant="body2" className={classes.userNameText} onClick={()=>{setopenCredits(true)}}>
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
                        <Typography variant="h4" className={classes.title}>
                            You registered successfully!
                        </Typography>
                        <Typography variant="h5" className={classes.title}>
                            Please check your mail to complete registration
                        </Typography>
                        <Smiley />
                        <Button
                            className={classes.okButton}
                            variant="contained"
                            color="primary"
                            onClick={() => setopenCredits(false)}
                        >
                            OK
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
