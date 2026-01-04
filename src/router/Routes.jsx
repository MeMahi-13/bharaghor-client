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
        path: "/profile",   // <-- new profile route
        element: <Profile />,
      },
       {
        path: "/dashboard",   // <-- new profile route
        element: <Dashboard />,
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
        element: <Login></Login>,
      },
       {
        path: "/register",
        element: <SignUp />,
      },
    ],
  },
]);
