import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { checkInputs } from "./index.js";
function useRegister({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
  age,
}) {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const register = async () => {
    const success = checkInputs({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
      age,
    });
    if (!success) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          confirmPassword,
          password,
          gender,
          age,
        }),
      });
      const data = await res.json();
      if (data.message) toast.error(data.message);
      else toast.success("Registered successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
    }
  };
  return { loading, register };
}

export default useRegister;

const checkInputs = ({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
  age,
}) => {
  if (
    !fullName ||
    !username ||
    !password ||
    !confirmPassword ||
    !gender ||
    !age
  ) {
    toast.error("all fields are  required");
    return false;
  }
  if (password.length < 6) {
    toast.error("password must be at least 6 characters");
    return false;
  }
  if (confirmPassword.length < 6) {
    toast.error("confirm password must be at least 6 characters");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords don't match");
    return false;
  }
  return true;
};
