import { useState } from "react";
import { useCart } from "./CartContext";
import CartList from "./CartList";

const Cart = () => {
  const {
    // cart
    cart,
    loading,
    error,
    clearCart,
    // cart items
    updateCartItem,
    removeCartItemFromCart,
    // sauces
    updateCartItemSauce,
    removeCartItemSauceFromCart,
    // extras
    updateCartItemExtra,
    removeCartItemExtraFromCart,

    checkout,
  } = useCart();
  console.log(cart);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // ****** Cart Item Handlers ******//

  // increase quantity
  const handleIncreaseCartItemQuantity = (cartItemId, currentQuantity) => {
    updateCartItem({ cartItemId, quantity: currentQuantity + 1 });
  };

  // decrease quantity
  const handleDecreaseCartItemQuantity = (cartItemId, currentQuantity) => {
    updateCartItem({
      cartItemId,
      quantity: Math.max(1, currentQuantity - 1),
    });
  };

  // remove item
  const handleRemoveCartItem = (cartItemId) => {
    removeCartItemFromCart(cartItemId);
  };

  // ****** Sauce Item Handlers ******//

  const handleIncreaseCartItemSauceQuantity = (
    cartItemSauceId,
    currentQuantity
  ) => {
    updateCartItemSauce({ cartItemSauceId, quantity: currentQuantity + 1 });
  };

  const handleDecreaseCartItemSauceQuantity = (
    cartItemSauceId,
    currentQuantity
  ) => {
    updateCartItemSauce({
      cartItemSauceId,
      quantity: Math.max(1, currentQuantity - 1),
    });
  };

  const handleRemoveCartItemSauce = (cartItemSauceId) => {
    removeCartItemSauceFromCart(cartItemSauceId);
  };

  // ****** Extra Item Handlers ******//

  const handleIncreaseCartItemExtraQuantity = (
    cartItemExtraId,
    currentQuantity
  ) => {
    updateCartItemExtra({ cartItemExtraId, quantity: currentQuantity + 1 });
  };

  const handleDecreaseCartItemExtraQuantity = (
    cartItemExtraId,
    currentQuantity
  ) => {
    updateCartItemExtra({
      cartItemExtraId,
      quantity: Math.max(1, currentQuantity - 1),
    });
  };

  const handleRemoveCartItemExtra = (cartItemExtraId) => {
    removeCartItemExtraFromCart(cartItemExtraId);
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
  // if (loading) {
  //   return (
  //     <div>
  //       <h1>Your Cart</h1>
  //       <p>Loading cart...</p>
  //     </div>
  //   );
  // }

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
        // cart items
        increaseCartItemQuantity={handleIncreaseCartItemQuantity}
        decreaseCartItemQuantity={handleDecreaseCartItemQuantity}
        removeCartItem={handleRemoveCartItem}
        // sauce items
        increaseCartItemSauceQuantity={handleIncreaseCartItemSauceQuantity}
        decreaseCartItemSauceQuantity={handleDecreaseCartItemSauceQuantity}
        removeCartItemSauce={handleRemoveCartItemSauce}
        // extra items
        increaseCartItemExtraQuantity={handleIncreaseCartItemExtraQuantity}
        decreaseCartItemExtraQuantity={handleDecreaseCartItemExtraQuantity}
        removeCartItemExtra={handleRemoveCartItemExtra}
      />

      <div>
        <div>Cart total: ${cart?.cart_total}</div>
        <div>
          <button type="button" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? "Placing order" : "Check Out"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
