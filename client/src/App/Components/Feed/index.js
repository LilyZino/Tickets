import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PostsList from '../PostsList';
import Search from '../Search';

const useStyles = makeStyles({
});

export default function Feed() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/posts');
            const postsToRender = response.data;

            // if (filter) {
            //     postsToRender = filter(postsToRender);
            // }

            console.log('feed render posts');
            setPosts(postsToRender);
        })();
    }, []);

    return (
        <div>
            <Search />
            <PostsList posts={posts} />
        </div>
    );
}