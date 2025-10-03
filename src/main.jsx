import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { ApiProvider } from "./api/apiContext.jsx";
import { CartProvider } from "./pages/cart/CartContext.jsx";
import { CustomBoxProvider } from "./pages/Menu/buildyourown/CustomBoxContext.jsx";
import { AccountProvider } from "./pages/account/AccountContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApiProvider>
      <CartProvider>
        <CustomBoxProvider>
          <AccountProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AccountProvider>
        </CustomBoxProvider>
      </CartProvider>
    </ApiProvider>
  </AuthProvider>
);
