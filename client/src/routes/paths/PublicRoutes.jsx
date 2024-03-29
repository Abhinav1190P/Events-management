import BaseLayout from "@components/layouts/base";
import PublicGuard from "@routes/PublicGuard";
import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";
import Landing from '@pages/user/landing.jsx'


const PublicRoutes = {
  element: (
    <PublicGuard>
      <BaseLayout />
    </PublicGuard>
  ),
  children: [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: (
        <PublicGuard>
          <Signup />
        </PublicGuard>
      ),
    },
  ],
};

export default PublicRoutes;
