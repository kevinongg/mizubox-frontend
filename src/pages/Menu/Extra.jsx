import { useState } from "react";
import useQuery from "../../api/useQuery";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router";
import { checkAuth, showMessage } from "../../utils/menuHelpers";

const Extra = () => {
  const { data: extras, loading, error } = useQuery("/extras", "extras");
  const { addCartItemExtraToCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [addingExtraId, setAddingExtraId] = useState(null);

  const handleAddExtra = async (extraId) => {
    try {
      if (!checkAuth(token, navigate)) return;
      setAddingExtraId(extraId);
      await addCartItemExtraToCart({ extraId });
      showMessage(setMessage, "Extra added to cart!");
      setTimeout(() => setAddingExtraId(null), 1500);
    } catch (error) {
      console.error("error adding extra to cart", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load extras</p>;

  return (
    <div className="menu-container">
      <h1>Extras</h1>
      <p>Add premium extras to your order</p>

      {message && <div className="success-message">{message}</div>}

      <div className="menu-grid">
        {extras?.map((extra) => (
          <div key={extra.id} className="menu-card">
            <img src={extra.image_url} alt={extra.name} />
            <h2>{extra.name}</h2>
            <p>{extra.description}</p>
            <span className="price">${extra.price}</span>
            <button onClick={() => handleAddExtra(extra.id)}>
              {addingExtraId === extra.id ? "Adding..." : "Add Extra"}
            </button>
          </div>
        ))}
      </div>

      {(!extras || extras.length === 0) && <p>No extras available right now</p>}
    </div>
  );
};

export default Extra;
