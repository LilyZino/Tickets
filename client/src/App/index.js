import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import PostsList from './Components/PostsList';
import AddPost from './Components/AddPost';
import Search from './Components/Search';

const useStyles = makeStyles((theme) => ({
    list: {
        width: '250px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

const FullTitle = styled(Typography)`
    flex-grow: 1
`;

export default function ButtonAppBar() {
    const classes = useStyles();

    const [drawerState, setDrawerState] = useState(false);

    const onDrawerClicked = () => {
        setDrawerState(!drawerState);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onDrawerClicked}>
                        <MenuIcon />
                    </IconButton>
                    <FullTitle variant="h6" className={classes.title}>
                        Tickets
                    </FullTitle>
                </Toolbar>
            </AppBar>
            <Drawer open={drawerState} onClose={onDrawerClicked}>
                <List className={classes.list}>
                    <ListItem button key="about">
                        <ListItemIcon><InfoIcon /></ListItemIcon>
                        <ListItemText primary="About Us" />
                    </ListItem>
                    <ListItem button key="myTckets">
                        <ListItemIcon><ConfirmationNumberIcon /></ListItemIcon>
                        <ListItemText primary="My Tickets" />
                    </ListItem>
                </List>
            </Drawer>
            <Container maxWidth="md">
                <Router>
                    <Switch>
                        <Route path="/login">
                            login form
                        </Route>
                        <Route path="/register">
                            register form
                        </Route>
                        <Route path="/about">
                            about page
                        </Route>
                        <Route path="/feed">
                            <Search />
                            <PostsList />
                            <AddPost />
                            <Fab color="primary" aria-label="add" className={classes.fab}>
                                <AddIcon />
                            </Fab>
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
                </Router>
            </Container>
        </div>
    );
}