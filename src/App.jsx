import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoutes from "./auth/ProtectedRoutes";

// Public pages
import HomePage from "./pages/HomePage";
import Error404 from "./Error404";

// Protected pages
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
