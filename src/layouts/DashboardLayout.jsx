// @flow strict

import * as React from 'react';
import Sidebar from '../Components/Sidebar';

function DashboardLayout() {
    return (
        <div>
            <Sidebar/>
            <Outlet/>
        </div>
    );
};

export default DashboardLayout;