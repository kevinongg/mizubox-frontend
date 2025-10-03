import useQuery from "../../api/useQuery";
import useCartMessage from "../../utils/customMessage";

const Sauce = () => {
  const { data: sauces, loading, error } = useQuery("/sauces", "sauces");
  const { message, addingItemId, handleAddSauce } = useCartMessage();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load sauces</p>;

  return (
    <div className="menu-container">
      <h1>Sauces</h1>
      <p>Add premium sauces to your order</p>

      {message && <div className="success-message">{message}</div>}
      {message && <div className="success-message">{message}</div>}

      <div className="menu-grid">
        {sauces?.map((sauce) => (
          <div key={sauce.id} className="menu-card">
            <img src={sauce.image_url} alt={sauce.name} />
            <h2>{sauce.name}</h2>
            <p>{sauce.description}</p>
            <span className="price">${sauce.price}</span>
            <button
            <button
              onClick={() => handleAddSauce(sauce.id)}
              disabled={addingItemId === sauce.id}
            >
              {addingItemId === sauce.id ? "Adding..." : "Add Sauce"}
            </button>
          </div>
        ))}
      </div>

      {(!sauces || sauces.length === 0) && (
        <div className="empty-state">
          <p>No sauces available right now</p>
        </div>
      )}
    </div>
  );
};

export default Sauce;

