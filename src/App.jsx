import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import "./index.css";

// Auth
import { AuthProvider } from "./auth/AuthContext";
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
import Profile from "./pages/Profile";

// Protected pages
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Cart from "./pages/cart/Cart";
import BuildYourOwn from "./pages/Menu/BuildYourOwn";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/omakasebox" element={<OmakaseBox />} />
          <Route path="/searchbar" element={<Searchbar />} />
          <Route path="/sauce" element={<Sauce />} />
          <Route path="/extra" element={<Extra />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/buildyourown" element={<BuildYourOwn />} />
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
