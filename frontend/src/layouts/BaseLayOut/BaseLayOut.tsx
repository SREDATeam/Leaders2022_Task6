import { Outlet } from "react-router";
import { Layout } from "antd";

import "antd/dist/antd.min.css";
import classes from "./BaseLayOut.module.scss";

export const BaseLayOut: React.FC = () => {
  return (
    <Layout className={classes.layout}>
      <Outlet />
    </Layout>
  );
};
