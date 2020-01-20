import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PostsList from '../PostsList';

const useStyles = makeStyles({
});

export default function PersonalArea() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const userId = '5e19e0e24975240b38166236';
            const response = await axios.get(`/api/posts/user/${userId}`);
            const postsToRender = response.data;
            console.log('personal area render posts:');
            console.log(response.data);
            setPosts(postsToRender);
        })();
    }, []);

    return (
        <div>
            <PostsList posts={posts} isEditable />
        </div>
    );
}