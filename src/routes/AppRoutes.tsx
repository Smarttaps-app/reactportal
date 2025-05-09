import { Routes, Route, Navigate } from "react-router-dom";
import { protectedRoutes } from "./routes";
import ProtectedRouted from "./ProtectedRoute";
import Login from "../pages/auth/login";
import AdministratorLayout from "../pages/Layout/AdministratorLayout";
import AuthenticationLayout from "../pages/Layout/AuthLayout";
import WebsiteLayout from "../pages/Layout/WebsiteLayout";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
export default function AppRouted() {
  return (
    <Routes>
      <Route path="" index element={<WebsiteLayout />} />
      <Route path="/auth" element={<AuthenticationLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="/admin" element={<AdministratorLayout />}>
        {protectedRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRouted allowedRole="superadmin">
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
