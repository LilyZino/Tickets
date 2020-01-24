import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { authenticationService } from '../../_services';
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
            console.log("1")
            console.log(authenticationService.currentUserValue)
            if(authenticationService.currentUserValue){
                const userId = authenticationService.currentUserValue._id;
                const getPostsResponse = await axios.get('/api/posts/user/' + userId);
                //const getUserResponse = await axios.get(`/api/users/${authenticationService.currentUserValue._id}`);

                setPosts(getPostsResponse.data);
               // setUser(getUserResponse.data);

                console.log(posts);
                console.log(authenticationService.currentUserValue);
        }})();
    }, []);

    return (
        <div>
            <PostsList posts={posts} isEditable />
        </div>
    );
}