import { lazy } from "react";
import Loadable from "../Loadable";
import UserLayout from "@components/layouts/user";
import AuthGuard from "../AuthGuard";

const Profile = Loadable(lazy(() => import("@pages/user/Profile")));
const Dashboard = Loadable(lazy(() => import("@pages/user/Dashboard")));
const Landing = Loadable(lazy(() => import("@pages/user/landing")));
const RegisterdEvents = Loadable(lazy(() => import("@pages/user/RegisteredEvents.jsx")))
const FillAttendance = Loadable(lazy(() => import('@pages/user/FillAttendance.jsx')))
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
      element: <Landing />
    },
    {
      path: "user/registered-events",
      element: <RegisterdEvents />
    },
    {
      path: "user/secret/:token",
      element: <FillAttendance />
    }
  ],
};

export default UserRoutes;
