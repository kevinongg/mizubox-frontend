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

  const {
    mutate: updateUserPassword,
    loading: updateUserPasswordLoading,
    error: updateUserPasswordError,
  } = useMutation("PATCH", "/users/me/password", ["user"]);

  const value = {
    // query user
    user,
    userLoading,
    userError,
    // update user details mutation
    updateUser,
    updateLoading,
    updateError,
    // update user password mutation
    updateUserPassword,
    updateUserPasswordLoading,
    updateUserPasswordError,
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
