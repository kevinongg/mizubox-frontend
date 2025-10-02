import useQuery from "../../api/useQuery";
import useCartMessage from "../../utils/customMessage";

const Extra = () => {
  const { data: extras, loading, error } = useQuery("/extras", "extras");
  const { message, addingItemId, handleAddExtra } = useCartMessage();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load extras</p>;

  return (
    <div className="menu-container">
      <h1>Extras</h1>
      <p>Add premium extras to your order</p>

      {message && (
        <div style={{ background: "#d4edda", padding: "10px" }}>{message}</div>
      )}

      <div className="menu-grid">
        {extras?.map((extra) => (
          <div key={extra.id} className="menu-card">
            <img src={extra.image_url} alt={extra.name} />
            <h2>{extra.name}</h2>
            <p>{extra.description}</p>
            <span className="price">${extra.price}</span>
            <button
              onClick={() => handleAddExtra(extra.id)}
              disabled={addingItemId === extra.id}
            >
              {addingItemId === extra.id ? "Adding..." : "Add Extra"}
            </button>
          </div>
        ))}
      </div>

      {(!extras || extras.length === 0) && <p>No extras available right now</p>}
    </div>
  );
};

export default Extra;
