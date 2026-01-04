import React from 'react';
import { useLoaderData } from 'react-router';
import UserCard from '../../Components/css/admin/UserCard';

const Users = () => {
    const users = useLoaderData();
    return (
        <div>
            <h1>Total Users</h1>
            <div>
                {
                    users.map(user=><UserCard user={user} key={user._id}/>)
                }
            </div>

        </div>
    );
};

export default Users;