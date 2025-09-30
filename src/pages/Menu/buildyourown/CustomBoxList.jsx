import TrashIcon from "../../../components/icons/TrashIcon";
import { useCustomBox } from "./CustomBoxContext";

const CustomBoxList = () => {
  const {
    customBox,
    customBoxLoading,
    customBoxError,
    updateNigiriQuantity,
    deleteNigiriFromCustomBox,
    updateSauceQuantity,
    deleteSauceFromCustomBox,
    updateExtraQuantity,
    deleteExtraFromCustomBox,
  } = useCustomBox();
  console.log(customBox);
  // console.log(customBox?.contents);

  // if (customBoxLoading) return <p>Loading custom box...</p>;
  if (!customBox) return <p>You have not started creating the box!</p>;
  if (customBoxError) return <p>Failed to load custom box</p>;

  return (
    <div>
      <h3>Current Omakase Box</h3>

      <h4>Nigiris</h4>
      <ul>
        {customBox?.contents.map((nigiri) => {
          const nigiriId = nigiri.nigiri_id;
          const quantity = nigiri.quantity;

          return (
            <li key={nigiri.user_custom_box_content_id}>
              <div>
                {nigiri.name} (×{quantity})
                <button
                  type="button"
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
                  {quantity > 1 ? "-" : <TrashIcon size={20} color="black" />}
                </button>{" "}
                {quantity}
                <button
                  type="button"
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
            </li>
          );
        })}
      </ul>

      <h4>Sauces</h4>
      <ul>
        {customBox.sauces.map((sauce) => {
          const sauceId = sauce.sauce_id;
          const quantity = sauce.quantity;

          return (
            <li key={sauce.user_custom_box_sauce_id}>
              <div>
                {sauce.name} (×{quantity})
                <button
                  type="button"
                  onClick={() =>
                    quantity > 1
                      ? updateSauceQuantity({
                          sauceId: sauceId,
                          quantity: Math.max(1, quantity - 1),
                        })
                      : deleteSauceFromCustomBox({ sauceId: sauceId })
                  }
                >
                  {quantity > 1 ? "-" : <TrashIcon size={20} color="black" />}
                </button>
                <button
                  type="button"
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
            </li>
          );
        })}
      </ul>

      <h4>Extras</h4>
      <ul>
        {customBox.extras.map((extra) => {
          const extraId = extra.extra_id;
          const quantity = extra.quantity;

          return (
            <li key={extra.user_custom_box_extra_id}>
              <div>
                {extra.name} (×{quantity})
                <button
                  type="button"
                  onClick={() =>
                    quantity > 1
                      ? updateExtraQuantity({
                          extraId: extraId,
                          quantity: Math.max(1, quantity - 1),
                        })
                      : deleteExtraFromCustomBox({ extraId: extraId })
                  }
                >
                  {quantity > 1 ? "-" : <TrashIcon size={20} color="black" />}
                </button>
                <button
                  type="button"
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomBoxList;
