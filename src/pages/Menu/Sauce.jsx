import { useState } from "react";
import useQuery from "../../api/useQuery";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router";
import { checkAuth, showMessage } from "../../utils/menuHelpers";

const Sauce = () => {
  const { data: sauces, loading, error } = useQuery("/sauces", "sauces");
  const { addCartItemSauceToCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [addingSauceId, setAddingSauceId] = useState(null);

  const handleAddSauce = async (sauceId) => {
    try {
      if (!checkAuth(token, navigate)) return;
      setAddingSauceId(sauceId);
      await addCartItemSauceToCart({ sauceId });
      showMessage(setMessage, "Sauce added to cart!");
      setTimeout(() => setAddingSauceId(null), 1500);
    } catch (error) {
      console.error("error adding sauce to cart", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load sauces</p>;

  return (
    <div className="menu-container">
      <h1>Sauces</h1>
      <p>Add premium sauces to your order</p>

      {message && <div className="success-message">{message}</div>}

      <div className="menu-grid">
        {sauces?.map((sauce) => (
          <div key={sauce.id} className="menu-card">
            <img src={sauce.image_url} alt={sauce.name} />
            <h2>{sauce.name}</h2>
            <p>{sauce.description}</p>
            <span className="price">${sauce.price}</span>
            <button onClick={() => handleAddSauce(sauce.id)}>
              {addingSauceId === sauce.id ? "Added to cart!" : "Add Sauce"}
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
