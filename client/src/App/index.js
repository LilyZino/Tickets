import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import InfoIcon from '@material-ui/icons/Info';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Entrance from './Components/Users/entryButtons';
import { authenticationService } from './_services';
import AddTicket from './Components/AddTicket';
import About from './Components/About';
import ListItemLink from './Components/ListItemLink';
import PersonalArea from './Components/PersonalArea';
import Footer from './Components/Footer';
import ConcertsFeed from './Components/ConcertsFeed';
import AddConcert from './Components/AddConcert';

const useStyles = makeStyles((theme) => ({
    list: {
        width: '250px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

const FullTitle = styled(Typography)`
    flex-grow: 1
`;

export default function () {
    const classes = useStyles();

    const [drawerState, setDrawerState] = useState(false);

    const onDrawerClicked = () => {
        setDrawerState(!drawerState);
    };

    return (
        <div>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onDrawerClicked}>
                            <MenuIcon />
                        </IconButton>
                        <FullTitle variant="h6" className={classes.title}>
                            Tickets
                        </FullTitle>
                        <Entrance />
                    </Toolbar>
                </AppBar>
                <Drawer open={drawerState} onClose={onDrawerClicked}>
                    <List className={classes.list}>
                        <ListItemLink to="/concertsFeed" primary="Concerts" icon={<ConfirmationNumberIcon />} onClick={onDrawerClicked} />
                        {authenticationService.currentUserValue
                            && <ListItemLink to="/userProfile" primary="My Tickets" icon={<AccountCircleIcon />} onClick={onDrawerClicked} />}
                        <ListItemLink to="/about" primary="About Us" icon={<InfoIcon />} onClick={onDrawerClicked} />
                    </List>
                </Drawer>
                <Container maxWidth="md" id="main">
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/concertsFeed">
                            <ConcertsFeed />
                            <AddConcert />
                        </Route>
                        <Route path="/userProfile">
                            <PersonalArea />
                            <AddTicket />
                        </Route>
                        <Route path="/">
                            <Redirect to="/concertsFeed" />
                        </Route>
                    </Switch>
                </Container>
                <Footer />
            </Router>
        </div>
    );
}