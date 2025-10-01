import { useCustomBox } from "./CustomBoxContext";
import CustomBoxList from "./CustomBoxList";
import ExtraPicker from "./ExtraPicker";
import NigiriPicker from "./NigiriPicker";
import SaucePicker from "./SaucePicker";

const BuildYourOwn = () => {
  const { customBox, addCustomBoxToCart, currentTotalNigiri } = useCustomBox();
  console.log(customBox);

  return (
    <div className="build-your-own">
      <h1>Build Your Own Omakase Box</h1>
      <p>Select at least 14 nigiris to continue</p>
      <p>Omakase Box Total: ${customBox?.box_total}</p>
      <p>Nigiris selected: {currentTotalNigiri}</p>

      <CustomBoxList />

      <h2>Pick Nigiris</h2>
      <NigiriPicker />

      <h2>Pick Sauces</h2>
      <SaucePicker />

      <h2>Pick Extras</h2>
      <ExtraPicker />
      <button
        type="button"
        disabled={currentTotalNigiri < 14 || !customBox}
        onClick={() =>
          addCustomBoxToCart({ customBoxId: customBox.user_custom_box_id })
        }
      >
        Add Box To Cart
      </button>
    </div>
  );
};

export default BuildYourOwn;
