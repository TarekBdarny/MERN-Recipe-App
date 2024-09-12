import mongoose from "mongoose";
import userModel from "../db/models/User.model.js";
import bcrypt from "bcrypt";
export const updateUser = async (req, res) => {
  try {
    const { user: userToUpdate } = req.params; // user who wants to update
    const { username, fullName, password } = req.body; // username the new username
    const user = await userModel.findOneAndUpdate({ username: userToUpdate });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    let userName = "";
    if (username !== user.username) {
      const thereIsUser = await userModel.findOne({ username });
      if (thereIsUser)
        return res.status(400).json({ message: "username already in use" });
      else {
        userName = username;
      }
    }

    const passwordsMatch = await bcrypt.compare(user.password, password);
    let pass = "";

    if (!passwordsMatch) {
      pass = await bcrypt.hash(password, 10);
    }
    user.fullName = fullName || user.fullName;
    user.username = userName || user.username;
    user.password = password ? pass : user.password;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUser controller", error.message);
    res.status(500).json("Something went wrong");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userModel.findOneAndDelete({ username });
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.status(200).json({ message: "User got deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
    console.log("Error in deleteUser controller: ", error.message);
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userModel.findOne({ username }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.status(200).json(user);
  } catch (error) {}
};
