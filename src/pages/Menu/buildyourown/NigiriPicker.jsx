import { useCustomBox } from "./CustomBoxContext";

const NigiriPicker = () => {
  const { nigiris, addNigiriToCustomBox } = useCustomBox();

  if (!nigiris) return <p>Nigiris not in stock</p>;

  return (
    <div className="picker-container">
      {nigiris.map((nigiri) => {
        return (
          <div key={nigiri.id} className="picker-item">
            <img src={nigiri.image_url} alt={nigiri.name}></img>
            <button
              type="button"
              onClick={() =>
                addNigiriToCustomBox({
                  nigiriId: nigiri.id,
                })
              }
            >
              {nigiri.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NigiriPicker;
