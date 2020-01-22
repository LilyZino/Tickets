import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PostsList from '../PostsList';

const useStyles = makeStyles({
});

export default function PersonalArea() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        (async () => {
            const userId = '5e19e0e24975240b38166236';
            const getPostsResponse = await axios.get(`/api/posts/user/${userId}`);
            const getUserResponse = await axios.get(`/api/users/${userId}`);

            setPosts(getPostsResponse.data);
            setUser(getUserResponse.data);

            console.log(posts);
            console.log(user);
        })();
    }, []);

    return (
        <div>
            Hello {user.name}
            <PostsList posts={posts} isEditable />
        </div>
    );
}