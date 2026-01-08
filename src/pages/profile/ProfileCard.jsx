import React from 'react';
import { Link } from 'react-router';

const ProfileCard = ({user}) => {
     const { _id, name, email, createdAt
 } = user;
     console.log(user)
    return (
        <div className=''>
           <h1 className=' p-3 m-3 rounded'>Name:  {_id}</h1>
            <h1 className='p-3 m-3 rounded'>Id: {name}</h1>
            <h1 className='p-3 m-3 rounded'>E-mail: {email}</h1>
            <h1 className='p-3 m-3 rounded'>Became User: {createdAt}</h1>
             </div>
    );
};

export default ProfileCard;