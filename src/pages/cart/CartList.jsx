const CartList = ({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) => {
  console.log(cartItems);
  return (
    <ul>
      {cartItems?.map((cartItem) => {
        const cartItemId = cartItem.cart_item_id;
        const boxTotal = cartItem.box_total;
        const boxType = cartItem.boxType;
        const quantity = cartItem.quantity;
        const boxDetails = cartItem.box_details;
        const isPreMadeBox = cartItem.boxType === "pre-made";
        const isCustomBox = cartItem.boxType === "custom";
        console.log(boxDetails);

        return (
          <>
            <li key={cartItemId}>
              <div>Box: {boxType}</div>

              {isPreMadeBox ? (
                <div>
                  <div>Name: {boxDetails.name}</div>

                  <div>
                    {boxDetails?.nigiris?.map((nigiri) => {
                      return (
                        <li key={nigiri.nigiri_id}>
                          <div>{nigiri.name}</div>
                        </li>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default CartList;
