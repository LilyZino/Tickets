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
import Entrance from './Components/Users/entryButtons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import PostsList from './Components/PostsList';
import AddPost from './Components/AddPost';
import Search from './Components/Search';
import About from './Components/About';
import ListItemLink from './Components/ListItemLink';

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
                        <Entrance/>
                    </Toolbar>
                </AppBar>
                <Drawer open={drawerState} onClose={onDrawerClicked}>
                    <List className={classes.list}>
                        <ListItemLink to="/feed" primary="Feed" icon={<ConfirmationNumberIcon />} />
                        <ListItemLink to="/about" primary="About Us" icon={<InfoIcon />} />
                        <ListItemLink to="/userProfile" primary="My Tickets" icon={<AccountCircleIcon />} />
                    </List>
                </Drawer>
                <Container maxWidth="md">
                    <Switch>
                        <Route path="/login">
                            login form
                        </Route>
                        <Route path="/register">
                            register form
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/feed">
                            <Search />
                            <PostsList />
                            <AddPost />
                        </Route>
                        <Route path="/userProfile">
                            user profile
                        </Route>
                        <Route path="/">
                            <Redirect to="/feed" />
                            {/* TODO: implement that / will go to /feed if user is logged,
                            if not go to /login */}
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </div>
    );
}