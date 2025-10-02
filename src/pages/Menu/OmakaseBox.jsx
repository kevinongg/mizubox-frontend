import useCartMessage from "../../utils/customMessage";
import useQuery from "../../api/useQuery";

const OmakaseBox = () => {
  const {
    data: preMadeBoxes,
    loading,
    error,
  } = useQuery("/pre-made-boxes", "pre-made-boxes");
  const { message, isAdding, handleAddBox } = useCartMessage();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load menu</p>;

  return (
    <div className="menu-container">
      <h1>Omakase Box Menu</h1>
      <p>Choose from our pre-made boxes</p>

      {message && <div className="success-message">{message}</div>}
      <div className="menu-grid">
        {preMadeBoxes?.map((box) => (
          <div key={box.id} className="menu-card">
            <img src={box.image_url} alt={box.name} />
            <h2>{box.name}</h2>
            <p>{box.description}</p>
            <span className="price">${box.price}</span>
            <button onClick={() => handleAddBox(box.id)}>
              {isAdding ? "Adding to cart!" : "Add To Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OmakaseBox;
