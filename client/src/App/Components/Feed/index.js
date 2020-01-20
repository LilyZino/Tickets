import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import axios from 'axios';
import PostsList from '../PostsList';
import Search from '../Search';

const useStyles = makeStyles({
});

export default function Feed() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        console.log(`useEffect: ${response}`);
    };

    useEffect(() => {
        const sockets = io();
        sockets.on('posts-updated', () => {
            console.log('posts was updated');
            getAllPosts();
        });

        getAllPosts();
    }, []);

    return (
        <div>
            <Search />
            <PostsList posts={posts} />
        </div>
    );
}