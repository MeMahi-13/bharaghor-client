import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/Signup";
import Dashboard from "../pages/dashboard/dashboard";
import Sidebar from "../pages/sidebar/Sidebar";
import Dashboardnav from "../pages/dashboardnav/dashboardnav";
import Profile from "../pages/profile/Profile";
import UserDetails from "../pages/admin/UserDetails";
import UpdateUser from "../pages/admin/UpdateUser";
import Details from "../pages/Properties/UserPending";
import Saved from "../pages/Saved/Saved";
import Post from "../pages/Post/Post";
import Properties from "../pages/Properties/Properties";
import UserInfo from "../pages/user_information/UserInfo";

import AdminUsers from "../pages/admin/AdminUsers";
import AdminPendingPosts from "../pages/admin/post/AdminPendingPost";
import PendingPostsByUser from "../pages/admin/post/AdminPendingPost";
import UserPendingPosts from "../pages/Properties/UserPending";
import CardDetails from "../pages/card_details/Card_Details"; 
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AdminDashboard from "../pages/admin/admindashboard/AdminDashboard"
import PostDetails from "../pages/Post/PostDetails";
import AllUsers from "../pages/admin/AllUsers";
import Revenue from "../pages/admin/Revenue";
import UserBookings from "../pages/booking/UserBookings";
import Booking from "../pages/booking/booking";
import TotalUser from "../pages/admin/TotalUser";
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
        path: "/card_details",
        element: <CardDetails />,
      },
      {
        path: "/details/:id",
        element: <PostDetails />,
      },
      {
        path: "user_information",
        element: <UserInfo />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/pendingPost",
        element: <UserPendingPosts />,
      },
      {
        path: "/adminUsers",
        element: <AdminUsers />,
      },
      {
        path: "/admin/posts/pending/:userId",
        element: <PendingPostsByUser />,
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
        element: <Login />,
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
        index: true,
        loader: ({ params }) =>
          fetch(`https://yessghor-server.vercel.app/users/${params.id}`),
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboardnav",
        element: <Dashboardnav />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/properties",
        element: <Properties />,
      },
      {
        path: "/dashboard/saved",
        element: <Saved />,
      },
      {
        path: "/dashboard/booking",
        element: <Booking />,
      },
      

    ],
  },
  {
    element: <AdminDashboardLayout />,
     children: [
      {
        path: "/admin/dashboard",
        element: < AdminDashboard/>,
      },
       {
        path: "/admin/posts/pending",
        element: <AdminPendingPosts />,
      },
      {
        path: "/admin/dashboard/manage-users",
        element: <AllUsers/>,
      },
       {
        path: "/admin/revenue",
        element: <Revenue/>,
      },
      {
        path: "/admin/totaluser",
        element: <TotalUser/>,
      },
    ],
  },

]);
