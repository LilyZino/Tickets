import React, { useState } from 'react';
import { authenticationService } from '../../_services';
import { useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from "@material-ui/icons/MeetingRoom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import EntryModal from './entryModal'


const useStyles = makeStyles((theme) => ({
  button:{
    margin: '5px'
  }
}));

export default function Entrance() {
  const classes = useStyles();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [enteredUname, setEnteredUname] = useState('');
  const [enteredPass, setEnteredPass] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [loginError, setloginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  
  let history = useHistory();

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
    setloginError('')
    history.replace('/')
  };

  const handleOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
    setRegisterError('')
    // history.replace('/')
  };

  const logOut = () => {
    authenticationService.logout()
    console.log('im here')
    history.replace('/')
  };

  const handleLoginSubmit = () => {
    setloginError('')
    authenticationService.login(enteredUname, enteredPass)
    .then(()=>{ 
      setOpenLogin(false); 
      //history.replace('/')
    }).catch((response)=>{
      setloginError(response.response.data.msg)
    });
  };

  const handleRegisterSubmit = () => {
    setRegisterError('')
    authenticationService.register(enteredUname, enteredPass, enteredEmail)
    .then(()=>{ 
      setOpenRegister(false); 
      console.log('im here')
      history.replace('/')
    }).catch((response)=>{
      setRegisterError(response.response.data.msg)
    });
  };

  return (
    <div>
      { authenticationService.currentUserValue &&
        <IconButton  className={classes.ExitToAppIcon} color="inherit" aria-label="Logout" onClick={ logOut }>
          <LogoutIcon />
        </IconButton> 
      }
      { !authenticationService.currentUserValue &&
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
      }
      { !authenticationService.currentUserValue &&
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
      }
      {/* login */}
      <EntryModal
        open = {openLogin}
        handleClose = {handleCloseLogin}
        handleSubmit = {handleLoginSubmit}
        errorText = {loginError}
        enteredUname = {enteredUname}
        enteredPass = {enteredPass}
        setEnteredUname = { setEnteredUname }
        setEnteredPass = {setEnteredPass}
        isRegister = {false}
      />
      {/* register */}
      <EntryModal
        open = {openRegister}
        handleClose = {handleCloseRegister}
        handleSubmit = {handleRegisterSubmit}
        errorText = {registerError}
        enteredUname = {enteredUname}
        enteredPass = {enteredPass}
        enteredEmail = {enteredEmail}
        setEnteredUname = { setEnteredUname }
        setEnteredPass = {setEnteredPass}
        setEnteredEmail = {setEnteredEmail}
        isRegister = {true}
      />
    </div>
  );
}
