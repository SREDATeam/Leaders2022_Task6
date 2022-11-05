import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";

import clsx from "clsx";
import classes from "./Layout.module.scss";

export const Layout = () => {
  const location = useLocation();

  const stepClasses = ({ isActive }: { isActive: boolean }): string => {
    return clsx(classes.page_btn, isActive && classes.active);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.pages}>
        <NavLink to={"user"} className={stepClasses}>
          Пользователь
        </NavLink>
        <NavLink to={"adjusments"} className={stepClasses}>
          Корректировки
        </NavLink>
      </div>
      <div className={classes.wrap}>
        {location.pathname === "/settings" ? (
          <Navigate to="user" />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
