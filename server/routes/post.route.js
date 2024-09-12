import express from "express";
import {
  createPost,
  deletePost,
  deletePostsForDeletedUser,
  getAllPosts,
  getLikedPosts,
  getMostLikedPosts,
  getSavedPosts,
  getUserPosts,
  likeUnLikePost,
  saveUnSavePost,
  searchPostByTag,
  updatePost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/all", getAllPosts); //v
router.get("/liked/:id", getLikedPosts);
router.get("/:username", getUserPosts); //V
router.get("/mostPopular", getMostLikedPosts);
router.get("/saved/:id", getSavedPosts);
router.post("/search", searchPostByTag);
router.post("/:id", createPost); //v
router.post("/likeUnLike/:id", likeUnLikePost); //v
router.post("/saveUnSave/:id", saveUnSavePost); //v
router.delete("/:id", deletePostsForDeletedUser);
router.delete("/delete/:id", deletePost);
router.patch("/:id", updatePost); // V

export { router as postRouter };
