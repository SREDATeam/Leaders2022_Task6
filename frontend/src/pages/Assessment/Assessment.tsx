import { useState } from "react";
import {
  Agreement,
  Analogs,
  Archive,
  Bilding,
  Calculation,
  Forecast,
  Map,
  Objects,
  StepsLayout,
} from "components/Assessment";
import { Route, Routes } from "react-router-dom";
import classes from "./Assessment.module.scss";

export const Assessment = () => {
  const [data, setData] = useState();
  const [dataState, setDataState] = useState(!!data);

  return (
    <div className={classes.assessment_container}>
      <Routes>
        <Route path="/" element={<StepsLayout dataState={dataState} />}>
          <Route
            path="objects"
            element={
              <Objects
                data={data}
                setData={setData}
                setDataState={setDataState}
              />
            }
          />
          <Route path="bilding" element={<Bilding data={data} />} />
          <Route path="analogs" element={<Analogs />} />
          <Route path="calculation" element={<Calculation />} />
          <Route path="forecast" element={<Forecast />} />
          <Route path="argeement" element={<Agreement />} />
          <Route path="archive" element={<Archive />} />
        </Route>
      </Routes>
    </div>
  );
};
