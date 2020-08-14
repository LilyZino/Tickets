import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { authenticationService } from '../../_services';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: '5px'
    },
    okButton: {
        marginTop: '20px'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        minWidth: 275,
        marginTop: 15
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
    },
    pos: {
        marginBottom: 12,
    },
    iconLocation: {
        marginLeft: 'auto',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
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
    userNameText: {
        float: 'left',
        margin: '0.3em',
        marginTop: '5%',
        textAlign: 'center',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
}));

export default (props) => {
    const classes = useStyles();
    const { openUser, setOpenUser, user } = props;
    const [complaint, setComplaint] = useState('');
    const [openReport, setOpenReport] = useState(false);

    const handleReport = async (ReportComplaint, target) => {
        const userName = authenticationService.currentUserValue.data
            ? authenticationService.currentUserValue.data.name : authenticationService.currentUserValue._id;

        await axios.post('/api/users/report', {
            ReportComplaint,
            target,
            userName
        });
    };

    return (
        <div>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={openUser}
                onClose={() => setOpenUser(false)}
                closeAfterTransition
            >
                <Fade in={openUser}>
                    <div className={classes.paper}>
                        <Typography variant="h3" className={classes.title}>
                            {user.name}
                        </Typography>
                        <Typography variant="h2" className={classes.title}>
                            Rank: {user.rank}
                        </Typography>
                        <Typography variant="h2" className={classes.title}>
                            Phone: {user.phone}, Mail: {user.email}
                        </Typography>
                        <br />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            autoFocus
                            onClick={() => {
                                setOpenReport(true);
                            }}
                        >
                                    Report User
                        </Button>
                        <br />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            autoFocus
                            onClick={() => {
                                setOpenUser(false);
                            }}
                        >
                                    Done
                        </Button>
                    </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={openReport}
                onClose={() => setOpenReport(false)}
                closeAfterTransition
            >
                <Fade in={openReport}>
                    <div className={classes.paper}>
                        <Typography variant="h3" className={classes.title}>
                            You are reporting <b>{user.name}</b>
                        </Typography>
                        <Typography variant="h3" className={classes.title}>
                            Please explain your complaint and the Admin will take it into consideration
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            value={complaint}
                            placeholder="Start typing..."
                            fullWidth
                            multiline
                            rows={4}
                            onChange={(event) => {
                                setComplaint(event.target.value);
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            autoFocus
                            onClick={() => {
                                handleReport(complaint, user._id);
                                setOpenReport(false);
                            }}
                        >
                                    Send to Admin
                        </Button>
                        <br />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            autoFocus
                            onClick={() => {
                                setOpenReport(false);
                            }}
                        >
                                    Cancel
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};