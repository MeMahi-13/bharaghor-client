import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";
const TotalUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [statusFilter, setStatusFilter] = useState(""); 

  const API_URL = "https://yessghor-server.vercel.app";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/users` ,
          {credentials:"include"}
        );
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
          setFilteredUsers(data); 
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  
 /* const handleSearch = () => {
    if (!statusFilter) {
      setFilteredUsers(users);
      return;
    }

    const result = users.filter(
      (user) => user.status === statusFilter
    );
    setFilteredUsers(result);
  };*/
 useEffect(() => {
  if (!statusFilter) {
    setFilteredUsers(users);
  } else {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.status &&
          user.status.toUpperCase() === statusFilter.toUpperCase()
      )
    );
  }
}, [statusFilter, users]);



  return (
    <div>
      <div className="w-full bg-white     overflow-hidden mt-8">
       
        

        {/* FILTER SECTION */}
        <div className="px-4 py-4 bg-white flex items-center gap-3 rounded-xl border-2 border-[#E5E7EB]">
<div className="flex items-center">
     <CiFilter className="text-xl text-[#6A7282]" />
            <p className="font-medium text-lg text-[#101828]">Filters:</p>
</div>
           
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border-2 border-[#D1D5DC] rounded-xl px-4 py-2 text-sm focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="Verified">Verified</option>
            <option value="BANNED">Banned</option>
            <option value="Not Verified">Pending</option>
          </select>

          <button
           
            className="px-5 py-2 bg-[#0988E3] text-white font-medium leading-[1.2] rounded-xl text-base"
          >
            Search
          </button>
        </div>

        {/* Header Row */}
        <div className="flex bg-gray-50 p-4 font-medium text-[#101828] text-base uppercase leading-4 mt-3">
          <div className="flex-1">User Info</div>
          <div className="flex-1 text-center">Properties</div>
          <div className="flex-1 text-center">Status</div>
          <div className="flex-1 text-right">Join Date</div>
          <div className="flex-1 text-right">ACTIONS</div>
        </div>

        {/* User Rows */}
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center p-4 bg-white hover:bg-gray-50 transition"
            >
              {/* User Info */}
              <div className="flex-1">
                <div className="flex gap-2 items-center">
                  <img
                    src={user.profileImage}
                    className="w-10 h-10 rounded-full object-cover border flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Properties */}
              <div className="flex-1 text-center">
                {user.properties || 0}
              </div>

              {/* Status */}
              <div className="flex-1 text-center">
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    user.status === "VERIFIED"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              {/* Join Date */}
              <div className="flex-1 text-right text-sm text-gray-600">
              {user.createdAt
  ? new Date(user.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  : "—"}


              </div>

              {/* Actions */}
              <div className="flex-1 flex justify-end">
                <button className="flex items-center gap-1 px-3 py-2 bg-[#101828] text-white rounded-lg whitespace-nowrap">
                  <MdBlock />
                  Ban User
                </button>
              </div>
            </div>
          ))
        ) : (
            <div className="flex flex-col items-center justify-center py-8">
  <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[#D82222]">
    <RxCross1 className="text-[#D82222] text-xl" />
  </div>

  <p className="mt-4 text-center font-normal text-base text-gray-500">
    No users found matching your search criteria.
  </p>
</div>

         
        )}
      </div>
    </div>
  );
};

export default TotalUser;
