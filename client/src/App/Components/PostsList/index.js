import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Post from '../Posts';

const PostsList = (props) => {
    const { posts, filter } = props;
    const [filteredPosts, setFilteredPosts] = useState(posts);

    useEffect(() => {
        const postsToRender = posts.filter((post) => {
            if (_.isEmpty(filter)) return posts;

            if (filter.title) {
                return post.title.toLowerCase().includes(filter.title);
            }

            return true;
        });

        setFilteredPosts(postsToRender);
    }, [posts, filter, props]);


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
};

export default PostsList;