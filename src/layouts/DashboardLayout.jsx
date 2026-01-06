// @flow strict

import * as React from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router';

function DashboardLayout() {
    return (
        <div className='flex gap-5'>
            <Sidebar/>
            <Outlet/>
        </div>
    );
};

export default DashboardLayout;