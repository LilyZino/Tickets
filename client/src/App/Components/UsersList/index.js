import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from '../User';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get('/api/users/');
            setUsers(response.data);
        };

        getUsers();
    }, [users]);

    return (
        <div>
            {users.sort((a, b) => b.rank - a.rank).map((user) => (
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