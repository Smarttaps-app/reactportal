import { Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { useUser } from "../context/useUser";
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: string;
  redirectTo?: string;
}

const ProtectedRouted = ({
  children,
  allowedRole = "",
  redirectTo = "/",
}: ProtectedRouteProps) => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { user, loading } = useUser();
  console.log(user?.tag);
  if (loading) {
    return <Spin size="large">Loading...</Spin>;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }
  if (allowedRole && user.tag !== allowedRole) {
    return <Navigate to={from} replace />;
  }
  return children;
};

export default ProtectedRouted;
