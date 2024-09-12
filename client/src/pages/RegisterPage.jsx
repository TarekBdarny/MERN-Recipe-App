import React, { useState } from "react";
import Image from "../components/Image";
import { CiUser } from "react-icons/ci";
import { PiPassword } from "react-icons/pi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import GenderSelect from "../components/GenderSelect";
import { Link, useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
function RegisterPage() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
  });
  const { loading, register } = useRegister(inputs);
  const navigate = useNavigate();

  // const [errMsg, setErrMsg] = useState("");

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      register();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-full gap-5 ">
      <img src="../public/icon.png" alt="" className="w-[300px] h-[300px]" />
      <form
        className="flex flex-col gap-3 w-[400px] text-secondary "
        onSubmit={handleSubmit}
      >
        <h1 className="text-primary text-left text-3xl">Register page</h1>
        <label className="input input-bordered flex items-center gap-2">
          <IoIosPerson />

          <input
            type="text"
            className="grow"
            placeholder="Full Name"
            value={inputs.fullName}
            name="fullName"
            onChange={handleInputs}
          />
        </label>
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
            placeholder="Password"
            name="password"
            value={inputs.password}
            onChange={handleInputs}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <PiPassword />
          <input
            type="password"
            className="grow"
            value={inputs.confirmPassword}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleInputs}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IoCalendarNumberOutline />

          <input
            type="number"
            className="grow"
            // value=""
            name="age"
            value={inputs.age}
            placeholder="Your Age"
            onChange={handleInputs}
          />
        </label>
        <div className="flex justify-center items-center gap-3 w-full">
          <label htmlFor="radio-1">Male</label>
          <input
            type="radio"
            id="radio-1"
            className="radio"
            name="gender"
            value="male"
            onChange={handleInputs}
            checked={inputs.gender === "male"}
          />
          <label htmlFor="radio-2">Female</label>
          <input
            type="radio"
            id="radio-2"
            className="radio"
            name="gender"
            value="female"
            onChange={handleInputs}
            checked={inputs.gender === "female"}
          />
        </div>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-primary hover:bg-primary-hover text-secondary">
          {loading ? <LoadingSpinner /> : "Register"}
        </button>
        <Link to={"/login"} className="hover:text-secondary">
          Already Have an Account? <span className="text-primary">Login</span>
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
