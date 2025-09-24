import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Error404 from "./Error404";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
