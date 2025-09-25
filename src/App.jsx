import { Route, Router, Routes } from "react-router";
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
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Cart from "./pages/cart/Cart";
import BuildYourOwn from "./pages/Menu/BuildYourOwn";
import { AuthProvider } from "./auth/AuthContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
       <Headers />

        <main className="main-content">
      <Routes>
      <Route element={<Layout />}/>
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

          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
        </main>

        <footer  className = "footer">
           <div className="footer-content">
             <div className="footer-section">
                  <h3> MizuBox</h3>
                  <p>Premium Omakase Sushi Delivery</p>
                </div>
                <div className="footer-section">
                  <h4>Quick Links</h4>
                  <a href="/">Home</a>
                  <a href="/custom-box">BuildYourOwn</a>
                
                </div>
                <div className="footer-section">
                  <h4>Contact</h4>
                  <p>📧 hello@mizubox.com</p>
                  <p>📞 (555) 123-4567</p>
                  <p>📍 San Jose, CA</p>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2024 MizuBox. All rights reserved.</p>
              </div>
            </footer>
      </div>
      </AuthProvider>
    </Router>
  );
}
