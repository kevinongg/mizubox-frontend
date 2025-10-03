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

  // ------------- Box items -------------
  // 2. add to cart -> usemutation invalidatetag
  const {
    mutate: addCartItemToCart,
    loading: addingCartItem,
    error: addingCartItemError,
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
  const removeCartItemFromCart = async (cartItemId) => {
    await request(`/cart/items/${cartItemId}`, {
      method: "DELETE",
    });
    invalidateTags(["cart"]);
  };

  //5. clear cart
  const clearCart = async () => {
    await request("/cart", {
      method: "DELETE",
    });
    invalidateTags(["cart"]);
  };

  //6. checkout
  const checkout = async () => {
    const order = await request("/orders/checkout", {
      method: "POST",
    });
    return order;
    // invalidateTags(["cart"]);
  };

  // ------------- Sauces -------------

  const {
    mutate: addCartItemSauceToCart,
    loading: addingCartItemSauce,
    error: addingCartItemSauceError,
  } = useMutation("POST", "/cart/sauces", ["cart"]);

  const updateCartItemSauce = async ({ cartItemSauceId, quantity }) => {
    await request(`/cart/sauces/${cartItemSauceId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    invalidateTags(["cart"]);
  };

  const removeCartItemSauceFromCart = async (cartItemSauceId) => {
    await request(`/cart/sauces/${cartItemSauceId}`, {
      method: "DELETE",
    });
    invalidateTags(["cart"]);
  };

  // ------------- Extras -------------

  const {
    mutate: addCartItemExtraToCart,
    loading: addingCartItemExtra,
    error: addingCartItemExtraError,
  } = useMutation("POST", "/cart/extras", ["cart"]);

  const updateCartItemExtra = async ({ cartItemExtraId, quantity }) => {
    await request(`/cart/extras/${cartItemExtraId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    invalidateTags(["cart"]);
  };

  const removeCartItemExtraFromCart = async (cartItemExtraId) => {
    await request(`/cart/extras/${cartItemExtraId}`, {
      method: "DELETE",
    });
    invalidateTags(["cart"]);
  };

  const value = {
    // cart state and mutation to clear cart
    cart,
    loading,
    error,
    clearCart,
    refreshCart,
    // boxes mutation and loading/error check state
    addCartItemToCart,
    updateCartItem,
    removeCartItemFromCart,
    addingCartItem,
    addingCartItemError,
    // sauces mutation and loading/error check state
    addCartItemSauceToCart,
    updateCartItemSauce,
    removeCartItemSauceFromCart,
    addingCartItemSauce,
    addingCartItemSauceError,
    // extras mutation and loading/error check state
    addCartItemExtraToCart,
    updateCartItemExtra,
    removeCartItemExtraFromCart,
    addingCartItemExtra,
    addingCartItemExtraError,

    // checkout
    checkout,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw Error("useCart must be used within an CartProvider");
  return context;
};
