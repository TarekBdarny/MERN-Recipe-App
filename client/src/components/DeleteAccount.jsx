import React from "react";
import { useDeleteAccount } from "../context/DeleteAccountContext";
import { useUserContext } from "../context/UserContext";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MdOutlineGppGood } from "react-icons/md";

const DeleteAccount = () => {
  const { deleteAccount, setDeleteAccount } = useDeleteAccount();
  const { user, setUser } = useUserContext();
  const { logout } = useLogout("delete");
  const navigate = useNavigate();

  const handleDeleteUserAndPosts = async () => {
    try {
      await fetch(`http://localhost:3001/post/${user?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleDelete();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const handleDelete = async () => {
    try {
      setUser(null);
      await fetch(`http://localhost:3001/user/delete/${user.username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Account deleted successfully");
      await logout();
      setUser(null);
      window.localStorage.removeItem("logged-user");
      navigate("/login");
      setDeleteAccount(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col w-[450px] h-[250px] bg-[#191e24] rounded-lg p-4 shadow-lg shadow-black    text-secondary ">
      <h2 className="text-center">
        Are You Sure You Want To{" "}
        <span className="text-error text-md font-bold">Delete</span> You'r
        Account?
      </h2>
      <div className="flex items-end h-full justify-evenly mb-5 gap-3 ">
        <button
          className="bg-error w-[45%] flex justify-center items-center text-xl gap-2 h-[40px] rounded-lg text-secondary hover:bg-red-600 transition-all duration-200 hover:scale-110 "
          onClick={handleDeleteUserAndPosts}
        >
          <AiOutlineUserDelete />
          Delete
        </button>
        <button
          className="flex justify-center items-center p-3 bg-success  w-[50%] h-[40px] rounded-lg text-secondary hover:bg-green-600 transition-all duration-200 hover:scale-110"
          onClick={() => setDeleteAccount(false)}
        >
          <MdOutlineGppGood />
          Nah ... Another Time
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
