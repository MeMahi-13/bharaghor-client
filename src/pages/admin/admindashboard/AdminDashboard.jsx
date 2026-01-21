// @flow strictimport { FaUser, FaHome, FaCheckCircle } from "react-icons/fa";
import * as React from 'react';
import { FaUser, FaShoppingCart, FaCog } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { BsCurrencyDollar,BsBuildings } from "react-icons/bs";

const cards = [
    { title: "Users", icon: <FiUsers /> },
    { title: "Orders", icon: <BsCurrencyDollar /> },
    { title: "Settings", icon: <BsBuildings /> },
  ];
  const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    properties: 12,
    status: "Active",
    joinDate: "2024-06-15",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "User",
    properties: 5,
    status: "Inactive",
    joinDate: "2023-11-02",
  },
];

function AdminDashboard() {
    return (
      
        <div>
            <div style={styles.container}>
      {cards.map((card, index) => (
        <div key={index} style={styles.card}>
          
          {/* Icon Box */}
          <div style={styles.iconBox}>
            <div style={styles.icon}>{card.icon}</div>
          </div>

          {/* Card Content */}
          <h3>{card.title}</h3>
          <p>This is a sample description text.</p>
        </div>
      ))}
    </div>
   
    <div className="w-full bg-white shadow-[0_6px_13px_0_rgba(0,0,0,0.1)] border border-[#FFFFFF] rounded-2xl overflow-hidden">
<div className='p-3 flex items-center justify-between'>
    <div className='flex items-center gap-1'>
           <div style={{ width: "36px",
    height: "36px",
    borderRadius: "10px",
    backgroundColor: "#DBEAFE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    }}>
        <FiUsers style={{
    fontSize: "20px",
    color: "#155DFC",
  }}/>
  </div>
   <div><p className='font-bold text-lg text-[#101828]'>Recent Users</p>
   <p className='font-normal text-xs text-[#6A7282]'>Latest registered members</p> </div> 
    </div>
 <div className='flex items-center gap-1'>
    <p className='font-normal text-sm text-[#0988E3]'>View All</p>
    <div style={{ width: "16px",
    height: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    }}>
        <IoIosArrowForward style={{
    fontSize: "16px",
    color: "#155DFC",
  }}/>
  </div>
 </div>
</div>
  {/* Header Row */}
  <div className="flex bg-white  p-6 font-semibold text-sm">
    <div className="flex-1 ">User Info</div>
    <div className="flex-1 text-center">Role</div>
    <div className="flex-1 text-center">Properties</div>
    <div className="flex-1 text-center">Status</div>
    <div className="flex-1 text-right">Join Date</div>
  </div>

  {/* Data Rows */}
  {users.map((user) => (
    <div
      key={user.id}
      className="flex items-center p-6 bg-white hover:bg-gray-50 transition"
    >
      {/* User Info */}
      <div className="flex-1 ">
        <p className="font-medium">{user.name}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>

      {/* Role */}
      <div className="flex-1 text-center">
        <span className="text-sm">{user.role}</span>
      </div>

      {/* Properties */}
      <div className="flex-1 text-center">
        <span className="text-sm">{user.properties}</span>
      </div>

      {/* Status */}
      <div className="flex-1 text-center">
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            user.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {user.status}
        </span>
      </div>

      {/* Join Date */}
      <div className="flex-1 text-right">
        <span className="text-sm text-gray-600">{user.joinDate}</span>
      </div>
    </div>
  ))}
</div>

 
        </div>
                 
    
  );
}


export default AdminDashboard;
const styles = {
  container: {
    display: "flex",
    width: "100%",
    gap: "20px",
    padding: "20px",
  },
  card: {
    flex: 1, // 👈 Makes all 3 cards take equal width
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconBox: {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
    backgroundColor: "#f1f3f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  },
  icon: {
    fontSize: "28px",
    color: "#333",
  },
};