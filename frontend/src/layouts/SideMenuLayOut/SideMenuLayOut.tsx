import { useContext } from "react";
import { AuthContext } from "../../router/AuthProvider";

import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { Popover, Typography } from "antd";
import {
  CalculatorOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.min.css";
import classes from "./SideMenuLayOut.module.scss";
import clsx from "clsx";

const { Title } = Typography;

export const SideMenuLayOut: React.FC = () => {
  const { onLogout } = useContext(AuthContext);
  const linkClasses = ({ isActive }: { isActive: boolean }): string => {
    return clsx(classes.link, isActive && classes.active);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.side_menu}>
        <Title level={5} className={classes.title}>
          SREDA
        </Title>

        <Popover placement="right" content={"Рынок"}>
          <NavLink to="/market" className={linkClasses}>
            <HomeOutlined className={classes.icon} />
          </NavLink>
        </Popover>

        <Popover placement="right" content={"Оценка"}>
          <NavLink to="/assessment" className={linkClasses}>
            <CalculatorOutlined className={classes.icon} />
          </NavLink>
        </Popover>

        <Popover placement="right" content={"Настройки"}>
          <NavLink to="/settings" className={linkClasses}>
            <SettingOutlined className={classes.icon} />
          </NavLink>
        </Popover>

        <Popover placement="right" content={"Выйти"}>
          <NavLink to="/" className={linkClasses} onClick={onLogout}>
            <LogoutOutlined className={classes.icon_out} />
          </NavLink>
        </Popover>
      </div>
      <div className={classes.wrap}>
        <Outlet />
      </div>
    </div>
  );
};
