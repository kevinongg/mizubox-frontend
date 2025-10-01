import { useCustomBox } from "./CustomBoxContext";

const ExtraPicker = () => {
  const { extras, addExtraToCustomBox } = useCustomBox();

  if (!extras) return <p>Extras not in stock</p>;

  return (
    <div className="picker-container">
      {extras.map((extra) => {
        return (
          <div key={extra.id} className="picker-item">
            <img src={extra.image_url} alt={extra.name}></img>
            <button
              type="button"
              onClick={() => addExtraToCustomBox({ extraId: extra.id })}
            >
              {extra.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ExtraPicker;
