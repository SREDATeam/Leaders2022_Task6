import { BrowserRouter, Route, Routes } from "react-router-dom";

import { routesInLayOuts } from "./router";

const routeNodes: React.ReactElement[] = routesInLayOuts.map((layout) => {
  return (
    <Route key={layout.key} element={layout.layoutElement}>
      {layout.routes.map((route) => {
        return <Route {...route} />;
      })}
    </Route>
  );
});

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>{routeNodes}</Routes>
    </BrowserRouter>
  );
};
