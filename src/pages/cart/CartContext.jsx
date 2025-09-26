import { createContext, useContext } from "react";
import { useApi } from "../../api/apiContext";
import useQuery from "../../api/useQuery";
import useMutation from "../../api/useMutation";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { request, invalidateTags } = useApi();
  // 1. load cart with usequery
  const {
    data: cart,
    loading,
    error,
    query: refreshCart,
  } = useQuery("/cart", "cart");

  // provideTag("cart", refreshCart);

  // 2. add to cart -> usemutation invalidatetag
  const {
    mutate: addToCart,
    loading: adding,
    error: addingError,
  } = useMutation("POST", "/cart/items", ["cart"]);

  // 3 create function to update item updateCartItem
  const updateCartItem = async ({ cartItemId, quantity }) => {
    await request(`/cart/items/${cartItemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    invalidateTags(["cart"]);
  };
  // 4. create function to removeFromCart
  const removeFromCart = async (cartItemId) => {
    await request(`/cart/items/${cartItemId}`, {
      method: "DELETE",
    });
    invalidateTags(["cart"]);
  };

  //5. clear cart
  const clearCart = async () => {
    await request("/cart/items", {
      method: "DELETE",
    });
    invalidateTags(["cart"]);
  };

  //6. checkout
  const checkout = async () => {
    await request("/orders/checkout", {
      method: "POST",
    });
    invalidateTags(["cart"]);
  };

  const value = {
    // state
    cart,
    loading,
    adding,
    error,
    addingError,

    // mutations
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,

    refreshCart,

    // checkout
    checkout,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw Error("useCart must be used within an AuthProvider");
  return context;
};
