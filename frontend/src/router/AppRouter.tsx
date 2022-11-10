import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { Suspense } from "react";
import { routesInLayOuts } from "./router";
import { Loader } from "../pages";

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
        <Suspense fallback={<Loader />}>
          <Routes>{routeNodes}</Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};
