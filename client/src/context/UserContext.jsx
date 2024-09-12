import { createContext, useContext, useState } from "react";

export const userContext = createContext();

export const useUserContext = () => {
  return useContext(userContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("logged-user")) || null
  );
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
