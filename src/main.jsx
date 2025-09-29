import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { ApiProvider } from "./api/apiContext.jsx";
import { CartProvider } from "./pages/cart/CartContext.jsx";
import { BYOProvider } from "./pages/Menu/buildyourown/BYOContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApiProvider>
      <BYOProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </BYOProvider>
    </ApiProvider>
  </AuthProvider>
);
