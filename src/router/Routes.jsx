import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
<<<<<<< HEAD
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/Signup";

=======
import Login from "../pages/authentication/Login"
import SignUp from "../pages/authentication/Signup"
import Profile from "../pages/profile/Profile";  // adjust path based on file location
>>>>>>> 9f446fedaf778b49a934a6a4d4cbca8c1331f4d2
import Dashboard from "../pages/dashboard/dashboard";
import Users from "../pages/admin/Users";
import UserDetails from "../pages/admin/UserDetails";
import UpdateUser from "../pages/admin/UpdateUser";
import Profile from "../pages/profile/Profile";
import ProfileCard from "../pages/profile/ProfileCard";

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
<<<<<<< HEAD
        path: "users",
        loader: () => fetch("http://localhost:5000/users"),
        element: <Users />,
=======
        path: "/profile",   // <-- new profile route
        element: <Profile />,
>>>>>>> 9f446fedaf778b49a934a6a4d4cbca8c1331f4d2
      },
       {
        path: "/dashboard",   // <-- new profile route
        element: <Dashboard />,
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
        path: "login",
        element: <Login />,
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
        index: true,
        element: <Dashboard />,
      },
      {
        path:"/dashboard/profile",
         element:<Profile/>


      },
      // {
      //   path: "dashboard/profile/:id",
      //   loader: ({ params }) =>
      //     fetch(`http://localhost:5000/users/${params.id}`),
      //   element: <Profile />,
      // },

      {},
    ],
  },
]);
