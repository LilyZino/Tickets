import React, { useEffect, useState } from 'react';
import { authenticationService } from '../../_services';
import axios from 'axios';
import PostsList from '../PostsList';

export default function PersonalArea() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            if(authenticationService.currentUserValue){
                const userId = authenticationService.currentUserValue.data ? 
                    authenticationService.currentUserValue.data._id :  authenticationService.currentUserValue._id;
                const getPostsResponse = await axios.get('/api/posts/user/' + userId);
                setPosts(getPostsResponse.data);
        }})();
    }, []);

    return (
        <div>
            <PostsList posts={posts} isEditable />
        </div>
    );
}