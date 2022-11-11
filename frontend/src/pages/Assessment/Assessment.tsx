import { useState, useEffect } from "react";
import {
  Agreement,
  Analogs,
  Archive,
  Bilding,
  Calculation,
  Forecast,
  Objects,
  StepsLayout,
} from "components/Assessment";
import { Route, Routes } from "react-router-dom";
import classes from "./Assessment.module.scss";

const Assessment = () => {
  const [floorsDataList, setFloorsDataList] = useState(
    JSON.parse(sessionStorage.getItem("floorsDataList")!),
  );
  const [floorsDataListState, setFloorsDataListState] = useState(
    Boolean(floorsDataList),
  );
  const [calculationDataList, setCalculationDataList] = useState(
    JSON.parse(sessionStorage.getItem("calculationDataList")!),
  );
  const [calculationDataListState, setCalculationDataListState] = useState(
    Boolean(calculationDataList),
  );

  const [forecastDataList, setForecastDataList] = useState(
    JSON.parse(sessionStorage.getItem("forecastDataList")!),
  );
  const [forecastDataListState, setForecastDataListState] = useState(
    Boolean(forecastDataList),
  );

  const [poolDataList, setPoolDataList] = useState(
    JSON.parse(sessionStorage.getItem("poolDataList")!),
  );
  const [poolDataListState, setPoolDataListState] = useState(
    Boolean(forecastDataList),
  );

  return (
    <div className={classes.assessment_container}>
      <Routes>
        <Route
          path="/"
          element={
            <StepsLayout
              dataStates={{
                floors: floorsDataListState,
                calculation: calculationDataListState,
                forecast: forecastDataListState,
              }}
            />
          }
        >
          <Route
            path="objects"
            element={
              <Objects
                floorsProps={{
                  data: floorsDataList,
                  state: floorsDataListState,
                }}
                setFloorsProps={{
                  data: setFloorsDataList,
                  state: setFloorsDataListState,
                }}
                setCalculationProps={{
                  data: setCalculationDataList,
                  state: setCalculationDataListState,
                }}
                setForecastProps={{
                  data: setForecastDataList,
                  state: setForecastDataListState,
                }}
                setPoolProps={{
                  data: setPoolDataList,
                  state: setPoolDataListState,
                }}
              />
            }
          />
          <Route
            path="bilding"
            element={
              <Bilding
                floorsProps={{
                  data: floorsDataList,
                  state: floorsDataListState,
                }}
              />
            }
          />
          <Route
            path="analogs"
            element={
              <Analogs
                floorsProps={{
                  data: floorsDataList,
                  state: floorsDataListState,
                }}
                setFloors={setFloorsDataList}
                setCalculation={{
                  data: setCalculationDataList,
                  state: setCalculationDataListState,
                }}
                setPool={setPoolDataList}
              />
            }
          />
          <Route
            path="calculation"
            element={
              <Calculation
                calculationProps={{
                  data: calculationDataList,
                  state: calculationDataListState,
                }}
                forecastProps={{
                  data: forecastDataList,
                  state: forecastDataListState,
                }}
                setForecast={{
                  data: setForecastDataList,
                  state: setForecastDataListState,
                }}
              />
            }
          />
          <Route
            path="forecast"
            element={
              <Forecast
                forecastProps={{
                  data: forecastDataList,
                  state: forecastDataListState,
                }}
              />
            }
          />
          <Route
            path="argeement"
            element={
              <Agreement
                calculationProps={{
                  data: calculationDataList,
                  state: calculationDataListState,
                }}
                poolProps={{ data: poolDataList, state: poolDataListState }}
              />
            }
          />
          <Route path="archive" element={<Archive />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Assessment;
