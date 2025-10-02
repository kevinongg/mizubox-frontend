import TrashIcon from "../../components/icons/TrashIcon";

const CartList = ({
  cartItems,
  cartItemSauces,
  cartItemExtras,
  // cart item handlers
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeCartItem,
  // sauce item handlers
  increaseCartItemSauceQuantity,
  decreaseCartItemSauceQuantity,
  removeCartItemSauce,
  // extra item handlers
  increaseCartItemExtraQuantity,
  decreaseCartItemExtraQuantity,
  removeCartItemExtra,
}) => {
  console.log(cartItems);

  return (
    <div>
      {cartItems.length !== 0 && (
        <div>
          <h3>Omakase Boxes</h3>
          <ul>
            {cartItems.map((cartItem) => {
              const cartItemId = cartItem.cart_item_id;
              const boxTotal = cartItem.box_total;
              const boxType = cartItem.boxType;
              const quantity = cartItem.quantity;
              const boxDetails = cartItem.box_details;
              const isPreMadeBox = cartItem.boxType === "pre-made";
              const isCustomBox = cartItem.boxType === "custom";

              return (
                <li key={cartItemId}>
                  <div>Box: {boxType}</div>

                  {isPreMadeBox && (
                    <div>
                      <div>Name: {boxDetails.name}</div>
                      <div>Price: ${boxDetails.price}</div>

                      <ul>
                        {boxDetails.nigiris.map((nigiri) => {
                          return (
                            <li key={nigiri.nigiri_id}>
                              <div>
                                {nigiri.name} (×{nigiri.quantity})
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {isCustomBox && (
                    <div>
                      {boxDetails.nigiris.length > 0 && (
                        <div>
                          <div>Nigiris</div>
                          <ul>
                            {boxDetails.nigiris.map((nigiri) => {
                              return (
                                <li key={nigiri.nigiri_id}>
                                  <div>
                                    {nigiri.name} (×{nigiri.quantity})
                                  </div>
                                  <div>${nigiri.price} per piece</div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      {boxDetails.sauces.length > 0 && (
                        <div>
                          <div>Sauces</div>
                          <ul>
                            {boxDetails.sauces.map((sauce) => {
                              return (
                                <li key={sauce.sauce_id}>
                                  <div>
                                    {sauce.name} (×{sauce.quantity})
                                  </div>
                                  <div>${sauce.price} per piece</div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      {boxDetails.extras.length > 0 && (
                        <div>
                          <div>Extras</div>
                          <ul>
                            {boxDetails.extras.map((extra) => {
                              return (
                                <li key={extra.extra_id}>
                                  <div>
                                    {extra.name} (×{extra.quantity})
                                  </div>
                                  <div>${extra.price} per piece</div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    {quantity > 1 ? (
                      <button
                        type="button"
                        onClick={() =>
                          decreaseCartItemQuantity(cartItemId, quantity)
                        }
                      >
                        -
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeCartItem(cartItemId)}
                      >
                        <TrashIcon size={20} color="black" />
                      </button>
                    )}

                    <div>{quantity}</div>

                    <button
                      type="button"
                      onClick={() =>
                        increaseCartItemQuantity(cartItemId, quantity)
                      }
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() => removeCartItem(cartItemId)}
                    >
                      Delete
                    </button>

                    <div>Box total: ${boxTotal}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {cartItemSauces.length !== 0 && (
        <div>
          <h3>Sauces</h3>
          <ul>
            {cartItemSauces.map((itemSauce) => {
              const cartItemSauceId = itemSauce.cart_item_sauce_id;
              const quantity = itemSauce.quantity;
              const sauce = itemSauce.sauce;
              const sauceTotal = itemSauce.sauce_total;

              return (
                <li key={cartItemSauceId}>
                  <div>{sauce.name}</div>
                  <div>${sauce.price} per piece</div>

                  <div>
                    {quantity > 1 ? (
                      <button
                        type="button"
                        onClick={() =>
                          decreaseCartItemSauceQuantity(
                            cartItemSauceId,
                            quantity
                          )
                        }
                      >
                        -
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeCartItemSauce(cartItemSauceId)}
                      >
                        <TrashIcon size={20} color="black" />
                      </button>
                    )}

                    <div>{quantity}</div>

                    <button
                      type="button"
                      onClick={() =>
                        increaseCartItemSauceQuantity(cartItemSauceId, quantity)
                      }
                    >
                      +
                    </button>

                    <div>Sauce total: ${sauceTotal}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {cartItemExtras.length !== 0 && (
        <div>
          <h3>Extras</h3>
          <ul>
            {cartItemExtras.map((itemExtra) => {
              const cartItemExtraId = itemExtra.cart_item_extra_id;
              const quantity = itemExtra.quantity;
              const extra = itemExtra.extra;
              const extraTotal = itemExtra.extra_total;

              return (
                <li key={cartItemExtraId}>
                  <div>{extra.name}</div>
                  <div>${extra.price} per piece</div>

                  <div>
                    {quantity > 1 ? (
                      <button
                        type="button"
                        onClick={() =>
                          decreaseCartItemExtraQuantity(
                            cartItemExtraId,
                            quantity
                          )
                        }
                      >
                        -
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeCartItemExtra(cartItemExtraId)}
                      >
                        <TrashIcon size={20} color="black" />
                      </button>
                    )}

                    <div>{quantity}</div>

                    <button
                      type="button"
                      onClick={() =>
                        increaseCartItemExtraQuantity(cartItemExtraId, quantity)
                      }
                    >
                      +
                    </button>

                    <div>Extra total: ${extraTotal}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CartList;
