import React, { useState } from 'react';
import { authenticationService } from '../../_services';
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
  avatar:{
    margin: 'auto',
  },
  title:{
    textAlign:'center'
  },
  error:{
    textAlign:'center',
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
  }
}));

export default function LoginDropDown() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [enteredUname, setEnteredUname] = useState('');
  const [loginError, setloginError] = useState('');
  const [enteredPass, setEnteredPass] = useState('');


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setloginError('')
    };

    const handleSubmit = () => {
      setloginError('')
      authenticationService.login(enteredUname, enteredPass)
      .then(()=>{ 
        console.log("back")
        setOpen(false); 
      }).catch((response)=>{
        console.log("response: " + response.response.data.msg)
        setloginError(response.response.data.msg)
      });
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
              timeout: 500,
          }}
      >
      <Fade in={open}>
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          Sign in
        </Typography>
        <Typography component="h5"  className={classes.error}>
          {loginError}
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
                autoFocus
                value={enteredUname}
                onChange={(event) => {
                  setEnteredUname(event.target.value);
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
        value={enteredPass}
        onChange={(event) => {
          setEnteredPass(event.target.value);
        }}
      />
      <Button
        // type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit}
      >
        Sign In
      </Button>
              </Grid>
          </form>
      </div>
      </Fade>
      </Modal>
      {/* <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
          <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
          </ListItemIcon>
          
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </StyledMenuItem>
        <StyledMenuItem>
        
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
          <ListItemText primary="Inbox" />
        </StyledMenuItem>
        <StyledMenuItem>
        <ListItemText primary="User name: " />
          <form  noValidate autoComplete="off">
            <TextField id="standard-basic" label="Standard" />
            </form>
        </StyledMenuItem>
      </StyledMenu> */}
    </div>
  );
}
