import React, { useState } from "react";

// components
import ProfileLink from "./ProfileLink";
import useLogin from "../hooks/useLogin";
import useLogout from "../hooks/useLogout";
import useRegister from "../hooks/useRegister";
// packages
import { Link } from "react-router-dom";
// icons
import { CiUser, CiLogout, CiSearch } from "react-icons/ci";
import { AiOutlineUserDelete } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";

import { useUserContext } from "../context/UserContext";
import DeleteAccount from "./DeleteAccount";
import { useDeleteAccount } from "../context/DeleteAccountContext";
const NavBar = () => {
  const [page, setPage] = useState(
    window.localStorage.getItem("page") || "explore"
  );
  const { user } = useUserContext();
  const { logout } = useLogout();
  const { login } = useLogin(user || {});
  const { register } = useRegister(user || {});

  const handelPageChange = (value) => {
    window.localStorage.setItem("page", value);
    setPage(value);
  };
  const { deleteAccount, setDeleteAccount } = useDeleteAccount();
  return (
    <div className="flex justify-between p-3 flex-col h-screen w-[300px] bg-[#222931] shadow-lg sticky top-0">
      <div className="flex justify-between items-center">
        <img
          src="../public/icon.png"
          alt="logo"
          className="w-[100px] h-[100px] object-contain"
        />
        <p className="text-primary text-xl">Fooders</p>
      </div>
      <div className="flex flex-col justify-center gap-10 text-secondary ">
        {/* user options */}
        <Link
          to={`/`}
          onClick={() => handelPageChange("explore")}
          className={`flex items-center gap-2 text-xl text-secondary hover:border-b-2 hover:border-primary transition-all duration-300   ${
            page === "explore" ? "border-b-2 border-primary" : ""
          }  w-full`}
        >
          <GoHome />
          Explore
        </Link>
        <Link
          onClick={() => handelPageChange("profile")}
          to={`/profile/${user.username}`}
          className={`flex items-center gap-2 text-xl text-secondary hover:border-b-2 hover:border-primary transition-all duration-300  ${
            page === "profile" ? "border-b-2 border-primary" : ""
          } w-full`}
        >
          <CiUser />
          Profile
        </Link>
        <Link
          to={`/post/create`}
          onClick={() => handelPageChange("create-recipe")}
          className={`flex items-center gap-2 text-xl text-secondary hover:border-b-2 hover:border-primary transition-all duration-300  ${
            page === "create-recipe" ? "border-b-2 border-primary" : ""
          } w-full`}
        >
          <IoCreateOutline />
          Create Recipe
        </Link>
        <Link
          to={`/search`}
          onClick={() => handelPageChange("search-recipe")}
          className={`flex items-center gap-2 text-xl text-secondary hover:border-b-2 hover:border-primary transition-all duration-300  ${
            page === "search-recipe" ? "border-b-2 border-primary" : ""
          } w-full`}
        >
          <CiSearch />
          Search Recipe
        </Link>

        <Link
          className={`flex items-center gap-2 text-xl text-secondary hover:border-b-2 hover:border-primary transition-all duration-300  ${
            page === "delete-account" ? "border-b-2 border-primary" : ""
          } w-full`}
          onClick={() => setDeleteAccount(!deleteAccount)}
        >
          <AiOutlineUserDelete />
          Delete Account
        </Link>

        {user ? (
          <Link
            to={`/profile/${user.username}`}
            className={`flex items-center gap-2 text-xl text-secondary hover:border-b-2 hover:border-primary transition-all duration-300   w-full`}
            onClick={logout}
          >
            <CiLogout />
            Logout
          </Link>
        ) : (
          <>
            <Link
              to={`/auth/login`}
              className={`flex items-center gap-2 text-xl text-secondary  border-b-2 border-primary w-full`}
              onClick={login}
            >
              <CiLogout />
              Login
            </Link>
            <Link
              to={`/auth/register`}
              className={`flex items-center gap-2 text-xl text-secondary  border-b-2 border-primary w-full`}
              onClick={register}
            >
              <CiLogout />
              Register
            </Link>
          </>
        )}
      </div>

      {/* profile and logout  */}
      <Link
        to={`/profile/${user.username}`}
        className="flex flex-col sm:flex-row justify-between rounded-full bg-[#191e24] p-3"
      >
        <div className="flex flex-col justify-center h-full ml-1  ">
          <h2 className="text-secondary">{user.fullName}</h2>
          <p className="text-primary">@{user.username}</p>
        </div>
        <img
          src={user.profilePic}
          alt="profile-image"
          className="w-[50px] h-[50px] object-cover"
        />
      </Link>
    </div>
  );
};

export default NavBar;
