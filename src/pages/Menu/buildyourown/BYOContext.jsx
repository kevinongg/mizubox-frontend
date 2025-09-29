import { createContext, useContext, useState } from "react";
import useQuery from "../../../api/useQuery";
import { useApi } from "../../../api/apiContext";

const BYOContext = createContext();

export const BYOProvider = ({ children }) => {
  const { request, invalidateTags } = useApi;
  // Menu items (nigiris, sauces, extras)
  // usequery nigiri
  const {
    data: nigirisQuery,
    loading: nigiriLoading,
    error: nigiriError,
    query: refetchNigiriQuery,
  } = useQuery("/nigiris", "nigiris");

  // usequery sauces
  const {
    data: saucesQuery,
    loading: sauceLoading,
    error: sauceError,
    query: refetchSauceQuery,
  } = useQuery("/sauces", "sauces");

  // usequery extras
  const {
    data: extrasQuery,
    loading: extraLoading,
    error: extraError,
    query: refetchExtraQuery,
  } = useQuery("/extras", "extras");

  // Custom Box States
  const [customBox, setCustomBox] = useState(null);
  const [customBoxDetails, setCustomBoxDetails] = useState(null);
  const [customBoxLoading, setCustomBoxLoading] = useState(false);
  const [customBoxError, setCustomBoxError] = useState("");
  const minimumNigiriPieces = 14; // 14 nigiri rule to checkout

  // create a custom box

  const createCustomBox = async () => {
    try {
      if (customBox) return customBox;
      const createdCustomBox = await request("/user-custom-boxes", {
        method: "POST",
      });
      setCustomBox(createdCustomBox);
      setCustomBoxDetails({
        id: createdCustomBox.id,
        nigiris: [],
        sauces: [],
        extras: [],
      });
      return createdCustomBox;
    } catch (err) {
      setCustomBoxError(`Failed to create a custom box: ${err.message}`);
      return null;
    }
  };

  // add nigiri to custom box

  // add sauce to custom box

  // add extra to custom box

  // get current nigiri count

  // add custom box to cart

  const refetchCustomBoxDetails = async () => {};

  const value = {
    // nigiris
    nigirisQuery,
    nigiriLoading,
    nigiriError,
    refetchNigiriQuery,
    // sauces
    saucesQuery,
    sauceLoading,
    sauceError,
    refetchSauceQuery,
    // extras
    extrasQuery,
    extraLoading,
    extraError,
    refetchExtraQuery,

    // states
    customBox,
    customBoxDetails,
    customBoxLoading,
    customBoxError,
    minimumNigiriPieces,

    // creatingCustomBox,
    // creatingCustomBoxError,
  };
  return <BYOContext.Provider value={value}>{children}</BYOContext.Provider>;
};

export const useBYO = () => {
  const context = useContext(BYOContext);
  if (!context) throw Error("useCart must be used within an BYOProvider");
  return context;
};

// const {
//   mutate: createCustomBoxMutate,
//   loading: creatingCustomBox,
//   error: creatingCustomBoxError,
//   data: createdCustomBox,
// } = useMutation("POST", "/user-custom-boxes", []);

// // add nigiri to custom box, usemutation
// const addNigiriMutate = useMutation(
//   "POST",
//   `/user-custom-boxes/${customBox.id}/nigiris`,
//   []
// );

// // add sauce to custom box, usemutation
// const addSauceMutate = useMutation(
//   "POST",
//   `/user-custom-boxes/${customBox.id}`,
//   []
// );

// // add extra to custom box, usemutation
// const addExtraMutate = useMutation(
//   "POST",
//   `/user-custom-boxes/${customBox.id}`,
//   []
// );

// // add custom box to cart, usemutation
// const addCustomBoxToCartMutate = useMutation("POST", "/cart/items", ["cart"]);

// // create custom box
// const createCustomBox = async () => {

// };
