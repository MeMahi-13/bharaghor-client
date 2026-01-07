
import Sidebar from "../pages/sidebar/Sidebar"

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
