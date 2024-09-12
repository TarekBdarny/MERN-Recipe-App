import React, { useEffect, useState } from "react";
import { usePostContext } from "../context/PostContext";
import { useUserContext } from "../context/UserContext";
import { formatPostDate } from "../date/index.js";
import useAllPosts from "../hooks/useAllPosts";

import { CiHeart, CiEdit, CiTrash } from "react-icons/ci";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Tag from "./Tag";
function RecipePost({ post: rendedPost }) {
  const { getAllPosts } = useAllPosts();
  const { user } = useUserContext();
  const { posts, setPosts } = usePostContext();

  const [likes, setLikes] = useState(rendedPost?.likes?.length);
  const [liked, setLiked] = useState(rendedPost?.likes?.includes(user._id));
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(rendedPost?.saves?.includes(user._id));
  const [formattedDate, setFormattedDate] = useState("");
  // const handleDateFormat = (date) => {
  //   var options = {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   };
  //   var newDate = new Date(date);
  //   return newDate.toLocaleDateString("en-US", options);
  // };
  // const createDate = handleDateFormat(rendedPost?.createdAt);
  // const formattedDate = createDate.split(",")[1];
  const handleDateFormat = (date) => {
    const d = new Date(date);
    const now = new Date();
    if (d.getFullYear() - now.getFullYear() > 0) {
    }
    let res = now.getDate() - d.getDate();
    console.log(res);
    return res;
  };
  const handleDelete = async () => {
    // console.log(id);
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3001/post/delete/${rendedPost._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
        throw new Error(data.message);
      }
      toast.success("Post deleted successfully");
      setPosts(posts.filter((post) => post._id !== rendedPost._id));
      setLoading(true);
      location.reload(true);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    setFormattedDate(formatPostDate(rendedPost?.createdAt));
  });
  const handleLike = async () => {
    setLikes(!liked ? likes + 1 : likes - 1);
    setLiked(!liked);
    try {
      await fetch(`http://localhost:3001/post/likeUnLike/${rendedPost._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user?._id }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSave = async () => {
    setSaved(!saved);
    try {
      await fetch(`http://localhost:3001/post/saveUnSave/${user?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: rendedPost?._id }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="  p-4 w-full min-h-[200px] bg-[#212830] text-secondary mt-2 rounded-lg flex flex-col justify-between ">
      <div className="flex items-center gap-3 justify-between ">
        <div className="flex gap-2 items-center">
          <Link to={`/profile/${rendedPost.publisherID.username}`}>
            <img
              src={`${rendedPost.publisherID.profilePic}`}
              alt="Profile image"
              className="w-[66px] h-[66px] object-cover border-4 border-solid border-primary rounded-full p-[0.5px]"
            />
          </Link>
          {/* Profile Image ^^ */}
          <div className="text-lg">
            <p>{rendedPost.publisherID.fullName}</p>
            <Link
              to={`/profile/${rendedPost.publisherID.username}`}
              className="text-primary"
            >
              @{rendedPost.publisherID.username}
            </Link>
          </div>
        </div>
        <div className="opacity-90">
          <p>Created {formattedDate}</p>
        </div>
      </div>
      <div className="my-5 flex flex-col gap-4 w-[500px] ">
        <h1 className="text-2xl font-extrabold ml-3">{rendedPost?.title}</h1>
        <p className="break-words">{rendedPost?.description}</p>
      </div>
      <div className="flex w-full justify-around my-5">
        <div>
          <p className="text-xl underline underline-offset-8">Ingredients:</p>
          <ol className="my-3">
            {rendedPost?.ingredients?.map((ingredient, index) => (
              <li key={index}>
                <span className="text-primary">{index + 1}.</span>
                {ingredient}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="text-xl underline underline-offset-8">Instructions:</p>
          <ol className="my-3">
            {rendedPost?.instructions?.map((instruction, index) => (
              <li key={index}>
                <span className="text-primary">{index + 1}.</span>
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="flex gap-4 my-5">
        {rendedPost?.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
      <hr className=" my-1" />
      <div className=" flex items-center text-3xl gap-10 mt-1 ">
        <div className="flex gap-2 items-center">
          <div
            className={`tooltip  flex gap-2 justify-center items-center ${
              liked && "text-red-500"
            }`}
            data-tip={`${liked ? "Unlike" : "Like"}`}
          >
            {liked ? (
              <IoIosHeart
                className={` cursor-pointer text-red-500 `}
                onClick={() => handleLike()}
              />
            ) : (
              <CiHeart
                className={` cursor-pointer `}
                onClick={() => handleLike()}
              />
            )}

            {likes}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="tooltip" data-tip={`${saved ? "unSave" : "Save"}`}>
            {!saved ? (
              <IoBookmarkOutline
                className={`cursor-pointer ${
                  !saved ? "text-secondary" : "fill-green-400"
                }`}
                onClick={() => handleSave()}
              />
            ) : (
              <IoBookmark
                className={`cursor-pointer `}
                onClick={() => handleSave()}
              />
            )}
          </div>
          {/* <div className="tooltip" data-tip="unMark">
            <IoBookmark
              className={`cursor-pointer `}
              onClick={() => handleSave()}
            />
          </div> */}
        </div>
        <div className="flex  cursor-pointer">
          {rendedPost.publisherID.username === user?.username && (
            <div className="tooltip" data-tip="Edit">
              <CiEdit className="text-secondary hover:text-gray-500" />
            </div>
          )}
        </div>
        <div className="flex  cursor-pointer">
          {rendedPost.publisherID.username === user?.username && (
            <div className="tooltip text-secondary" data-tip="Delete">
              <CiTrash
                onClick={handleDelete}
                className="hover:text-red-400 duration-300 transition-all"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipePost;
