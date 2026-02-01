import React from 'react';

import Footer from '../Components/css/Footer';

import { Outlet } from 'react-router';
import Navbar from '../Components/css/Navbar';

const HomeLayout = () => {
    return (
        <div className="homelayout">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;