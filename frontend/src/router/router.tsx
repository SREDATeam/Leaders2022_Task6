import { ProtectedRoute } from "components";
import { AuthRoute } from "./AuthContextRoutes";
import { BaseLayOut, SideMenuLayOut } from "../layouts";
import { lazy } from "react";

const Market = lazy(() => import("../pages/Market/Market"));
const Registration = lazy(() => import("../pages/Registration/Registration"));
const Autorisation = lazy(() => import("../pages/Autorisation/Autorisation"));
const PasswordRecover = lazy(
  () => import("../pages/PasswordRecover/PasswordRecover"),
);
const Assessment = lazy(() => import("../pages/Assessment/Assessment"));
const Settings = lazy(() => import("../pages/Settings/Settings"));

interface PageRoute {
  element: React.ReactElement;
  path: string;
  key: React.Key;
  index?: boolean;
}

interface LayOutRoute {
  key: React.Key;
  layoutElement: React.ReactElement;
  routes: PageRoute[];
}

export const routesInLayOuts: LayOutRoute[] = [
  {
    key: "base_layout",
    layoutElement: <BaseLayOut />,
    routes: [
      {
        key: "autorisation",
        element: (
          <AuthRoute>
            <Autorisation />
          </AuthRoute>
        ),
        path: "/",
      },
      {
        key: "registration",
        element: (
          <AuthRoute>
            <Registration />
          </AuthRoute>
        ),
        path: "/registration",
      },
      // {
      //   key: "password-recover",
      //   element: <PasswordRecover />,
      //   path: "/password-recover",
      // },
    ],
  },
  {
    key: "side_menu_layout",
    layoutElement: <SideMenuLayOut />,
    routes: [
      {
        key: "market",
        element: (
          <ProtectedRoute>
            <Market />
          </ProtectedRoute>
        ),
        path: "/market",
      },
      {
        key: "assessment",
        element: (
          <ProtectedRoute>
            {" "}
            <Assessment />
          </ProtectedRoute>
        ),
        path: "/assessment/*",
      },
      {
        key: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
        path: "/settings/*",
      },
    ],
  },
];
