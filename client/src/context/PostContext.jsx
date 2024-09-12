import { createContext, useContext, useState } from "react";

export const postContext = createContext();

export const usePostContext = () => {
  return useContext(postContext);
};

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );
  return (
    <postContext.Provider value={{ posts, setPosts }}>
      {children}
    </postContext.Provider>
  );
};
