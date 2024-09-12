import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext.jsx";
import { DeleteAccountProvider } from "./context/DeleteAccountContext.jsx";
import { PostContextProvider } from "./context/PostContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <DeleteAccountProvider>
          <PostContextProvider>
            <App />
          </PostContextProvider>
        </DeleteAccountProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
