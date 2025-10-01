import { useCustomBox } from "./CustomBoxContext";

const SaucePicker = () => {
  const { sauces, addSauceToCustomBox } = useCustomBox();

  if (!sauces) return <p>Sauces not in stock</p>;

  return (
    <div>
      {sauces?.map((sauce) => {
        return (
          <div key={sauce.id}>
            <img src={sauce.image_url} alt={sauce.name}></img>
            <button
              type="button"
              onClick={() => addSauceToCustomBox({ sauceId: sauce.id })}
            >
              {sauce.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SaucePicker;
