import React from 'react';
import { useLoaderData } from 'react-router';
import UserCard from '../../Components/css/admin/UserCard';

const Users = () => {
    const users = useLoaderData();
    console.log('')
    return (
        <div className='max-w-6xl mx-auto'>
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