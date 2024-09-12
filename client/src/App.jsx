import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUserContext } from "./context/UserContext";
//pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfile from "./pages/UserProfile";
import CreateRecipePost from "./pages/CreateRecipePage";
//components
import NavBar from "./components/NavBar";
import DeleteAccount from "./components/DeleteAccount";
import { useDeleteAccount } from "./context/DeleteAccountContext";
import RightNavBar from "./components/RightNavBar";
import { usePostContext } from "./context/PostContext";
import SearchRecipe from "./pages/SearchRecipe";

function App() {
  const { user } = useUserContext();
  const { posts } = usePostContext();
  const { deleteAccount } = useDeleteAccount();

  return (
    <div className="flex gap-5 w-full ">
      {user && <NavBar />}
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile/:username"
          element={!user ? <LoginPage /> : <UserProfile />}
        />
        {/* <Route
          path="delete/profile/:username"
          element={!user ? <LoginPage /> : <UserProfile />}
        /> */}
        <Route
          path="post/create/"
          element={!user ? <LoginPage /> : <CreateRecipePost />}
        />
        <Route
          path="search"
          element={!user ? <LoginPage /> : <SearchRecipe />}
        />
      </Routes>
      {user && <RightNavBar />}
      <Toaster />
      {deleteAccount && (
        <div className="flex justify-center items-center h-screen w-full absolute">
          <DeleteAccount />
        </div>
      )}
    </div>
  );
}

export default App;
