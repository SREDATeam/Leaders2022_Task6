import { Route, Routes } from "react-router-dom";

import { Adjusments, Layout, User } from "components/Settings";

import classes from "./Settings.module.scss";

const Settings = () => {
  return (
    <div className={classes.settings}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="user" element={<User />} />
          <Route path="adjusments" element={<Adjusments />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Settings;
