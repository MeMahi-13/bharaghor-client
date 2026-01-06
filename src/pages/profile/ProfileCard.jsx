import React from 'react';
import { Link } from 'react-router';

const ProfileCard = ({user}) => {
     const { _id, name, email } = user;
     console.log(name)
    return (
        <div className=''>
           <h1>Name:  {_id}</h1>
            <h1>Id: {name}</h1>
            <h1>E-mail: {email}</h1>
             </div>
    );
};

export default ProfileCard;