import { useState } from "react";
import useQuery from "../../api/useQuery";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router";
import { checkAuth, showMessage } from "../../utils/menuHelpers";

const OmakaseBox = () => {
  const { addCartItemToCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isAddingBoxId, setIsAddingBoxId] = useState(null);

  const {
    data: preMadeBoxes,
    loading,
    error,
  } = useQuery("/pre-made-boxes", "pre-made-boxes");

  const handleAddToCart = async (boxId) => {
    try {
      if (!checkAuth(token, navigate)) return;
      setIsAddingBoxId(boxId);
      await addCartItemToCart({ boxType: "pre-made", boxId });
      showMessage(setMessage, "Added to cart!");
      setTimeout(() => setIsAddingBoxId(null), 1500);
    } catch (error) {
      console.error("error adding to cart", error);
    }
  };

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
            <button onClick={() => handleAddToCart(box.id)}>
              {isAddingBoxId === box.id ? "Added to cart!" : "Add To Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OmakaseBox;
