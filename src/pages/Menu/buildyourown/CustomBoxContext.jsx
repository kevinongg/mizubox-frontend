import { createContext, useContext, useEffect } from "react";
import useQuery from "../../../api/useQuery";
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

  // Create initial custom box if none exists
  useEffect(() => {
    const createInitialBox = async () => {
      if (!customBoxLoading && !customBox && !customBoxError) {
        try {
          await request("/user-custom-boxes/active/new", {
            method: "POST",
          });
          invalidateTags(["customBox"]);
        } catch (error) {
          console.error("Failed to create initial custom box:", error);
        }
      }
    };

    createInitialBox();
  }, [customBox, customBoxLoading, customBoxError, request, invalidateTags]);

  /////***** Helper function to ensure custom box exists *****/////
  const ensureCustomBox = async () => {
    if (!customBox) {
      await request("/user-custom-boxes/active/new", {
        method: "POST",
      });
      await customBoxRefetch();
      // Wait a bit for the refetch to complete
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  /////***** Mutations *****/////
  // Nigiri mutations
  const addNigiriToCustomBox = async ({ nigiriId }) => {
    await ensureCustomBox();

    // Refetch to get the latest customBox
    const latestBox = await customBoxRefetch();
    const boxId =
      latestBox?.user_custom_box_id || customBox?.user_custom_box_id;

    if (!boxId) {
      console.error("No custom box ID available");
      return;
    }

    await request(`/user-custom-boxes/${boxId}/nigiris`, {
      method: "POST",
      body: JSON.stringify({ nigiriId }),
    });
    invalidateTags(["customBox"]);
  };

  const updateNigiriQuantity = async ({ nigiriId, quantity }) => {
    if (!customBox) return;

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
    if (!customBox) return;

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
    await ensureCustomBox();

    const latestBox = await customBoxRefetch();
    const boxId =
      latestBox?.user_custom_box_id || customBox?.user_custom_box_id;

    if (!boxId) {
      console.error("No custom box ID available");
      return;
    }

    await request(`/user-custom-boxes/${boxId}/sauces`, {
      method: "POST",
      body: JSON.stringify({ sauceId }),
    });
    invalidateTags(["customBox"]);
  };

  const updateSauceQuantity = async ({ sauceId, quantity }) => {
    if (!customBox) return;

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
    if (!customBox) return;

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
    await ensureCustomBox();

    const latestBox = await customBoxRefetch();
    const boxId =
      latestBox?.user_custom_box_id || customBox?.user_custom_box_id;

    if (!boxId) {
      console.error("No custom box ID available");
      return;
    }

    await request(`/user-custom-boxes/${boxId}/extras`, {
      method: "POST",
      body: JSON.stringify({ extraId }),
    });
    invalidateTags(["customBox"]);
  };

  const updateExtraQuantity = async ({ extraId, quantity }) => {
    if (!customBox) return;

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
    if (!customBox) return;

    await request(
      `/user-custom-boxes/${customBox.user_custom_box_id}/extras/${extraId}`,
      {
        method: "DELETE",
      }
    );
    invalidateTags(["customBox"]);
  };

  // 14 Minimum nigiri rule
  const currentTotalNigiri =
    customBox?.contents?.reduce((sum, nigiri) => {
      return sum + nigiri.quantity;
    }, 0) || 0;

  // Add custom box to cart
  const addCustomBoxToCart = async ({ customBoxId }) => {
    if (!customBox) return;

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
