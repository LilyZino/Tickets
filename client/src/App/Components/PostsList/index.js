import React from 'react';
import Post from '../Posts';

export default function PostsList(props) {
    const { posts } = props;

    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    text={post.text}
                    artist={post.artist}
                    price={post.price}
                    count={post.count}
                    date={post.date}
                />
            ))}
        </div>
    );
}