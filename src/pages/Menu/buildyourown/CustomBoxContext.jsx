import { createContext, useContext } from "react";
import useQuery from "../../../api/useQuery";
import { useApi } from "../../../api/apiContext";
import useMutation from "../../../api/useMutation";

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
  const addNigiriToCustomBox = async ({ nigiriId }) => {
    await request(
      `/user-custom-boxes/${customBox.user_custom_box_id}/nigiris`,
      {
        method: "POST",
        body: JSON.stringify({ nigiriId }),
      }
    );
    invalidateTags(["customBox"]);
  };
  const updateNigiriQuantity = async ({ nigiriId, quantity }) => {
    await request(
      `/user-custom-boxes/${customBox.user_custom_box_id}/nigiris/${nigiriId}`,
      {
        method: "PUT",
        body: JSON.stringify({ quantity }),
      }
    );
    invalidateTags(["customBox"]);
  };
  const deleteNigiriFromCustomBox = async ({ nigiriId }) => {
    await request(
      `/user-custom-boxes/${customBox.user_custom_box_id}/nigiris/${nigiriId}`,
      {
        method: "DELETE",
      }
    );
    invalidateTags(["customBox"]);
  };

  // Sauce mutations
  const addSauceToCustomBox = async ({ sauceId }) => {
    await request(`/user-custom-boxes/${customBox.user_custom_box_id}/sauces`, {
      method: "POST",
      body: JSON.stringify({ sauceId }),
    });
    invalidateTags(["customBox"]);
  };
  const updateSauceQuantity = async ({ sauceId, quantity }) => {
    await request(
      `/user-custom-boxes/${customBox.user_custom_box_id}/sauces/${sauceId}`,
      {
        method: "PUT",
        body: JSON.stringify({ quantity }),
      }
    );
    invalidateTags(["customBox"]);
  };
  const deleteSauceFromCustomBox = async ({ sauceId }) => {
    await request(
      `/user-custom-boxes/${customBox.user_custom_box_id}/sauces/${sauceId}`,
      {
        method: "DELETE",
      }
    );
    invalidateTags(["customBox"]);
  };

  // Extra mutations
  const addExtraToCustomBox = async ({ extraId }) => {
    await request(`/user-custom-boxes/${customBox.user_custom_box_id}/extras`, {
      method: "POST",
      body: JSON.stringify({ extraId }),
    });
    invalidateTags(["customBox"]);
  };
  const updateExtraQuantity = async ({ extraId, quantity }) => {
    await request(
      `/user-custom-boxes/${customBox.user_custom_box_id}/extras/${extraId}`,
      {
        method: "PUT",
        body: JSON.stringify({ quantity }),
      }
    );
    invalidateTags(["customBox"]);
  };
  const deleteExtraFromCustomBox = async ({ extraId }) => {
    await request(
      `/user-custom-boxes/${customBox.user_custom_box_id}/extras/${extraId}`,
      {
        method: "DELETE",
      }
    );
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
    // refetch BYO ui using cart
    invalidateTags(["cart"]);
    // create a new BYO empty box
    await request("/user-custom-boxes/active/new", {
      method: "POST",
    });
    // refetch BYO ui using custombox so it re-renders
    invalidateTags(["customBox"]);
  };

  // Clear custom box
  // const clearCustomBox = async () => {};
  const { mutate: clearCustomBox } = useMutation(
    "DELETE",
    "/user-custom-boxes/active",
    ["customBox"]
  );

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
    // clear custom box
    clearCustomBox,
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
