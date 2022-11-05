import {
  NavLink,
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import clsx from "clsx";
import classes from "./StepsLayout.module.scss";

export const StepsLayout = ({ dataState }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const stepClasses = ({ isActive }: { isActive: boolean }): string => {
    return clsx(classes.step_btn, isActive && classes.active);
  };

  return (
    <div className={classes.steps_layout}>
      <div className={classes.steps}>
        <NavLink to={"archive"} className={stepClasses}>
          Архив
        </NavLink>
        <NavLink to={"argeement"} className={stepClasses}>
          Согласование
        </NavLink>
        <NavLink to={"forecast"} className={stepClasses}>
          Прогноз
        </NavLink>
        <NavLink to={"calculation"} className={stepClasses}>
          Расчет
        </NavLink>
        <NavLink to={"analogs"} className={stepClasses}>
          Аналоги
        </NavLink>
        <div
          className={classes.step_btn}
          onClick={() => {
            if (dataState) navigate("bilding");
          }}
        >
          Объект
        </div>
        <NavLink to={"objects"} className={stepClasses}>
          Задание
        </NavLink>
      </div>
      <div className={classes.wrap}>
        {location.pathname === "/assessment" ? (
          <Navigate to="objects" replace={true} />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
