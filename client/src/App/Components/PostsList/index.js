import React, { useState, useEffect } from 'react';
import Post from '../Posts';

export default function PostsList(props) {
    const { posts, filter } = props;
    const [filteredPosts, setFilteredPosts] = useState(posts);

    console.log('filteredPosts');
    console.log(filteredPosts);

    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts]);

    useEffect(() => {
        const postsToRender = posts.filter((post) => {
            return post.title.toLowerCase().includes(filter.title);
        });

        setFilteredPosts(postsToRender);

        console.log('filter:');
        console.log(filter);
        console.log('postsToRender:');
        console.log(postsToRender);
    }, [posts, filter]);


    return (
        <div>
            {filteredPosts.map((post) => (
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