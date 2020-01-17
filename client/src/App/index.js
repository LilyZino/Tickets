import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import PostsList from './Components/PostsList';
import AddPost from './Components/AddPost';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
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
                <PostsList />
            </Container>
            <AddPost />
        </div>
    );
}
