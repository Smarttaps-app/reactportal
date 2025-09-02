import { Route } from "react-router-dom";

export const renderRoutes = (routes: any[], basePath = "") =>
  routes.map((route, index) => {
    const fullPath = basePath ? `${basePath}/${route.path}` : route.path;

    if (route.children && route.children.length > 0) {
      return (
        <Route key={index} path={route.path} element={<route.Component />}>
          {renderRoutes(route.children, fullPath)}
        </Route>
      );
    }

    return (
      <Route key={index} path={route.path} element={<route.Component />} />
    );
  });
