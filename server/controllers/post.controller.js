import mongoose from "mongoose";
import userModel from "../db/models/User.model.js";
import postModel from "../db/models/Post.model.js";

export const createPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, tags, title, ingredients, instructions } = req.body;

    const user = await userModel.findById(id);

    if (!user) return res.status(404).json({ message: "User Not Found!" });

    const newPost = new postModel({
      publisherID: id,
      description,
      tags,
      ingredients,
      instructions,
      title,
      likes: [],
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log("Error in create post controller: ", error.message);
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params; // user name
    const user = await userModel.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await postModel
      .find({ publisherID: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "publisherID",
        select: "-password",
      });
    if (posts.length === 0) return res.status(200).json([]);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
    console.log("Error in getPost controller: ", error.message);
  }
};
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const post = await postModel.findOneAndUpdate({ publisherID: id });
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.description = description || post.description;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in updatePost controller: ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params; // post id
    console.log(id);
    const post = await postModel.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: "Post Not Found!" });
    res.status(200).json({ message: "Post got deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
    console.log("Error in deletePost controller: ", error.message);
  }
};

// get all the posts in the database to show it in the posts page
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find({}).sort({ createdAt: -1 }).populate({
      path: "publisherID",
      select: "-password",
    });

    if (posts.length === 0) return res.status(200).json([]);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in the getAllPostsController: ", error.message);
  }
};
export const deletePostsForDeletedUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const posts = await postModel.deleteMany({ publisherID: user._id });
    console.log(posts);
    res.status(200).json({ message: "Posts got deleted!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const likeUnLikePost = async (req, res) => {
  try {
    const { id } = req.params; // the post id
    const { id: userId } = req.body;

    const post = await postModel.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(userId)) {
      // if the user already liked the post
      await postModel.updateOne({ _id: id }, { $pull: { likes: userId } });
      await userModel.updateOne({ _id: userId }, { $pull: { likedPosts: id } });
      res.status(200);
    } else {
      post.likes.push(userId);
      await userModel.updateOne({ _id: userId }, { $push: { likedPosts: id } });

      await post.save();
    }

    res.status(200);
  } catch (error) {
    console.log("Error in likeUnLikePost controller", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const saveUnSavePost = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { id: postId } = req.body;
    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.saves.includes(userId)) {
      // if the user already saved the post
      await postModel.updateOne({ _id: postId }, { $pull: { saves: userId } });

      await userModel.updateOne(
        { _id: userId },
        { $pull: { savedPosts: postId } }
      );
      res.status(200);
    } else {
      post.saves.push(userId);
      await userModel.updateOne(
        { _id: userId },
        { $push: { savedPosts: postId } }
      );
      await post.save();
    }

    res.status(200);
  } catch (error) {
    console.log("Error in saveUnSavePost controller", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getLikedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const likedPosts = await postModel
      .find({ _id: { $in: user.likedPosts } })
      .populate({
        path: "publisherID",
        select: "-password",
      });
    res.status(200).json(likedPosts);
  } catch (error) {
    console.log("Error in getLikedPosts controller", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getSavedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const savedPosts = await postModel
      .find({ _id: { $in: user.savedPosts } })
      .populate({
        path: "publisherID",
        select: "-password",
      });
    res.status(200).json(savedPosts);
  } catch (error) {
    console.log("Error in getSavedPosts controller", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getMostLikedPosts = async (req, res) => {
  try {
    const posts = await postModel.aggregate([
      { $unwind: "$likes" },
      { $group: { _id: "$likes", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "users",
          localField: "publisherID",
          foreignField: "_id",
          as: "User",
        },
      },
    ]);
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getMostLikedPosts controller", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const searchPostByTag = async (req, res) => {
  try {
    const { value, type } = req.body;
    const posts = await postModel
      .find({ tags: { $in: [value] } })
      .sort({ likes: -1 })
      .populate({
        path: "publisherID",
        select: "-password",
      });
    console.log(posts);
    res.status(200).json(posts);
    if (type === "tag") {
    }
  } catch (error) {}
};
