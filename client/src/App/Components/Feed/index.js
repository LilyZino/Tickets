import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import PostsList from '../PostsList';
import Search from '../Search';

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({});

    const getAllPosts = async () => {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        console.log(`useEffect getAllPosts: ${response}`);
    };

    const handleFilter = (searchFilter) => {
        setFilter(searchFilter);
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
            <Search setFilter={handleFilter} />
            <PostsList filter={filter} posts={posts} />
        </div>
    );
}