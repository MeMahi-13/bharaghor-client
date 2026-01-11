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

import User_Information from "../pages/user_information/UserInfo"
import ImageUploader from "../a/ImageUploader";
import ImageGallery from "../a/images";
import UserInfo from "../pages/user_information/UserInfo";
import Post from "../pages/Post/Post";
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
        path: "/upload",
        element: <ImageUploader />,
      },
      {
         path: "/images",
        element: <ImageGallery />,
      },
      
      {
        path: "/details",
        element: <Details />,
      },
      {
        path: "user_information",
        element: <UserInfo />,
      },
    {
      path: "/post",
        element: <Post/>
      },
      {
        path: "users/:id",
        loader: ({ params }) =>
          fetch(`https://yessghor-server.vercel.app/users/${params.id}`),
        element: <UserDetails />,
      },
      {
        path: "update-user/:id",
        loader: ({ params }) =>
          fetch(`https://yessghor-server.vercel.app/users/${params.id}`),
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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index:true,
        loader: ({ params }) =>
          fetch(`https://yessghor-server.vercel.app/users/${params.id}`),
        element: <Dashboard/>,
      },
      {
        path: "/dashboard/profile",   
        element: <Profile />,
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
