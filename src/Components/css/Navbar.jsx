import React from 'react';

const Navbar = () => {
    return (
        <div>
           <h1> Navbar</h1>
           <div className='flex gap-5'> <a className='border-2 p-2' href="/login">Login</a>
            <a className='border-2 p-2' href="/register">Sign Up</a></div>
        </div>
    );
};

export default Navbar;