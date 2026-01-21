import * as React from "react";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { BsCurrencyDollar, BsBuildings } from "react-icons/bs";

function AdminDashboard() {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);

  const API_URL = "https://yessghor-server.vercel.app"; 

  // Map card titles to icons
  const iconMap = {
    Users: <FiUsers />,
    "Pending Posts": <BsCurrencyDollar />,
    "Approved Posts": <BsBuildings />,
  };

  // Fetch dashboard cards
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/cards`);
        const data = await res.json();
        if (res.ok) {
          const cardsWithIcons = data.map((card) => ({
            ...card,
            icon: iconMap[card.title] || <BsBuildings />,
          }));
          setCards(cardsWithIcons);
        }
      } catch (err) {
        console.error("Failed to fetch cards:", err);
      }
    };

    fetchCards();
  }, []);

  // Fetch recent users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/users`);
        const data = await res.json();
        if (res.ok) setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Cards */}
      <div style={styles.container}>
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.iconBox}>
                <div style={styles.icon}>{card.icon}</div>
              </div>
              <h3>{card.title}</h3>
              <p style={{ textAlign: "center", color: "#7f8c8d" }}>
                {card.description}
              </p>
            </div>
          ))
        ) : (
          <p>Loading dashboard cards...</p>
        )}
      </div>

      {/* Recent Users Table */}
      <div className="w-full bg-white shadow-lg border border-white rounded-2xl overflow-hidden mt-8">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiUsers className="text-blue-600 text-lg" />
            </div>
            <div>
              <p className="font-bold text-lg text-gray-900">Recent Users</p>
              <p className="text-xs text-gray-500">Latest registered members</p>
            </div>
          </div>
          <div className="flex items-center gap-1 cursor-pointer text-blue-500">
            <p className="text-sm font-medium">View All</p>
            <IoIosArrowForward className="text-lg" />
          </div>
        </div>

        {/* Header Row */}
        <div className="flex bg-gray-50 p-4 font-semibold text-sm">
          <div className="flex-1">User Info</div>
          <div className="flex-1 text-center">Role</div>
          <div className="flex-1 text-center">Properties</div>
          <div className="flex-1 text-center">Status</div>
          <div className="flex-1 text-right">Join Date</div>
        </div>

        {/* User Rows */}
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center p-4 bg-white hover:bg-gray-50 transition"
            >
              {/* User Info */}
              <div className="flex-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>

              {/* Role */}
              <div className="flex-1 text-center">
                <span className="text-sm">{user.role}</span>
              </div>

              {/* Properties */}
              <div className="flex-1 text-center">
                <span className="text-sm">{user.properties || 0}</span>
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
                <span className="text-sm text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

// Styles for dashboard cards
const styles = {
  container: {
    display: "flex",
    width: "100%",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    flex: "1 1 220px",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  iconBox: {
    width: "60px",
    height: "60px",
    borderRadius: "12px",
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
