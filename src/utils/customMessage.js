import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../pages/Cart/CartContext";
import { useCustomBox } from "../pages/Menu/buildyourown/CustomBoxContext";

/**
 * Custom hook for handling cart and custom box operations with loading states and success messages
 * @returns {Object} Hook utilities
 */
const useCartMessage = () => {
  const [message, setMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [addingItemId, setAddingItemId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const { token } = useAuth();
  const navigate = useNavigate();
  const { addCartItemToCart, addCartItemSauceToCart, addCartItemExtraToCart } =
    useCart();
  const {
    updateNigiriQuantity: contextUpdateNigiri,
    deleteNigiriFromCustomBox: contextDeleteNigiri,
    updateSauceQuantity: contextUpdateSauce,
    deleteSauceFromCustomBox: contextDeleteSauce,
    updateExtraQuantity: contextUpdateExtra,
    deleteExtraFromCustomBox: contextDeleteExtra,
  } = useCustomBox() || {};

  const showMessage = (msg, duration = 2000) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), duration);
  };

  // Generic handler for adding items to cart
  const handleAddToCart = async (addFunction, itemId, itemType, successMsg) => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      setAddingItemId(itemId);
      await addFunction();
      showMessage(successMsg);
    } catch (error) {
      console.error(`error adding ${itemType} to cart`, error);
      showMessage(`Failed to add ${itemType}`);
    } finally {
      setAddingItemId(null);
    }
  };

  // Generic handler for custom box operations (update/delete)
  const handleCustomBoxOperation = async (
    operation,
    itemId,
    itemType,
    successMsg,
    params = {}
  ) => {
    if (!operation) return;
    try {
      setIsUpdating(true);
      setUpdatingItemId(itemId);
      await operation(params);
      showMessage(successMsg, 1500);
    } catch (error) {
      console.error(`error with ${itemType} operation`, error);
      showMessage(`Failed to update ${itemType}`);
    } finally {
      setIsUpdating(false);
      setUpdatingItemId(null);
    }
  };

  // Cart operations
  const handleAddBox = async (boxId, boxType = "pre-made") => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      setIsAdding(true);
      await addCartItemToCart({ boxType, boxId });
      showMessage("Added to cart!");
    } catch (error) {
      console.error("error adding to cart", error);
      showMessage("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleAddSauce = (sauceId) =>
    handleAddToCart(
      () => addCartItemSauceToCart({ sauceId }),
      sauceId,
      "sauce",
      "Sauce added to cart!"
    );

  const handleAddExtra = (extraId) =>
    handleAddToCart(
      () => addCartItemExtraToCart({ extraId }),
      extraId,
      "extra",
      "Extra added to cart!"
    );

  // Custom box operations - Nigiri
  const handleUpdateNigiri = (nigiriId, quantity) =>
    handleCustomBoxOperation(
      contextUpdateNigiri,
      nigiriId,
      "nigiri",
      "Quantity updated!",
      { nigiriId, quantity }
    );

  const handleDeleteNigiri = (nigiriId) =>
    handleCustomBoxOperation(
      contextDeleteNigiri,
      nigiriId,
      "nigiri",
      "Item removed",
      { nigiriId }
    );

  // Custom box operations - Sauce
  const handleUpdateSauce = (sauceId, quantity) =>
    handleCustomBoxOperation(
      contextUpdateSauce,
      sauceId,
      "sauce",
      "Quantity updated!",
      { sauceId, quantity }
    );

  const handleDeleteSauce = (sauceId) =>
    handleCustomBoxOperation(
      contextDeleteSauce,
      sauceId,
      "sauce",
      "Sauce removed",
      { sauceId }
    );

  // Custom box operations - Extra
  const handleUpdateExtra = (extraId, quantity) =>
    handleCustomBoxOperation(
      contextUpdateExtra,
      extraId,
      "extra",
      "Quantity updated!",
      { extraId, quantity }
    );

  const handleDeleteExtra = (extraId) =>
    handleCustomBoxOperation(
      contextDeleteExtra,
      extraId,
      "extra",
      "Extra removed",
      { extraId }
    );

  return {
    message,
    isAdding,
    addingItemId,
    isUpdating,
    updatingItemId,
    handleAddBox,
    handleAddSauce,
    handleAddExtra,
    handleUpdateNigiri,
    handleDeleteNigiri,
    handleUpdateSauce,
    handleDeleteSauce,
    handleUpdateExtra,
    handleDeleteExtra,
    showMessage,
  };
};

export default useCartMessage;
