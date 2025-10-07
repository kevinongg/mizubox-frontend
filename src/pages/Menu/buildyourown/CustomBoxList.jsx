import TrashIcon from "../../../components/icons/TrashIcon";
import { useCustomBox } from "./CustomBoxContext";
import "./CustomBoxList.css";

const CustomBoxList = () => {
  const {
    customBox,
    clearCustomBox,
    updateNigiriQuantity,
    deleteNigiriFromCustomBox,
    updateSauceQuantity,
    deleteSauceFromCustomBox,
    updateExtraQuantity,
    deleteExtraFromCustomBox,
    addCustomBoxToCart,
    currentTotalNigiri,
  } = useCustomBox();

  const noNigiris = !customBox?.contents || customBox.contents.length === 0;
  const noSauces = !customBox?.sauces || customBox.sauces.length === 0;
  const noExtras = !customBox?.extras || customBox.extras.length === 0;
  const emptyCustomBox = noNigiris && noSauces && noExtras;

  if (!customBox || emptyCustomBox)
    return (
      <p className="empty-message">You have not started creating the box!</p>
    );

  return (
    <div className="custom-box-list">
      <h3 className="box-title">Current Omakase Box</h3>

      {!emptyCustomBox && (
        <div className="box-content">
          <button
            type="button"
            className="clear-btn"
            onClick={() => clearCustomBox()}
          >
            Clear Box
          </button>

          <button
            type="button"
            disabled={currentTotalNigiri < 14 || !customBox}
            className="add-btn"
            onClick={() =>
              addCustomBoxToCart({ customBoxId: customBox.user_custom_box_id })
            }
          >
            Add Box To Cart
          </button>

          {!noNigiris && (
            <div className="section">
              <h4 className="section-title">Nigiris</h4>
              <ul className="item-list">
                {customBox?.contents.map((nigiri) => {
                  const nigiriId = nigiri.nigiri_id;
                  const quantity = nigiri.quantity;

                  return (
                    <li
                      key={nigiri.user_custom_box_content_id}
                      className="item"
                    >
                      <div className="item-content">
                        <span className="item-name">
                          {nigiri.name} (×{quantity})
                        </span>
                        <div className="quantity-controls">
                          <button
                            type="button"
                            className="qty-btn decrease"
                            onClick={() =>
                              quantity > 1
                                ? updateNigiriQuantity({
                                    nigiriId: nigiriId,
                                    quantity: Math.max(1, quantity - 1),
                                  })
                                : deleteNigiriFromCustomBox({
                                    nigiriId: nigiriId,
                                  })
                            }
                          >
                            {quantity > 1 ? (
                              "-"
                            ) : (
                              <TrashIcon size={20} color="black" />
                            )}
                          </button>
                          <span className="quantity">{quantity}</span>
                          <button
                            type="button"
                            className="qty-btn increase"
                            onClick={() =>
                              updateNigiriQuantity({
                                nigiriId: nigiriId,
                                quantity: quantity + 1,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {!noSauces && (
            <div className="section">
              <h4 className="section-title">Sauces</h4>
              <ul className="item-list">
                {customBox.sauces.map((sauce) => {
                  const sauceId = sauce.sauce_id;
                  const quantity = sauce.quantity;

                  return (
                    <li key={sauce.user_custom_box_sauce_id} className="item">
                      <div className="item-content">
                        <span className="item-name">
                          {sauce.name} (×{quantity})
                        </span>
                        <div className="quantity-controls">
                          <button
                            type="button"
                            className="qty-btn decrease"
                            onClick={() =>
                              quantity > 1
                                ? updateSauceQuantity({
                                    sauceId: sauceId,
                                    quantity: Math.max(1, quantity - 1),
                                  })
                                : deleteSauceFromCustomBox({ sauceId: sauceId })
                            }
                          >
                            {quantity > 1 ? (
                              "-"
                            ) : (
                              <TrashIcon size={20} color="black" />
                            )}
                          </button>
                          <span className="quantity">{quantity}</span>
                          <button
                            type="button"
                            className="qty-btn increase"
                            onClick={() =>
                              updateSauceQuantity({
                                sauceId: sauceId,
                                quantity: quantity + 1,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {!noExtras && (
            <div className="section">
              <h4 className="section-title">Extras</h4>
              <ul className="item-list">
                {customBox.extras.map((extra) => {
                  const extraId = extra.extra_id;
                  const quantity = extra.quantity;

                  return (
                    <li key={extra.user_custom_box_extra_id} className="item">
                      <div className="item-content">
                        <span className="item-name">
                          {extra.name} (×{quantity})
                        </span>
                        <div className="quantity-controls">
                          <button
                            type="button"
                            className="qty-btn decrease"
                            onClick={() =>
                              quantity > 1
                                ? updateExtraQuantity({
                                    extraId: extraId,
                                    quantity: Math.max(1, quantity - 1),
                                  })
                                : deleteExtraFromCustomBox({ extraId: extraId })
                            }
                          >
                            {quantity > 1 ? (
                              "-"
                            ) : (
                              <TrashIcon size={20} color="black" />
                            )}
                          </button>
                          <span className="quantity">{quantity}</span>
                          <button
                            type="button"
                            className="qty-btn increase"
                            onClick={() =>
                              updateExtraQuantity({
                                extraId: extraId,
                                quantity: quantity + 1,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomBoxList;
