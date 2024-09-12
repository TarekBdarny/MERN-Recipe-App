import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { PiPassword } from "react-icons/pi";
import { Link } from "react-router-dom";
import useAllPosts from "../hooks/useAllPosts";

function LoginPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { loading, login } = useLogin(inputs);

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-full gap-5 ">
      <img
        src="../public/icon.png"
        alt="logo"
        className="w-[300px] h-[300px]"
      />
      <form
        className="flex flex-col gap-3 w-[400px] text-secondary "
        onSubmit={handleSubmit}
      >
        <h1 className="text-primary">Login Page</h1>
        <label className="input input-bordered flex items-center gap-2">
          <CiUser />

          <input
            type="text"
            className="grow"
            name="username"
            value={inputs.username}
            placeholder="Username"
            onChange={handleInputs}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <PiPassword />
          <input
            type="password"
            className="grow"
            value={inputs.password}
            name="password"
            placeholder="Enter You're Password"
            onChange={handleInputs}
          />
        </label>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-primary hover:bg-primary-hover text-secondary">
          {loading ? <LoadingSpinner /> : "Login"}
        </button>
        <Link to={"/register"} className="hover:text-secondary">
          Don't have an account?{" "}
          <span className="text-primary">Register now!</span>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
