import { useState } from "react";
import useQuery from "../../api/useQuery";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router";

const Sauce = () => {
  const {
    data: sauces,
    loading,
    error,
  } = useQuery("/sauces", "sauces");
  const { addToCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [addingSauceId, setAddingSauceId] = useState(null);

  const handleAddSauce = async (sauceId) => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      setAddingSauceId(sauceId);
      await addToCart({ sauceId });
      setMessage("Sauce added to cart!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("error adding sauce to cart", error);
    } finally {
      setAddingSauceId(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load sauces</p>;

  return (
    <div className="menu-container">
      <h1>Sauces</h1>
      <p>Add premium sauces to your order</p>

      {message && (
        <div className="success-message">{message}</div>
      )}

      <div className="menu-grid">
        {sauces?.map((sauce) => (
          <div key={sauce.id} className="menu-card">
            <img src={sauce.image_url} alt={sauce.name} />
            <h2>{sauce.name}</h2>
            <p>{sauce.description}</p>
            <span className="price">${sauce.price}</span>
            <button 
              onClick={() => handleAddSauce(sauce.id)}
              disabled={addingSauceId === sauce.id}
            >
              {addingSauceId === sauce.id ? "Adding..." : "Add Sauce"}
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