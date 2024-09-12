import mongoose from "mongoose";
import userModel from "../db/models/User.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/jwtAndSetCookies.js";
export const register = async (req, res) => {
  const { fullName, username, password, confirmPassword, gender, age } =
    req.body;

  try {
    const user = await userModel.findOne({ username });

    if (user) return res.status(400).json({ message: "User already exists" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    if (age < 18)
      return res
        .status(400)
        .json({ message: "You must be at least 18 years old" });
    // __dirname +
    const malePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femalePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    //hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      fullName,
      username,
      password: passwordHash,
      gender,
      age,
      profilePic: gender === "male" ? malePhoto : femalePhoto,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
    }

    res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      gender: newUser.gender,
      age: newUser.age,
      profilePic: newUser.profilePic,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      __v: newUser.__v,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log("Error in register controller: ", error.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });

    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!isMatch || !user)
      return res.status(400).json({ message: "Invalid username or password" });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      gender: user.gender,
      age: user.age,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log("Error in login controller: ", error.message);
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
