import { useAuth } from "./AuthContext";
import { Outlet, useNavigate } from "react-router";

const ProtectedRoutes = () => {
  const { token } = useAuth();
  const { navigate } = useNavigate();

  if (!token) {
    navigate("/login");
  }
  // return the child routes if token exists
  return <Outlet />;
};

export default ProtectedRoutes;
