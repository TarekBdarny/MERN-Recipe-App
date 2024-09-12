import React, { useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function useLogout(type) {
  const [loading, setLoading] = useState();
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else if (type !== "delete") toast.success("Logout successfully");
      setUser(null);
      window.localStorage.removeItem("logged-user");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { loading, logout };
}

export default useLogout;
