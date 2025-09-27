import { useEffect, useRef, useState } from "react";
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
  } = useCart();
  console.log(cart);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const mountCount = useRef(0);
  useEffect(() => {
    mountCount.current += 1;
    console.log("Cart mounted", mountCount.current, "times");
  }, []);

  // ****** Cart Handlers ******//

  // increase quantity
  const handleIncreaseQuantity = (cartItemId, currentQuantity) => {
    const nextQuantity = currentQuantity + 1;
    updateCartItem({ cartItemId, quantity: nextQuantity });
  };

  // decrease quantity
  const handleDecreaseQuantity = (cartItemId, currentQuantity) => {
    const nextQuantity = currentQuantity - 1;
    updateCartItem({
      cartItemId,
      quantity: Math.max(1, nextQuantity),
    });
  };

  // remove item
  const handleRemoveItem = (cartItemId) => {
    removeFromCart(cartItemId);
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

  //****** Loading / Error state returns ******//
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
          <button onClick={handleCheckout} disabled={isCheckingOut}>
            {isCheckingOut ? "Placing order" : "Check Out"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
