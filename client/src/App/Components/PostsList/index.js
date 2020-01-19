import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Post from '../Posts';

export default function PostsList() {
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
            {posts.map((post) => (
                <Post
                    key={post._id}
                    title={post.title}
                    text={post.text}
                    artist={post.artist}
                    price={post.price}
                    date={post.date}
                />
            ))}
            {console.log(posts)}
        </div>
    );
}