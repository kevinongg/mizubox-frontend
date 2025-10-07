import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import useQuery from "../../api/useQuery";
import useMutation from "../../api/useMutation";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const { token } = useAuth();
  const [toast, setToast] = useState({ message: "", result: "" });

  const {
    data: user,
    loading: userLoading,
    error: userError,
    query: userRefetch,
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

  const toastMessage = (message, result) => {
    setToast({ message, result });
    setTimeout(() => setToast({ message: "", result: "" }), 3000);
  };

  useEffect(() => {
    if (!token) return;
    userRefetch();
  }, [token]);

  const value = {
    // query user
    user,
    userLoading,
    userError,
    userRefetch,
    // update user details mutation
    updateUser,
    updateLoading,
    updateError,
    // update user password mutation
    updateUserPassword,
    updateUserPasswordLoading,
    updateUserPasswordError,
    // toast
    toastMessage,
  };
  return (
    <AccountContext.Provider value={value}>
      {children}{" "}
      {toast.message && (
        <div className={`toast toast-${toast.result}`}>{toast.message}</div>
      )}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context)
    throw Error("useAccount must be used within an AccountProvider");
  return context;
};
