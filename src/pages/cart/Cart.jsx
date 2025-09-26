import { useState } from "react";
import { useCart } from "./CartContext";
import CartList from "./CartList";

const Cart = () => {
  const {
    cart,
    loading,
    error,

    updateCartItem,
    removeFromCart,
    clearCart,

    checkout,
    refreshCart,
  } = useCart();
  console.log(cart);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // const cartItems = cart.items;
  // console.log(cartItems);

  // ****** Cart Handlers ******//

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

  // loading / error state returns
  if (loading) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p>Failed to load cart...</p>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <>
      <h1>Your Cart</h1>

      <CartList
        cartItems={cart.items}
        increaseQuantity={handleIncreaseQuantity}
        decreaseQuantity={handleDecreaseQuantity}
        removeItem={handleRemoveItem}
      />

      <div>
        <div>Cart total: ${cart?.cart_total}</div>
        <div>
          <button onClick={handleClearCart}>Clear Cart</button>
          <button onClick={handleCheckout}>Check Out</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
// addtocart call with {boxType, boxId, quantity?}
// updatecartitem call with {cartItemId, quantity}
// removefromcart call with {cartItemId}
