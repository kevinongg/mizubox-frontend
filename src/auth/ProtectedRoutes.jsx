import { useAuth } from "./AuthContext";
import { Outlet, Navigate } from "react-router";

const ProtectedRoutes = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // return the child routes if token exists
  return <Outlet />;
};

export default ProtectedRoutes;
