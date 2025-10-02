import { useCustomBox } from "./CustomBoxContext";
import useCartMessage from "../../../utils/customMessage";
import "./CustomBoxList.css";

const CustomBoxList = () => {
  const { customBox, customBoxError, currentTotalNigiri } = useCustomBox();

  const {
    message,
    isUpdating,
    updatingItemId,
    handleUpdateNigiri,
    handleDeleteNigiri,
    handleUpdateSauce,
    handleDeleteSauce,
    handleUpdateExtra,
    handleDeleteExtra,
  } = useCartMessage();

  const noNigiris = !customBox?.contents || customBox.contents.length === 0;
  const noSauces = !customBox?.sauces || customBox.sauces.length === 0;
  const noExtras = !customBox?.extras || customBox.extras.length === 0;

  // Calculate total from items
  const calculateTotal = () => {
    let total = 0;

    // Add nigiri prices
    if (customBox?.contents) {
      total += customBox.contents.reduce((sum, item) => {
        return sum + (item.price || 0) * item.quantity;
      }, 0);
    }

    // Add sauce prices
    if (customBox?.sauces) {
      total += customBox.sauces.reduce((sum, item) => {
        return sum + (item.price || 0) * item.quantity;
      }, 0);
    }

    // Add extra prices
    if (customBox?.extras) {
      total += customBox.extras.reduce((sum, item) => {
        return sum + (item.price || 0) * item.quantity;
      }, 0);
    }

    return total;
  };

  const boxTotal = calculateTotal();

  // Show loading or empty state
  if (customBoxError) {
    return (
      <div className="custom-box-empty">
        <p>Failed to load custom box. Please try again.</p>
      </div>
    );
  }

  if (!customBox || (noNigiris && noSauces && noExtras)) {
    return (
      <div className="custom-box-empty">
        <p>Your custom box is empty. Start adding items below!</p>
      </div>
    );
  }

  const renderNigiriItem = (nigiri) => {
    const nigiriId = nigiri.nigiri_id;
    const quantity = nigiri.quantity;
    const isThisItemUpdating = isUpdating && updatingItemId === nigiriId;

    return (
      <div key={nigiri.user_custom_box_content_id} className="custom-box-item">
        <input
          type="checkbox"
          defaultChecked
          className="custom-box-item-checkbox"
        />

        <img
          src={nigiri.image_url}
          alt={nigiri.name}
          className="custom-box-item-image"
        />

        <div className="custom-box-item-details">
          <h4 className="custom-box-item-name">{nigiri.name}</h4>
          <p className="custom-box-item-stock">In stock</p>
          <p className="custom-box-item-price-container">
            <span className="custom-box-item-price">
              ${((nigiri.price || 0) * quantity).toFixed(2)}
            </span>
          </p>

          <div className="custom-box-item-actions">
            <div className="custom-box-quantity-control">
              <button
                type="button"
                onClick={() =>
                  quantity > 1
                    ? handleUpdateNigiri(nigiriId, Math.max(1, quantity - 1))
                    : handleDeleteNigiri(nigiriId)
                }
                className="custom-box-quantity-btn"
                aria-label="Decrease quantity"
                disabled={isThisItemUpdating}
              >
                −
              </button>
              <span className="custom-box-quantity-display">{quantity}</span>
              <button
                type="button"
                onClick={() => handleUpdateNigiri(nigiriId, quantity + 1)}
                className="custom-box-quantity-btn"
                aria-label="Increase quantity"
                disabled={isThisItemUpdating}
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteNigiri(nigiriId)}
              className="custom-box-delete-btn"
              disabled={isThisItemUpdating}
            >
              {isThisItemUpdating ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSauceItem = (sauce) => {
    const sauceId = sauce.sauce_id;
    const quantity = sauce.quantity;
    const isThisItemUpdating = isUpdating && updatingItemId === sauceId;

    return (
      <div key={sauce.user_custom_box_sauce_id} className="custom-box-item">
        <input
          type="checkbox"
          defaultChecked
          className="custom-box-item-checkbox"
        />

        <img
          src={sauce.image_url}
          alt={sauce.name}
          className="custom-box-item-image"
        />

        <div className="custom-box-item-details">
          <h4 className="custom-box-item-name">{sauce.name}</h4>
          <p className="custom-box-item-stock">In stock</p>
          <p className="custom-box-item-price-container">
            <span className="custom-box-item-price">
              ${((sauce.price || 0) * quantity).toFixed(2)}
            </span>
          </p>

          <div className="custom-box-item-actions">
            <div className="custom-box-quantity-control">
              <button
                type="button"
                onClick={() =>
                  quantity > 1
                    ? handleUpdateSauce(sauceId, Math.max(1, quantity - 1))
                    : handleDeleteSauce(sauceId)
                }
                className="custom-box-quantity-btn"
                aria-label="Decrease quantity"
                disabled={isThisItemUpdating}
              >
                −
              </button>
              <span className="custom-box-quantity-display">{quantity}</span>
              <button
                type="button"
                onClick={() => handleUpdateSauce(sauceId, quantity + 1)}
                className="custom-box-quantity-btn"
                aria-label="Increase quantity"
                disabled={isThisItemUpdating}
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteSauce(sauceId)}
              className="custom-box-delete-btn"
              disabled={isThisItemUpdating}
            >
              {isThisItemUpdating ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderExtraItem = (extra) => {
    const extraId = extra.extra_id;
    const quantity = extra.quantity;
    const isThisItemUpdating = isUpdating && updatingItemId === extraId;

    return (
      <div key={extra.user_custom_box_extra_id} className="custom-box-item">
        <input
          type="checkbox"
          defaultChecked
          className="custom-box-item-checkbox"
        />

        <img
          src={extra.image_url}
          alt={extra.name}
          className="custom-box-item-image"
        />

        <div className="custom-box-item-details">
          <h4 className="custom-box-item-name">{extra.name}</h4>
          <p className="custom-box-item-stock">In stock</p>
          <p className="custom-box-item-price-container">
            <span className="custom-box-item-price">
              ${((extra.price || 0) * quantity).toFixed(2)}
            </span>
          </p>

          <div className="custom-box-item-actions">
            <div className="custom-box-quantity-control">
              <button
                type="button"
                onClick={() =>
                  quantity > 1
                    ? handleUpdateExtra(extraId, Math.max(1, quantity - 1))
                    : handleDeleteExtra(extraId)
                }
                className="custom-box-quantity-btn"
                aria-label="Decrease quantity"
                disabled={isThisItemUpdating}
              >
                −
              </button>
              <span className="custom-box-quantity-display">{quantity}</span>
              <button
                type="button"
                onClick={() => handleUpdateExtra(extraId, quantity + 1)}
                className="custom-box-quantity-btn"
                aria-label="Increase quantity"
                disabled={isThisItemUpdating}
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteExtra(extraId)}
              className="custom-box-delete-btn"
              disabled={isThisItemUpdating}
            >
              {isThisItemUpdating ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="custom-box-container">
      {/* Success/Error Message */}
      {message && <div className="custom-box-message">{message}</div>}

      {/* Summary Bar */}
      <div className="custom-box-summary">
        <div className="custom-box-summary-left">
          <span>
            Nigiris selected: <strong>{currentTotalNigiri}/14</strong>
          </span>
          {currentTotalNigiri < 14 && (
            <span className="custom-box-summary-warning">
              ⚠️ Add {14 - currentTotalNigiri} more nigiri(s) to continue
            </span>
          )}
        </div>
        <div className="custom-box-summary-total">
          Total: ${boxTotal.toFixed(2)}
        </div>
      </div>

      <div className="custom-box-content">
        <h3 className="custom-box-title">Current Omakase Box</h3>

        {/* Nigiris Section */}
        {!noNigiris && (
          <div className="custom-box-section">
            <h4 className="custom-box-section-title">
              Nigiris ({customBox.contents.length})
            </h4>
            {customBox.contents.map((nigiri) => renderNigiriItem(nigiri))}
          </div>
        )}

        {/* Sauces Section */}
        {!noSauces && (
          <div className="custom-box-section">
            <h4 className="custom-box-section-title">
              Sauces ({customBox.sauces.length})
            </h4>
            {customBox.sauces.map((sauce) => renderSauceItem(sauce))}
          </div>
        )}

        {/* Extras Section */}
        {!noExtras && (
          <div className="custom-box-section">
            <h4 className="custom-box-section-title">
              Extras ({customBox.extras.length})
            </h4>
            {customBox.extras.map((extra) => renderExtraItem(extra))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomBoxList;
