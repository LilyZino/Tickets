import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Posts';

export default function PostsList() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/posts');
            setPosts(response.data);
            console.log('useEffect: ' + response);
        })();
    }, []);

    return (
        <div>
            {posts.map(post => <Post key={post._id} title={post.title} text={post.text} artist={post.artist} price={post.price}></Post>)}
            {console.log(posts)}

        </div>
    );
}