import { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router";
import CartList from "./CartList";

const Cart = () => {
  const { cart, clearCart, checkout } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  // checkout
  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const order = await checkout();
      navigate(`/order-confirmation/${order.public_order_id}`);
    } catch (error) {
      console.error(`Failed to check out: ${error.message} `);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const noBoxes = !cart?.items || cart.items.length === 0;
  const noSauces = !cart?.sauces || cart.sauces.length === 0;
  const noExtras = !cart?.extras || cart.extras.length === 0;
  if (!cart || (noBoxes && noSauces && noExtras)) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <>
      <div className="cart-container">
        <h1>Your Cart</h1>

        <CartList
          cartItems={cart?.items}
          cartItemSauces={cart?.sauces}
          cartItemExtras={cart?.extras}
        />
        <div className="cart-total">Cart total: ${cart?.cart_total}</div>
        <div className="cart-actions">
          <button
            type="button"
            className="clear-cart-btn"
            onClick={() => clearCart()}
          >
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

//****** Loading / Error state returns ******//
// if (loading) {
//   return (
//     <div>
//       <h1>Your Cart</h1>
//       <p>Loading cart...</p>
//     </div>
//   );
// }

// if (error) {
//   return (
//     <div>
//       <h1>Your Cart</h1>
//       <p>Failed to load cart...</p>
//     </div>
//   );
// }
