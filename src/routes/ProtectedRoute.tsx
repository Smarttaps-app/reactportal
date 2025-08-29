import { Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { useUser } from "../context/useUser";
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: string[];
  redirectTo?: string;
}

const ProtectedRouted = ({
  children,
  allowedRole = ["admin"],
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
  if (allowedRole && !allowedRole.includes(user.tag)) {
    return <Navigate to={from} replace />;
  }
  return children;
};

export default ProtectedRouted;
