import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { Suspense } from "react";
import { routesInLayOuts } from "./router";
import { Spin } from "antd";

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
    <AuthProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div style={{ display: "flex", height: "100%" }}>
              <Spin size="large" style={{ margin: "auto" }} />
            </div>
          }
        >
          <Routes>{routeNodes}</Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};
