import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { lazy } from "react";
import Register from "../pages/Homepage/logs/register/Register";
import Login from "../pages/Homepage/logs/login/Login";
import Profile from "../pages/profile/Profile";
import { userLoader } from "../components/Loader/userLoader";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const Homepage = lazy(() => import("../pages/Homepage/Homepage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userLoader,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
