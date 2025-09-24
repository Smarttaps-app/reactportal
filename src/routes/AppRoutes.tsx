import { Routes, Route, Navigate } from "react-router-dom";
import {
  accountantRoutes,
  auditRoutes,
  businessRoutes,
  busproviderRoutes,
  protectedRoutes,
  supportRoutes,
  trainproviderRoutes,
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
import { renderRoutes } from "./routeHelper";
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
            <ProtectedRouted allowedRole={["superadmin", "admin"]}>
              <AdministratorLayout />
            </ProtectedRouted>
          </UserProvider>
        }
      >
        {renderRoutes(protectedRoutes)}
        <Route path="product/:id" element={<ProductDetailScreen />} />
        <Route path="biller/:id" element={<BillerDetailScreen />} />
      </Route>
      <Route
        path="/busprovider"
        element={
          <UserProvider>
            <ProtectedRouted allowedRole={["busprovider"]}>
              <AdministratorLayout />
            </ProtectedRouted>
          </UserProvider>
        }
      >
        {renderRoutes(busproviderRoutes)}
      </Route>
      <Route
        path="/trainprovider"
        element={
          <UserProvider>
            <ProtectedRouted allowedRole={["trainprovider"]}>
              <AdministratorLayout />
            </ProtectedRouted>
          </UserProvider>
        }
      >
        {renderRoutes(trainproviderRoutes)}
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
        {renderRoutes(businessRoutes)}
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
        {renderRoutes(accountantRoutes)}
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
        {renderRoutes(auditRoutes)}
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
        {renderRoutes(supportRoutes)}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
