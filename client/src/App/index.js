import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import AttachMoney from '@material-ui/icons/AttachMoney';
import PeopleIcon from '@material-ui/icons/People';
import ReportIcon from '@material-ui/icons/Report';
import EditIcon from '@material-ui/icons/Edit';
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
import RepeatIcon from '@material-ui/icons/Repeat';
import Divider from '@material-ui/core/Divider';
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
import Exchanges from './Components/ExchangesList';
import ReportList from './Components/ReportList';
import Purchases from './Components/Purchases';

const useStyles = makeStyles(() => ({
    list: {
        width: '275px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        width: '160px',
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
                                <img className={classes.logo} src="../../Assets/Images/logo.png" alt="" />
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
                                && <ListItemLink to="/recs" primary="Recommended for you" icon={<LocalActivityIcon />} onClick={onDrawerClicked} />}
                            {authenticationService.currentUserValue
                                && <ListItemLink to="/userExchanges" primary="My Exchanges" icon={<RepeatIcon />} onClick={onDrawerClicked} />}
                            {authenticationService.currentUserValue
                                && <ListItemLink to="/userProfile" primary="My Tickets" icon={<AccountCircleIcon />} onClick={onDrawerClicked} />}
                            {authenticationService.currentUserValue
                                && <ListItemLink to="/purchases" primary="My Purchases" icon={<AttachMoney />} onClick={onDrawerClicked} />}
                            <Divider />
                            {authenticationService.currentUserValue && authenticationService.currentUser2.value.data.isAdmin
                                && <ListItemLink to="/edit-concerts" primary="Edit Concerts" icon={<EditIcon />} onClick={onDrawerClicked} />}
                            {authenticationService.currentUserValue && authenticationService.currentUser2.value.data.isAdmin
                                && <ListItemLink to="/charts" primary="Statistic" icon={<BarChartIcon />} onClick={onDrawerClicked} />}
                            {authenticationService.currentUserValue && authenticationService.currentUser2.value.data.isAdmin
                                && <ListItemLink to="/users" primary="Users" icon={<PeopleIcon />} onClick={onDrawerClicked} />}
                            {authenticationService.currentUserValue && authenticationService.currentUser2.value.data.isAdmin
                                && <ListItemLink to="/reports" primary="Reports" icon={<ReportIcon />} onClick={onDrawerClicked} />}
                            <Divider />
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
                        <Route path="/purchases">
                            <Purchases />
                        </Route>
                        <Route path="/userExchanges">
                            <Exchanges />
                        </Route>
                        <Route path="/users">
                            <UsersList />
                        </Route>
                        <Route path="/reports">
                            <ReportList />
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