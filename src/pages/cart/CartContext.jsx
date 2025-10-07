import { createContext, useContext, useEffect } from "react";
import { useApi } from "../../api/apiContext";
import useQuery from "../../api/useQuery";
// import useMutation from "../../api/useMutation";
import { useAuth } from "../../auth/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { request, invalidateTags } = useApi();
  const { token } = useAuth();

  // load cart with usequery
  const {
    data: cart,
    loading,
    error,
    query: refreshCart,
  } = useQuery("/cart", "cart");
  console.log(cart);

  // UseEffect to load cart w/o relying on invalidateTags
  useEffect(() => {
    if (!token) return;
    refreshCart();
  }, [token]);

  // Cart item count
  const cartBoxCount = cart?.items.reduce((sum, box) => {
    return sum + box.quantity;
  }, 0);
  const cartSauceCount = cart?.sauces.reduce((sum, sauce) => {
    return sum + sauce.quantity;
  }, 0);
  const cartExtraCount = cart?.extras.reduce((sum, extra) => {
    return sum + extra.quantity;
  }, 0);
  const cartTotalCount = cartBoxCount + cartSauceCount + cartExtraCount;

  // ------------- MUTATIONS -------------

  // ---- Box Mutations ----
  const addCartItemToCart = async ({ boxType, boxId }) => {
    await request("/cart/items", {
      method: "POST",
      body: JSON.stringify({ boxType, boxId }),
    });
    invalidateTags(["cart"]);
    await refreshCart();
  };

  const updateCartItem = async ({ cartItemId, quantity }) => {
    await request(`/cart/items/${cartItemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    invalidateTags(["cart"]);
    await refreshCart();
  };

  const removeCartItemFromCart = async (cartItemId) => {
    await request(`/cart/items/${cartItemId}`, {
      method: "DELETE",
    });
    invalidateTags(["cart"]);
    await refreshCart();
  };

  // ---- Sauce Cart Mutations ----
  const addCartItemSauceToCart = async ({ sauceId }) => {
    await request("/cart/sauces", {
      method: "POST",
      body: JSON.stringify({ sauceId }),
    });
    invalidateTags(["cart"]);
    await refreshCart();
  };

  const updateCartItemSauce = async ({ cartItemSauceId, quantity }) => {
    await request(`/cart/sauces/${cartItemSauceId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    invalidateTags(["cart"]);
    await refreshCart();
  };

  const removeCartItemSauceFromCart = async (cartItemSauceId) => {
    await request(`/cart/sauces/${cartItemSauceId}`, {
      method: "DELETE",
    });
    invalidateTags(["cart"]);
    await refreshCart();
  };

  // ---- Extra Cart Mutations ----
  const addCartItemExtraToCart = async ({ extraId }) => {
    await request("/cart/extras", {
      method: "POST",
      body: JSON.stringify({ extraId }),
    });
    invalidateTags(["cart"]);
    await refreshCart();
  };

  const updateCartItemExtra = async ({ cartItemExtraId, quantity }) => {
    await request(`/cart/extras/${cartItemExtraId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    invalidateTags(["cart"]);
    await refreshCart();
  };

  const removeCartItemExtraFromCart = async (cartItemExtraId) => {
    await request(`/cart/extras/${cartItemExtraId}`, {
      method: "DELETE",
    });
    invalidateTags(["cart"]);
    await refreshCart();
  };

  // ---- Clear & Checkout Cart Mutations ----

  const clearCart = async () => {
    await request("/cart", {
      method: "DELETE",
    });
    invalidateTags(["cart"]);
    await refreshCart();
  };

  const checkout = async () => {
    const order = await request("/orders/checkout", {
      method: "POST",
    });
    return order;
    // invalidateTags(["cart"]);
  };

  const value = {
    // cart useQuery
    cart,
    loading,
    error,
    refreshCart,
    // boxes mutation and loading/error check state
    addCartItemToCart,
    updateCartItem,
    removeCartItemFromCart,
    // sauces mutation and loading/error check state
    addCartItemSauceToCart,
    updateCartItemSauce,
    removeCartItemSauceFromCart,
    // extras mutation and loading/error check state
    addCartItemExtraToCart,
    updateCartItemExtra,
    removeCartItemExtraFromCart,
    // clear & checkout cart
    clearCart,
    checkout,
    //cart count
    cartTotalCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw Error("useCart must be used within an CartProvider");
  return context;
};
