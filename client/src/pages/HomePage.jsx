import React, { useEffect, useState } from "react";
import RecipePost from "../components/RecipePost";
import useAllPosts from "../hooks/useAllPosts";
import { usePostContext } from "../context/PostContext";

import LoadingSpinner from "../components/LoadingSpinner";
import UserDetailsSkele from "../skeletons/UserDetailsSkele";
import { Link } from "react-router-dom";
function HomePage() {
  const [type, setType] = useState(
    window.localStorage.getItem("type") || "forYou"
  );
  const { loading, getAllPosts } = useAllPosts(type);
  const { setPosts, posts } = usePostContext();

  const handleType = (type) => {
    setType(type);
    window.localStorage.setItem("type", type);
  };
  useEffect(() => {
    const getPosts = async () => {
      const data = await getAllPosts();
      // window.localStorage.setItem("posts", JSON.stringify(data));
      setPosts(data);
    };
    getPosts();
  }, [type]);

  useEffect(() => {
    console.log(type);
  }, [type]);
  return (
    posts && (
      <div className="flex-1 flex flex-col items-center text-secondary ">
        <div className="flex w-1/2 bg-[#171b21] justify-evenly items-center rounded-lg h-[40px]">
          <button
            onClick={() => handleType("forYou")}
            className={`curser-pointer${
              type === "forYou" && " bg-primary"
            } hover:bg-primary-hover h-full w-1/2 transition-all rounded-sm duration-300`}
          >
            For You
          </button>
          <p className="h-full bg-secondary w-[3px]"></p>
          <button
            onClick={() => handleType("liked")}
            className={`curser-pointer${
              type === "liked" && " bg-primary"
            } hover:bg-primary-hover h-full w-1/2 transition-all rounded-sm duration-300`}
          >
            Liked
          </button>
        </div>
        {loading && <UserDetailsSkele />}
        {!loading && type === "liked" && posts.length === 0 && (
          <h1 className="my-10">
            No liked posts Found{" "}
            <Link
              to={"/"}
              className="text-primary hover:underline underline-offset-4"
              onClick={() => handleType("forYou")}
            >
              Like one
            </Link>{" "}
          </h1>
        )}
        {!loading && type === "forYou" && posts.length === 0 && (
          <h1 className="my-10">
            No posts Found{" "}
            <Link
              to={"/post/create"}
              className="text-primary hover:underline underline-offset-4"
            >
              Create One
            </Link>{" "}
          </h1>
        )}
        {!loading &&
          posts?.length !== 0 &&
          posts.map((post) => <RecipePost key={post._id} post={post} />)}
      </div>
    )
  );
}

export default HomePage;

// {!loading && posts.length !== 0 ? (
//   posts.map((post) => (
//     <div key={post._id}> {post.publisherID.username} </div>
//   ))
// ) : !loading ? (
//   <h1>No posts Found</h1>
// ) : (
//   <LoadingSpinner />
// )}
