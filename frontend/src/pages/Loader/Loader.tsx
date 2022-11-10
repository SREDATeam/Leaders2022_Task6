import classes from "./Loader.module.scss";
import { Spin } from "antd";

export const Loader = () => {
  return (
    <div className={classes.loader}>
      <Spin size="large" />
    </div>
  );
};
