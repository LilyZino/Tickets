import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import PostsList from './Components/PostsList';

const useStyles = makeStyles((theme) => ({
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

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <FullTitle variant="h6" className={classes.title}>
                        Tickets
                    </FullTitle>
                </Toolbar>
            </AppBar>
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
                            <PostsList />
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