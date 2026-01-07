import { createBrowserRouter,Navigate } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/Signup";

import Dashboard from "../pages/dashboard/dashboard";

import Sidebar from "../pages/sidebar/Sidebar";
import Dashboardnav from "../pages/dashboardnav/dashboardnav"
import Profile from "../pages/profile/Profile";
import UserDetails from "../pages/admin/UserDetails";
import UpdateUser from "../pages/admin/UpdateUser";
import Details from "../pages/details/details";
import Post from "../pages/Post/Post";
import User_Information from "../pages/user_information/user_information"
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
        path: "user_information",
        element: <User_Information />,
      },

    {
 path: "post",
        element: localStorage.getItem("userInfoCompleted")
          ? <Post />
          : <Navigate to="/user_information" replace />,
      },
      
    
     
      
      {
        path: "users/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
        element: <UserDetails />,
      },
      {
        path: "update-user/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
        element: <UpdateUser />,
      },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "register",
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
       {
        path: "dashboard/profile",   
        element: <Profile />,
      },

       
    ],
  },
]);
