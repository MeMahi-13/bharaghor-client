// @flow strict
import * as React from "react";
import Sidebar from "../pages/sidebar/Sidebar"

<<<<<<< HEAD
import Dashboardnav from "../pages/dashboardnav/dashboardnav"
import { Outlet } from 'react-router';

function DashboardLayout() {
  return (
   <div  style={styles.dashboardLayout}>
      <Sidebar />
      <div style={styles.mainWrapper}>
        <Dashboardnav/>
        <main style={styles.dashboardContent} >
        <Outlet /> 
      </main>
      </div>
      
    </div>
  );
}
=======
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
>>>>>>> 82499098854eb235d763e0f10ef7dc5a845b6c03

export default DashboardLayout;
const styles = {
dashboardLayout: {
  display: "flex",
  minHeight: "100vh",
  background:"#f9fafb" ,
},

/* Main content beside sidebar */
dashboardContent: { 
  padding: "24px",
  flex:"1",
  overflowY: "auto",
},
mainWrapper: {
  marginLeft: "260px",
  width: "calc(100% - 260px)",
  display: "flex",
  flexDirection: "column",
  background: "#f9fafb",
}

  
};
