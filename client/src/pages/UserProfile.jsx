import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Image from "../components/Image";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipePost from "../components/RecipePost";
import useAllPosts from "../hooks/useAllPosts";
import UserDetailsSkele from "../skeletons/UserDetailsSkele";
// import useAllPosts from "../hooks/useAllPosts";
import { useParams } from "react-router-dom";
import { usePostContext } from "../context/PostContext";
function UserProfile() {
  const [user, setUser] = useState({});
  const [type, setType] = useState(
    window.localStorage.getItem("user-type") || "myPosts"
  );
  const [userPosts, setUserPosts] = useState([]);

  const { posts, setPosts } = usePostContext();
  const { user: loggedUser } = useUserContext();
  const { username } = useParams();
  const { loading, getAllPosts } = useAllPosts(type);

  const handleDateFormat = (date) => {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", options);
  };

  // user information
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3001/user/${username}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserDetails();
  }, [username, type]);

  const handleType = (type) => {
    setType(type);
    window.localStorage.setItem("user-type", type);
  };
  // posts information
  useEffect(() => {
    const getData = async () => {
      const data = await getAllPosts();
      console.log(data);
      setUserPosts(data);
    };

    getData();
  }, [username, type]);

  const createDate = handleDateFormat(user?.createdAt);
  const formattedDate =
    createDate.split(",")[1] + "-" + createDate.split(", ")[2];

  return (
    <section className="flex justify-center flex-1 min-h-1/2 ">
      <div className="w-full bg-black mt-3 flex flex-col gap-14">
        <div className="relative h-[350px]">
          <img
            src={`../public/background.jpg`}
            className="w-full h-full object-cover opacity-80"
            alt=""
          />
          <img
            src={`${user?.profilePic}`}
            alt=""
            className="w-[110px] h-[110px] rounded-full absolute bottom-[-50px] left-10 border-[5px] border-primary"
          />
          {username === loggedUser?.username && (
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg absolute top-2 right-2 rounded-full text-primary bg-[#212830] border-solid border-secondary border-2">
              Edit Profile
            </button>
          )}
        </div>
        <div className="mt-5 text-xl text-secondary p-4 ">
          <div className="flex gap-4">
            <p className="text-2xl">{user?.fullName}</p>
            <p className="text-primary opacity-85">@{user?.username}</p>
          </div>
          <p>Bio</p>
          <p>Born At 30/10/2003</p>
          <p className="text-[15px]">Member Since: {formattedDate}</p>
          <div className="w-full bg-[#212830] h-[100px] mt-5 flex justify-around items-center rounded-xl ">
            <button
              onClick={() => handleType("myPosts")}
              className={`w-1/2 h-full hover:bg-primary-hover ${
                type === "myPosts" && "bg-primary-hover rounded-md"
              } transition-all duration-300 hover:rounded-md hover:underline underline-offset-4`}
            >
              My Posts
            </button>

            <button
              onClick={() => handleType("savedPosts")}
              className={`w-1/2 h-full hover:bg-primary-hover ${
                type === "savedPosts" && "bg-primary-hover rounded-md"
              } transition-all duration-300 hover:rounded-md hover:underline underline-offset-4`}
            >
              Saved Posts
            </button>
          </div>
        </div>

        {loading && <UserDetailsSkele />}
        {!loading && type === "savedPosts" && userPosts.length === 0 && (
          <div className="flex justify-center text-2xl">
            <p>No saved posts</p>
          </div>
        )}
        {loading && !userPosts && <UserDetailsSkele />}
        <div className="p-2">
          {userPosts &&
            !loading &&
            type === "myPosts" &&
            userPosts.length !== 0 &&
            userPosts?.map((post) => (
              <RecipePost key={post?._id} post={post} />
            ))}
        </div>
        <div className="p-2">
          {userPosts &&
            !loading &&
            type === "savedPosts" &&
            userPosts.length !== 0 &&
            userPosts?.map((post) => (
              <RecipePost key={post?._id} post={post} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
