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
  
  console.log("loading:", loading, "user:", user?.tag, "allowedRole:", allowedRole);

  if (loading) {
    return <Spin size="large">Loading...</Spin>;
  }

  if (!user) {
    console.log("NO USER - redirecting to", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRole && !allowedRole.map(r => r.toLowerCase()).includes(user.tag.toLowerCase())) {
    console.log("ROLE MISMATCH - user tag:", user.tag, "allowed:", allowedRole);
    return <Navigate to={from} replace />;
  }

  return children;
};

export default ProtectedRouted;
