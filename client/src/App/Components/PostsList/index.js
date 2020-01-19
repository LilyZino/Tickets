import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Posts';

export default function PostsList(props) {
    const { userId, filter } = props;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            let response;

            if (userId) {
                response = await axios.get(`/api/posts/user/${userId}`);
            } else {
                response = await axios.get('/api/posts');
            }

            let postsToRender = response.data;

            if (filter) {
                postsToRender = filter(postsToRender);
            }

            setPosts(postsToRender);
        })();
    }, [filter, userId]);

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