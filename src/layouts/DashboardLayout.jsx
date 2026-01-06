<<<<<<< HEAD

import { Outlet } from 'react-router';
=======
// @flow strict

import * as React from 'react';
>>>>>>> 9f446fedaf778b49a934a6a4d4cbca8c1331f4d2
import Sidebar from '../Components/Sidebar';

function DashboardLayout() {
    return (
<<<<<<< HEAD
        <div className='flex gap-5'>
            <Sidebar/>
            <Outlet/>
        </div> 
        
=======
        <div>
            <Sidebar/>
            <Outlet/>
        </div>
>>>>>>> 9f446fedaf778b49a934a6a4d4cbca8c1331f4d2
    );
};

export default DashboardLayout;