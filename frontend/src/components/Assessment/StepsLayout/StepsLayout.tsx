import {
  NavLink,
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import clsx from "clsx";
import classes from "./StepsLayout.module.scss";

export const StepsLayout = ({ dataStates }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const stepClasses = ({ isActive }: { isActive: boolean }): string => {
    return clsx(classes.stepnav_btn, isActive && classes.active);
  };

  const BlockingNavLink = ({
    children,
    className,
    to,
    allowed = true,
  }: {
    children?: React.ReactNode;
    className?: string;
    to: string;
    allowed?: boolean;
  }) => {
    const lockation = useLocation().pathname.split("/");
    const isMe = lockation[lockation.length - 1] === to;
    return (
      <div
        className={clsx(
          classes.stepnav_btn,
          className,
          allowed && classes.allowed,
          isMe && classes.active,
        )}
        onClick={() => {
          if (allowed) navigate(to);
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className={classes.steps_layout}>
      <div className={classes.steps}>
        <BlockingNavLink to="archive">Архив</BlockingNavLink>
        <BlockingNavLink to="argeement" allowed={dataStates.calculation}>
          Согласование
        </BlockingNavLink>
        <BlockingNavLink to="forecast" allowed={dataStates.forecast}>
          Прогноз
        </BlockingNavLink>
        <BlockingNavLink to="calculation" allowed={dataStates.calculation}>
          Расчет
        </BlockingNavLink>
        <BlockingNavLink to="analogs" allowed={dataStates.floors}>
          Аналоги
        </BlockingNavLink>
        <BlockingNavLink to="bilding" allowed={dataStates.floors}>
          Объект
        </BlockingNavLink>
        <BlockingNavLink to="objects">Задание</BlockingNavLink>
      </div>
      <div className={classes.wrap}>
        {location.pathname === "/assessment" ? (
          <Navigate to="objects" replace />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
