import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from '../User';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const response = await axios.get('/api/users/');
        setUsers(response.data);
        console.log(users);
    };

    useEffect(() => {
        getUsers();
    }, [users]);

    return (
        <div>
            {users.map((user) => (
                <User
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    email={user.email}
                    phone={user.phone}
                    rank={user.rank}
                    isBlocked={user.isBlocked}
                />
            ))}
        </div>
    );
};

export default UsersList;