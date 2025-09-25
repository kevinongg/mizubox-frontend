import { createContext, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const value = {};
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw Error("useCart must be used within an AuthProvider");
  return context;
};
