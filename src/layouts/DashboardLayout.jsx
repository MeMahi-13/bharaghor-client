
import { Outlet } from 'react-router';
import Sidebar from '../Components/Sidebar';

function DashboardLayout() {
    return (
        <div className='flex gap-5'>
            <Sidebar/>
            <Outlet/>
        </div> 
        
    );
};

export default DashboardLayout;