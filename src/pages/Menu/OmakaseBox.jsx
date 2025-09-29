import { useState } from "react";
import useQuery from "../../api/useQuery";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router";

const OmakaseBox = () => {
  const {
    data: preMadeBoxes,
    loading,
    error,
  } = useQuery("/pre-made-boxes", "pre-made-boxes");
  const { addCartItemToCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (boxId) => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      setIsAdding(true);
      await addCartItemToCart({ boxType: "pre-made", preMadeBoxId: boxId });
      setMessage("Added to cart!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("error adding to cart", error);
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load menu</p>;

  return (
    <div>
      <h1>Omakase Box Menu</h1>
      <p>Choose from our pre-made boxes</p>

      {message && (
        <div style={{ background: "#d4edda", padding: "10px" }}>{message}</div>
      )}

      <div>
        {preMadeBoxes?.map((box) => (
          <div key={box.id}>
            <img src={box.image_url} alt={box.name} />
            <h2>{box.name}</h2>
            <p>{box.description}</p>
            <p>${box.price}</p>
            <button onClick={() => handleAddToCart(box.id)}>
              {isAdding ? "Adding to cart!" : "Add To Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OmakaseBox;
