import TrashIcon from "../../../components/icons/TrashIcon";
import { useCustomBox } from "./CustomBoxContext";
import './CustomBoxList.css';

const CustomBoxList = () => {
  const {
    customBox,
    customBoxError,
    updateNigiriQuantity,
    deleteNigiriFromCustomBox,
    updateSauceQuantity,
    deleteSauceFromCustomBox,
    updateExtraQuantity,
    deleteExtraFromCustomBox,
  } = useCustomBox();
  const noNigiris = !customBox?.contents || customBox.contents.length === 0;
  const noSauces = !customBox?.sauces || customBox.sauces.length === 0;
  const noExtras = !customBox?.extras || customBox.extras.length === 0;
  const emptyCustomBox = noNigiris && noSauces && noExtras;

  if (!customBox || emptyCustomBox)
    return <p>You have not started creating the box!</p>;
  // if (customBoxError) return <p>Failed to load custom box</p>;
  console.log(customBox);
  return (
    <>
      <h3>Current Omakase Box</h3>

      {!noNigiris && (
        <div>
          <h4>Nigiris</h4>
          {customBox?.contents.map((nigiri) => {
            const nigiriId = nigiri.nigiri_id;
            const quantity = nigiri.quantity;

            return (
              <div key={nigiri.user_custom_box_content_id} className="custom-box-item">
                <img src={nigiri.image_url} alt={nigiri.name} className="custom-box-item-image" />
                <div className="custom-box-item-details">
                  <h4 className="custom-box-item-name">{nigiri.name}</h4>
                  <p className="custom-box-item-stock">In stock</p>
                  <p className="custom-box-item-price">${((nigiri.price || 0) * quantity).toFixed(2)}</p>
                  <div className="custom-box-item-actions">
                    <div className="custom-box-quantity-control">
                      <button type="button" onClick={() => quantity > 1 ? updateNigiriQuantity({ nigiriId, quantity: Math.max(1, quantity - 1) }) : deleteNigiriFromCustomBox({nigiriId: nigiriId,})} className="custom-box-quantity-btn">
                          {quantity > 1 ? (
                        "-"
                      ) : (
                        <TrashIcon size={20} color="black" />
                      )}
                      </button>
                      <span className="custom-box-quantity-display">{quantity}</span>
                      <button type="button" onClick={() => updateNigiriQuantity({nigiriId: nigiriId, quantity: quantity + 1 })} className="custom-box-quantity-btn">+</button>
                    </div>
                    <button type="button" onClick={() => deleteNigiriFromCustomBox({ nigiriId })} className="custom-box-delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!noSauces && (
        <div>
          <h4>Sauces</h4>
          {customBox.sauces.map((sauce) => {
            const sauceId = sauce.sauce_id;
            const quantity = sauce.quantity;

            return (
              <div key={sauce.user_custom_box_sauce_id} className="custom-box-item">
                <img src={sauce.image_url} alt={sauce.name} className="custom-box-item-image" />
                <div className="custom-box-item-details">
                  <h4 className="custom-box-item-name">{sauce.name}</h4>
                  <p className="custom-box-item-stock">In stock</p>
                  <p className="custom-box-item-price">${((sauce.price || 0) * quantity).toFixed(2)}</p>
                  <div className="custom-box-item-actions">
                    <div className="custom-box-quantity-control">
                      <button type="button" onClick={() => quantity > 1 ? updateSauceQuantity({ sauceId, quantity: quantity - 1 }) : deleteSauceFromCustomBox({ sauceId })} className="custom-box-quantity-btn">
                        {quantity > 1 ? "−" : <TrashIcon size={20} color="black" />}
                      </button>
                      <span className="custom-box-quantity-display">{quantity}</span>
                      <button type="button" onClick={() => updateSauceQuantity({ sauceId, quantity: quantity + 1 })} className="custom-box-quantity-btn">+</button>
                    </div>
                    <button type="button" onClick={() => deleteSauceFromCustomBox({ sauceId })} className="custom-box-delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!noExtras && (
        <div>
          <h4>Extras</h4>
          {customBox.extras.map((extra) => {
            const extraId = extra.extra_id;
            const quantity = extra.quantity;

            return (
              <div key={extra.user_custom_box_extra_id} className="custom-box-item">
            
                <img src={extra.image_url} alt={extra.name} className="custom-box-item-image" />
                <div className="custom-box-item-details">
                  <h4 className="custom-box-item-name">{extra.name}</h4>
                  <p className="custom-box-item-stock">In stock</p>
                  <p className="custom-box-item-price">${((extra.price || 0) * quantity).toFixed(2)}</p>
                  <div className="custom-box-item-actions">
                    <div className="custom-box-quantity-control">
                      <button type="button" onClick={() => quantity > 1 ? updateExtraQuantity({  extraId: extraId,
                              quantity: Math.max(1, quantity - 1), }) : deleteExtraFromCustomBox({  extraId: extraId  })} className="custom-box-quantity-btn">
                        {quantity > 1 ? "−" : <TrashIcon size={20} color="black" />}
                      </button>
                      <span className="custom-box-quantity-display">{quantity}</span>
                      <button type="button" onClick={() => updateExtraQuantity({   extraId: extraId,
                          quantity: quantity + 1,})} className="custom-box-quantity-btn">+</button>
                    </div>
                    <button type="button" onClick={() => deleteExtraFromCustomBox({ extraId })} className="custom-box-delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomBoxList;
