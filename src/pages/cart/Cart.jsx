import { useCart } from "./CartContext";

const Cart = () => {
  const {
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
    loading,
    adding,
    error,
    addingError,
  } = useCart();

  console.log(cart);

  // ******* event handlers

  // increase quantity
  const handleIncreaseQuantity = () => {};

  // decrease quantity
  const handleDecreaseQuantity = () => {};

  // remove item
  const handleRemoveItem = () => {};

  // clear cart
  const handleClearCart = () => {};

  // checkout
  const handleCheckout = () => {};

  // ******** render premade box
  const preMadeBoxDetails = () => {};

  // ******** render custom box
  const customBoxDetails = () => {};

  // ******** combine both premade box + custom box and render cart items
  const cartItem = () => {};

  return (
    <div>
      <h1>Your Cart</h1>
      <div>Cart total: ${cart.cart_total}</div>
      <div>
        <button>Clear Cart</button>
        <button>Check Out</button>
      </div>
    </div>
  );
};

export default Cart;
// addtocart call with {boxType, boxId, quantity?}
// updatecartitem call with {cartItemId, quantity}
// removefromcart call with {cartItemId}
