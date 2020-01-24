import React, { useEffect, useState } from 'react';
import { authenticationService } from '../../_services';
import { useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LogoutIcon from "@material-ui/icons/MeetingRoom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import EntryModal from './entryModal'


const useStyles = makeStyles((theme) => ({
  button:{
    margin: '5px'
  },
  userNameText:{
    float: 'left',
    margin: '0.3em',
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
  const [Uname, setUname] = useState('');
  
  let history = useHistory();

  useEffect(() => {
    (async () => {
        if(authenticationService.currentUserValue){
          setUname(authenticationService.currentUserValue.data.name)
    }})();
}, []);

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
  };

  const logOut = () => {
    authenticationService.logout()
    setUname('')
    history.replace('/')
  };

  const handleLoginSubmit = () => {
    setloginError('')
    authenticationService.login(enteredUname, enteredPass)
    .then(()=>{ 
      setOpenLogin(false);
      setOpenRegister(false);
      setUname(enteredUname)
    }).catch((response)=>{
      setloginError(response.response.data.msg)
    });
  };

  const handleRegisterSubmit = () => {
    setRegisterError('')
    authenticationService.register(enteredUname, enteredPass, enteredEmail)
      .then(handleLoginSubmit).catch((response)=>{
          setRegisterError(response.response.data.msg)
        });
  };

  return (
    <div>
      { Uname != '' &&
      <Typography component="h1" variant="h5" className={classes.userNameText}>
          Hello {Uname}
        </Typography>
      }
      { authenticationService.currentUserValue &&
        <IconButton className={classes.ExitToAppIcon} color="inherit" aria-label="Logout" onClick={ logOut }>
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
