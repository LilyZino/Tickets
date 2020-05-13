import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import BarChartIcon from '@material-ui/icons/BarChart';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import Entrance from './Components/Users/entryButtons';
import { authenticationService } from './_services';
import theme from './theme';
import AddTicket from './Components/AddTicket';
import About from './Components/About';
import ListItemLink from './Components/ListItemLink';
import PersonalArea from './Components/PersonalArea';
import Footer from './Components/Footer';
import ConcertsFeed from './Components/ConcertsFeed';
import AddConcert from './Components/AddConcert';
import Charts from './Components/Charts';
import Recommendations from './Components/Recommendations';
import UsersList from './Components/UsersList';

const useStyles = makeStyles(() => ({
    list: {
        width: '275px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textShadow: '2px 3px #313131'
    }
}));

export default function () {
    const classes = useStyles();

    const [drawerState, setDrawerState] = useState(false);

    const onDrawerClicked = () => {
        setDrawerState(!drawerState);
    };

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <header>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onDrawerClicked}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Tickets
                            </Typography>
                            <Entrance />
                        </Toolbar>
                    </AppBar>
                </header>
                <nav>
                    <Drawer open={drawerState} onClose={onDrawerClicked}>
                        <List className={classes.list}>
                            <ListItemLink to="/concertsFeed" primary="Concerts" icon={<ConfirmationNumberIcon />} onClick={onDrawerClicked} />
                            {authenticationService.currentUserValue
                                && <ListItemLink to="/userProfile" primary="My Tickets" icon={<AccountCircleIcon />} onClick={onDrawerClicked} />}
                            {authenticationService.currentUserValue
                                && <ListItemLink to="/recs" primary="Recommended for you" icon={<LocalActivityIcon />} onClick={onDrawerClicked} />}
                            {authenticationService.currentUserValue && authenticationService.currentUser2.value.data.isAdmin
                                && <ListItemLink to="/charts" primary="Statistic" icon={<BarChartIcon />} onClick={onDrawerClicked} />}
                            {authenticationService.currentUserValue && authenticationService.currentUser2.value.data.isAdmin
                                && <ListItemLink to="/users" primary="Users" icon={<BarChartIcon />} onClick={onDrawerClicked} />}
                            {authenticationService.currentUserValue && authenticationService.currentUser2.value.data.isAdmin
                                && <ListItemLink to="/edit-concerts" primary="Edit Concerts" icon={<BarChartIcon />} onClick={onDrawerClicked} />}
                            <ListItemLink to="/about" primary="About Us" icon={<InfoIcon />} onClick={onDrawerClicked} />
                        </List>
                    </Drawer>
                </nav>
                <Container maxWidth="md" id="main">
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/charts">
                            <Charts />
                        </Route>
                        <Route path="/recs">
                            <Recommendations />
                        </Route>
                        <Route path="/concertsFeed">
                            <ConcertsFeed />
                            <AddConcert />
                        </Route>
                        <Route path="/userProfile">
                            <PersonalArea />
                            <AddTicket />
                        </Route>
                        <Route path="/users">
                            <UsersList />
                        </Route>
                        <Route path="/edit-concerts">
                            <ConcertsFeed editable />
                        </Route>
                        <Route path="/">
                            <Redirect to="/concertsFeed" />
                        </Route>
                    </Switch>
                </Container>
                <Footer />
            </Router>
        </ThemeProvider>
    );
}