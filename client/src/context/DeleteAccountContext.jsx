import { createContext, useContext, useState } from "react";

export const DeleteAccount = createContext();

export const useDeleteAccount = () => {
  return useContext(DeleteAccount);
};

export const DeleteAccountProvider = ({ children }) => {
  const [deleteAccount, setDeleteAccount] = useState(false);
  return (
    <DeleteAccount.Provider value={{ deleteAccount, setDeleteAccount }}>
      {children}
    </DeleteAccount.Provider>
  );
};
