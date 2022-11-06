import { useState } from "react";
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
  const [floorsDataList, setFloorsDataList] = useState();
  const [floorsDataListState, setFloorsDataListState] = useState(
    Boolean(floorsDataList),
  );
  const [calculationDataList, setCalculationDataList] = useState();
  const [calculationDataListState, setCalculationDataListState] = useState(
    Boolean(calculationDataList),
  );
  const [forecastDataList, setForecastDataList] = useState();
  const [forecastDataListState, setForecastDataListState] = useState(
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
                setCalculation={{
                  data: setCalculationDataList,
                  state: setCalculationDataListState,
                }}
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
