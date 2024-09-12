import userModel from "../db/models/User.model.js";
import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized: No Token Provided" });

    const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyUser) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const user = userModel.findById(verifyUser.userID).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(404).json({ message: "User not found" });
  }
};
