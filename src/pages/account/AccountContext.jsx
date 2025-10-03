import { createContext, useContext } from "react";
import useQuery from "../../api/useQuery";
import useMutation from "../../api/useMutation";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useQuery("/users/me", "user");

  const {
    mutate: updateUser,
    loading: updateLoading,
    error: updateError,
  } = useMutation("PATCH", "/users/me", ["user"]);

  const value = {
    user,
    userLoading,
    userError,
    updateUser,
    updateLoading,
    updateError,
  };
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context)
    throw Error("useAccount must be used within an AccountProvider");
  return context;
};
