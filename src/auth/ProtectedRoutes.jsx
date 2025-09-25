import { useAuth } from "./AuthContext";
import { Outlet, Navigate } from "react-router";

const ProtectedRoutes = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
