import { Routes, Route, Navigate } from "react-router-dom";
import {
  accountantRoutes,
  auditRoutes,
  businessRoutes,
  busproviderRoutes,
  protectedRoutes,
  supportRoutes,
} from "./routes";
import ProtectedRouted from "./ProtectedRoute";
import Login from "../pages/auth/login";
import AdministratorLayout from "../pages/Layout/AdministratorLayout";
import AuthenticationLayout from "../pages/Layout/AuthLayout";
import WebsiteLayout from "../pages/Layout/WebsiteLayout";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ProductDetailScreen from "../pages/admin/product/productdetails";
import BillerDetailScreen from "../pages/admin/product/billerScreen";
import { UserProvider } from "../context/UserContext";
export default function AppRouted() {
  return (
    <Routes>
      <Route path="" index element={<WebsiteLayout />} />
      <Route path="/auth" element={<AuthenticationLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route
        path="/admin"
        element={
          <UserProvider>
            <ProtectedRouted allowedRole={["superadmin"]}>
              <AdministratorLayout />
            </ProtectedRouted>
          </UserProvider>
        }
      >
        {protectedRoutes.map(({ path, Component, children }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRouted allowedRole={["superadmin"]}>
                <Component />
              </ProtectedRouted>
            }
          >
            {children &&
              children.map(({ path: childPath, Component: ChildComp }) => (
                <Route
                  key={childPath}
                  path={childPath}
                  element={<ChildComp />}
                />
              ))}
          </Route>
        ))}
        <Route path="product/:id" element={<ProductDetailScreen />} />
        <Route path="biller/:id" element={<BillerDetailScreen />} />
      </Route>
      <Route
        path="/provider"
        element={
          <UserProvider>
            <ProtectedRouted allowedRole={["busprovider"]}>
              <AdministratorLayout />
            </ProtectedRouted>
          </UserProvider>
        }
      >
        {busproviderRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRouted allowedRole={["busprovider"]}>
                <Component />
              </ProtectedRouted>
            }
          />
        ))}
      </Route>
      <Route
        path="/business"
        element={
          <UserProvider>
            <ProtectedRouted allowedRole={["business"]}>
              <AdministratorLayout />
            </ProtectedRouted>
          </UserProvider>
        }
      >
        {businessRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRouted allowedRole={["business"]}>
                <Component />
              </ProtectedRouted>
            }
          />
        ))}
      </Route>
      <Route
        path="/accountant"
        element={
          <UserProvider>
            <ProtectedRouted allowedRole={["accountant"]}>
              <AdministratorLayout />
            </ProtectedRouted>
          </UserProvider>
        }
      >
        {accountantRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRouted allowedRole={["accountant"]}>
                <Component />
              </ProtectedRouted>
            }
          />
        ))}
      </Route>
      <Route
        path="/audit"
        element={
          <UserProvider>
            <ProtectedRouted allowedRole={["audit"]}>
              <AdministratorLayout />
            </ProtectedRouted>
          </UserProvider>
        }
      >
        {auditRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRouted allowedRole={["audit"]}>
                <Component />
              </ProtectedRouted>
            }
          />
        ))}
      </Route>
      <Route
        path="/support"
        element={
          <UserProvider>
            <ProtectedRouted allowedRole={["support"]}>
              <AdministratorLayout />
            </ProtectedRouted>
          </UserProvider>
        }
      >
        {supportRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRouted allowedRole={["support"]}>
                <Component />
              </ProtectedRouted>
            }
          />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
