import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Saved from "../Saved/Saved";

const API_URL = "https://yessghor-server.vercel.app";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats
  useEffect(() => {
    if (!user?._id) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${API_URL}/dashboard/stats/${user._id}`
        );
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load dashboard data
      </div>
    );
  }

  const cards = [
    {
      title: "Total Properties",
      value: stats.total,
      icon: <FaHome />,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Listings",
      value: stats.active,
      icon: <FaCheckCircle />,
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Requests",
      value: stats.pending,
      icon: <FaClock />,
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Sold Properties",
      value: stats.sold,
      icon: <FaDollarSign />,
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome back, {user?.name || "User"}
        </h2>
        <p className="text-gray-500 mt-1">
          Here’s what’s happening with your properties today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.bg} p-6 rounded-xl shadow-sm hover:shadow-md transition`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h3 className="text-2xl font-bold mt-2">
                  {card.value}
                </h3>
              </div>
              <div
                className={`h-12 w-12 flex items-center justify-center rounded-full ${card.iconBg} ${card.iconColor} text-xl`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Saved Properties */}
      <div className="mt-14">
        <Saved />
      </div>
    </div>
  );
};

export default Dashboard;
