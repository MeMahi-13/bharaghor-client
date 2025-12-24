import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authentication/Login"
import SignUp from "../pages/authentication/Signup"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
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
