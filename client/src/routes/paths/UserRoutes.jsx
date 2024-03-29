import { lazy } from "react";
import Loadable from "../Loadable";
import UserLayout from "@components/layouts/user";
import AuthGuard from "../AuthGuard";

const Profile = Loadable(lazy(() => import("@pages/user/Profile")));
const Dashboard = Loadable(lazy(() => import("@pages/user/Dashboard")));
const Landing = Loadable(lazy(() => import("@pages/user/landing")));
const UserRoutes = {
  element: (
    <AuthGuard allowRole="user">
      <UserLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "user/dashboard",
      element: <Dashboard />,
    },
    {
      path: "user/profile",
      element: <Profile />,
    },
    {
      path: "user/landing",
      element:<Landing/>
    }
  ],
};

export default UserRoutes;
