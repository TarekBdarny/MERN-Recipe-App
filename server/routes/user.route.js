import express from "express";
import {
  deleteUser,
  getUserDetails,
  updateUser,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.patch("/update/:user", protectRoute, updateUser);
router.delete("/delete/:username", deleteUser);
router.get("/:username", getUserDetails);

export { router as userRouter };
