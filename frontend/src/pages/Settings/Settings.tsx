import { useNavigate, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { Adjusments, Layout, User } from "components/Settings";

import classes from "./Settings.module.scss";

export const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // navigate("/");
  }, []);

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
