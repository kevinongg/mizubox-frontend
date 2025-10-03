import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import "./index.css";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoutes from "./auth/ProtectedRoutes";

// Public pages
import Home from "./pages/Home";
import OmakaseBox from "./pages/Menu/OmakaseBox";
import Sauce from "./pages/Menu/Sauce";
import Extra from "./pages/Menu/Extra";
import Searchbar from "./pages/Searchbar";
import Error404 from "./Error404";

// Protected pages

import Account from "./pages/Account";
import Cart from "./pages/cart/Cart";
import BuildYourOwn from "./pages/Menu/buildyourown/BuildYourOwn";
import OrderDetails from "./pages/orders/OrderDetails";
import Orders from "./pages/Orders/Orders";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/omakasebox" element={<OmakaseBox />} />
        <Route path="/searchbar" element={<Searchbar />} />
        <Route path="/sauce" element={<Sauce />} />
        <Route path="/extra" element={<Extra />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/buildyourown" element={<BuildYourOwn />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/order-confirmation/:orderId"
            element={<OrderDetails />}
          />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
