import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin({ username, password }) {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const login = async () => {
    setLoading(true);

    const success = checkInputs({ username, password });
    if (!success) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
        return;
      } else toast.success("Logged in successfully");
      setUser(data);
      window.localStorage.setItem("logged-user", JSON.stringify(data));
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
    }
  };
  return { loading, login };
}

export default useLogin;

const checkInputs = ({ username, password }) => {
  if (!username || !password) {
    toast.error("all inputs fields are required");
    return false;
  }
  if (password.length < 6) {
    toast.error("password must be at least 6 characters");
    return false;
  }
  return true;
};
