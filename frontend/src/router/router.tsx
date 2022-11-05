import { BaseLayOut, SideMenuLayOut } from "../layouts";
import {
  Market,
  Registration,
  Autorisation,
  PasswordRecover,
  Assessment,
  Settings,
  Home,
} from "../pages";

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
        element: <Autorisation />,
        path: "/",
      },
      {
        key: "registration",
        element: <Registration />,
        path: "/registration",
      },
      {
        key: "password-recover",
        element: <PasswordRecover />,
        path: "/password-recover",
      },
    ],
  },
  {
    key: "side_menu_layout",
    layoutElement: <SideMenuLayOut />,
    routes: [
      {
        key: "market",
        element: <Market />,
        path: "/market",
      },
      {
        key: "assessment",
        element: <Assessment />,
        path: "/assessment/*",
      },
      {
        key: "settings",
        element: <Settings />,
        path: "/settings/*",
      },
    ],
  },
];
