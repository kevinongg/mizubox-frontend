import { useEffect, useRef } from "react";
import TrashIcon from "../../components/icons/TrashIcon";

const CartList = ({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) => {
  console.log(cartItems);

  const mountCount = useRef(0);
  useEffect(() => {
    mountCount.current += 1;
    console.log("Cart mounted", mountCount.current, "times");
  }, []);

  return (
    <ul>
      {cartItems.map((cartItem) => {
        const cartItemId = cartItem.cart_item_id;
        const boxTotal = cartItem.box_total;
        const boxType = cartItem.boxType;
        const quantity = cartItem.quantity;
        const boxDetails = cartItem.box_details;
        const isPreMadeBox = cartItem.boxType === "pre-made";
        const isCustomBox = cartItem.boxType === "custom";
        console.log(boxDetails);

        return (
          <li key={cartItemId}>
            <div>Box: {boxType}</div>

            {isPreMadeBox ? (
              <div>
                <div>Name: {boxDetails.name}</div>
                <div>Price: ${boxDetails.price}</div>

                <ul>
                  {boxDetails.nigiris.map((nigiri) => {
                    return (
                      <li key={nigiri.nigiri_id}>
                        <div>
                          {nigiri.name} × {nigiri.quantity}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            {isCustomBox ? (
              <div>
                {boxDetails.nigiris.length > 0 ? (
                  <div>
                    <div>Nigiris</div>
                    <ul>
                      {boxDetails.nigiris.map((nigiri) => {
                        return (
                          <li key={nigiri.nigiri_id}>
                            <div>
                              {nigiri.name} × Quantity: {nigiri.quantity}
                            </div>
                            <div>${nigiri.price} per piece</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}

                {boxDetails.sauces.length > 0 ? (
                  <div>
                    <div>Sauces</div>
                    <ul>
                      {boxDetails.sauces.map((sauce) => {
                        return (
                          <li key={sauce.sauce_id}>
                            <div>
                              {sauce.name} × Quantity: {sauce.quantity}
                            </div>
                            <div>${sauce.price} per piece</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}

                {boxDetails.extras.length > 0 ? (
                  <div>
                    <div>Extras</div>
                    <ul>
                      {boxDetails.extras.map((extra) => {
                        return (
                          <li key={extra.extra_id}>
                            <div>
                              {extra.name} × Quantity: {extra.quantity}
                            </div>
                            <div>${extra.price} per piece</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div>
              {quantity > 1 ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    decreaseQuantity(cartItemId, quantity);
                  }}
                >
                  -
                </button>
              ) : (
                <button type="button" onClick={() => removeItem(cartItemId)}>
                  <TrashIcon size={20} color="black" />
                </button>
              )}

              <div>{quantity}</div>

              <button
                type="button"
                onClick={() => increaseQuantity(cartItemId, quantity)}
              >
                +
              </button>

              <button>Delete</button>

              <div>Box total: ${boxTotal}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CartList;

// fix PUTS
