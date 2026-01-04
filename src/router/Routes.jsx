import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authentication/Login"
import SignUp from "../pages/authentication/Signup"
import Profile from "../pages/profile/Profile";
import Users from "../pages/admin/Users";
import UserDetails from "../pages/admin/UserDetails";
import UpdateUser from "../pages/admin/UpdateUser";

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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/users",
        loader:()=>fetch('http://localhost:5000/users'),
        element:<Users/>
      },
       {
        path:"/users/:id",
        loader:({params})=>fetch(`http://localhost:5000/users/${params.id}`),
        element: <UserDetails/>
    },
     {
        path:"/users/:id",
        loader:({params})=>fetch(`http://localhost:5000/users/${params.id}`),
        element: <UserDetails/>
    },
    {
      path:"/update-user/:id",
      loader:({params})=>fetch(`http://localhost:5000/users/${params.id}`),
      element:<UpdateUser/>
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
