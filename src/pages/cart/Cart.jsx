import { useState } from "react";
import { useCart } from "./CartContext";

const Cart = () => {
  const {
    cart,
    updateCartItem,
    removeFromCart,
    clearCart,
    checkout,
    refreshCart,
    loading,
    error,
  } = useCart();
  console.log(cart);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // ******* event handlers

  // increase quantity
  const handleIncreaseQuantity = (cartItem) => {
    updateCartItem({
      cartItem: cartItem.cart_item_id,
      quantity: cartItem.quantity + 1,
    });
  };

  // decrease quantity
  const handleDecreaseQuantity = (cartItem) => {
    updateCartItem({
      cartItem: cartItem.cart_item_id,
      quantity: Math.max(1, cartItem.quantity - 1),
    });
  };

  // remove item
  const handleRemoveItem = (cartItem) => {
    removeFromCart(cartItem.cart_item_id);
  };

  // clear cart
  const handleClearCart = () => {
    clearCart();
  };

  // checkout
  const handleCheckout = () => {
    try {
      setIsCheckingOut(true);
      checkout();
    } catch (error) {
      console.error("Failed to check out", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  // ******** render premade box
  const preMadeBoxDetails = () => {};

  // ******** render custom box
  const customBoxDetails = () => {};

  // ******** combine both premade box + custom box and render cart items
  const cartItem = () => {};

  return (
    <div>
      <h1>Your Cart</h1>
      <div>Cart total: ${cart?.cart_total}</div>
      <div>
        <button onClick={handleClearCart}>Clear Cart</button>
        <button onClick={handleCheckout}>Check Out</button>
      </div>
    </div>
  );
};

export default Cart;
// addtocart call with {boxType, boxId, quantity?}
// updatecartitem call with {cartItemId, quantity}
// removefromcart call with {cartItemId}
