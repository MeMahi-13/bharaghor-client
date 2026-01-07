import React from 'react';
import Navbar from '../Components/css/Navbar';
import Footer from '../Components/css/Footer';

import { Outlet } from 'react-router';

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