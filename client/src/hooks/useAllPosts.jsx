import React, { useState } from "react";
import toast from "react-hot-toast";
import { usePostContext } from "../context/PostContext";

import { useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
const useAllPosts = (type) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();
  const { username } = useParams();
  const { posts, setPosts } = usePostContext();
  const getEndPoint = () => {
    switch (type) {
      case "forYou":
        return `http://localhost:3001/post/all`;
      case "liked":
        return `http://localhost:3001/post/liked/${user?._id}`;
      case "myPosts":
        return `http://localhost:3001/post/${username}`;
      case "savedPosts":
        return `http://localhost:3001/post/saved/${user?._id}`;
      default:
        return `http://localhost:3001/post/all`;
    }
  };
  const endPoint = getEndPoint();
  const getAllPosts = async () => {
    try {
      setLoading(true);
      // if (!posts) {
      //   setLoading(false);
      //   return;
      // }
      const res = await fetch(endPoint);
      if (!res.ok) {
        // toast.error(data.message);
        setLoading(false);
        // console.log(data.message);
        return [];
      }
      const data = await res.json();

      console.log(data);
      setLoading(false);
      setPosts(data);
      window.localStorage.setItem("posts", JSON.stringify(data));
      return data;
    } catch (error) {
      setLoading(false);

      console.log(error.message);
      toast.error(error.message);
    }
  };
  return { loading, getAllPosts };
};

export default useAllPosts;
