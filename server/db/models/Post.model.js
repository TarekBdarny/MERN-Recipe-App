import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    publisherID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    tags: {
      type: [],
      required: true,
    },
    instructions: {
      type: [],
      required: true,
    },
    ingredients: {
      type: [],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const postModel = mongoose.model("Post", postSchema);
export default postModel;
