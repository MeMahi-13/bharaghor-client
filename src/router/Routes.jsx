import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authentication/Login"
import SignUp from "../pages/authentication/Signup"
import Profile from "../pages/profile/Profile";  // adjust path based on file location
import Dashboard from "../pages/dashboard/dashboard";
import Users from "../pages/admin/Users";
import Details from "../pages/details/details";
import DashboardLayout from "../layouts/DashboardLayout";
import Sidebar from "../pages/sidebar/Sidebar";
import Dashboardnav from "../pages/dashboardnav/dashboardnav"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/details",
        element: <Details />,
      },

      {
        path: "/profile",   // <-- new profile route
        element: <Profile />,
      },
      
      
      {
        path: "/users",
        loader:()=>fetch('https://yessghor-server.vercel.app/users'),
        element:<Users/>
      }
    ],
  },
   {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login/>,
      },
       {
        path: "/register",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/sidebar",
        element: <Sidebar/>,
      },
      {
        path: "/dashboard",
        element: <Dashboard/>,
      },
      {
        path: "/dashboardnav",
        element: <Dashboardnav/>,
      },

       
    ],
  },
]);
