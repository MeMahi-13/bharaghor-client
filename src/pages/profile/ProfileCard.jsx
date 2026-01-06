import React from 'react';
import { Link } from 'react-router';

const ProfileCard = ({user}) => {
     const { _id, name, email } = user;
     console.log(name)
    return (
        <div>
            {_id}
            {name}
            {email}
             </div>
    );
};

export default ProfileCard;