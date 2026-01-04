import React from 'react';

const UserCard = ({user}) => {
    const {_id, name, email} = user;
    return (
        <div className='flex gap-3'>
            <h1>user name {name} </h1>
            <h1>user email: {email}</h1>
        </div>
    );
};

export default UserCard;