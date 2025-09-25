import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // get localstorage, json.parse the string so the savedCart initializes as objects in state
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // useEffect, json.stringify to turn cart into a string
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Cart does not exist", error);
    }
  }, [cart]);

  //addToCart function
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };
  //removeFromCart function
  const removeFromCart = (id) => {
    setCart((prev) => {
      return prev.filter((i) => i.id !== id);
    });
  };

  //clearCart function
  const clearCart = () => {
    setCart([]);
  };

  const value = { cart, addToCart, removeFromCart, clearCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw Error("useCart must be used within an AuthProvider");
  return context;
};
