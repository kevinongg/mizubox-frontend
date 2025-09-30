import { createContext, useContext } from "react";
import useQuery from "../../../api/useQuery";
import useMutation from "../../../api/useMutation";
import { useApi } from "../../../api/apiContext";

const CustomBoxContext = createContext();

export const CustomBoxProvider = ({ children }) => {
  const { request, invalidateTags } = useApi();

  // Query an "active" custom box (most recently created)
  const {
    data: customBox,
    loading: customBoxLoading,
    error: customBoxError,
    query: customBoxRefetch,
  } = useQuery("/user-custom-boxes/active", "customBox");

  /////***** Query Menu Items (nigiris, sauces, extras *****/////
  const { data: nigiris } = useQuery("/nigiris", "nigiris");
  const { data: sauces } = useQuery("/sauces", "sauces");
  const { data: extras } = useQuery("/extras", "extras");

  /////***** Mutations *****/////
  // Nigiri mutations
  const addNigiriToCustomBox = async ({ customBoxId, nigiriId }) => {
    await request(`/user-custom-boxes/${customBoxId}/nigiris`, {
      method: "POST",
      body: JSON.stringify({ nigiriId }),
    });
    invalidateTags(["customBox"]);
  };
  const updateNigiriQuantity = async ({ customBoxId, nigiriId, quantity }) => {
    await request(`/user-custom-boxes/${customBoxId}/nigiris/${nigiriId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    invalidateTags(["customBox"]);
  };
  const deleteNigiriFromCustomBox = async ({ customBoxId, nigiriId }) => {
    await request(`/user-custom-boxes/${customBoxId}/nigiris/${nigiriId}`, {
      method: "DELETE",
    });
    invalidateTags(["customBox"]);
  };

  // Sauce mutations
  const addSauceToCustomBox = async ({ customBoxId, sauceId }) => {
    await request(`/user-custom-boxes/${customBoxId}/sauces`, {
      method: "POST",
      body: JSON.stringify({ sauceId }),
    });
    invalidateTags(["customBox"]);
  };
  const updateSauceQuantity = async ({ customBoxId, sauceId, quantity }) => {
    await request(`/user-custom-boxes/${customBoxId}/sauces/${sauceId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    invalidateTags(["customBox"]);
  };
  const deleteSauceFromCustomBox = async ({ customBoxId, sauceId }) => {
    await request(`/user-custom-boxes/${customBoxId}/sauces/${sauceId}`, {
      method: "DELETE",
    });
    invalidateTags(["customBox"]);
  };

  // Extra mutations
  const addExtraToCustomBox = async ({ customBoxId, extraId }) => {
    await request(`/user-custom-boxes/${customBoxId}/extras`, {
      method: "POST",
      body: JSON.stringify({ extraId }),
    });
    invalidateTags(["customBox"]);
  };
  const updateExtraQuantity = async ({ customBoxId, extraId, quantity }) => {
    await request(`/user-custom-boxes/${customBoxId}/extras/${extraId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    invalidateTags(["customBox"]);
  };
  const deleteExtraFromCustomBox = async ({ customBoxId, extraId }) => {
    await request(`/user-custom-boxes/${customBoxId}/extras/${extraId}`, {
      method: "DELETE",
    });
    invalidateTags(["customBox"]);
  };

  // 14 Minimum nigiri rule
  const currentTotalNigiri = customBox?.contents.reduce((sum, nigiri) => {
    return sum + nigiri.quantity;
  }, 0);

  // Add custom box to cart
  const addCustomBoxToCart = async ({ customBoxId }) => {
    await request("/cart/items", {
      method: "POST",
      body: JSON.stringify({ boxType: "custom", boxId: customBoxId }),
    });
    invalidateTags(["cart"]);
  };

  const value = {
    // custom box query
    customBox,
    customBoxLoading,
    customBoxError,
    customBoxRefetch,
    // nigiris
    nigiris,
    addNigiriToCustomBox,
    updateNigiriQuantity,
    deleteNigiriFromCustomBox,
    // sauces
    sauces,
    addSauceToCustomBox,
    updateSauceQuantity,
    deleteSauceFromCustomBox,
    // extras
    extras,
    addExtraToCustomBox,
    updateExtraQuantity,
    deleteExtraFromCustomBox,
    // cart
    addCustomBoxToCart,
    // 14 nigiri rule
    currentTotalNigiri,
  };
  return (
    <CustomBoxContext.Provider value={value}>
      {children}
    </CustomBoxContext.Provider>
  );
};

export const useCustomBox = () => {
  const context = useContext(CustomBoxContext);
  if (!context)
    throw Error("useCustomBox must be used within an CustomBoxProvider");
  return context;
};
