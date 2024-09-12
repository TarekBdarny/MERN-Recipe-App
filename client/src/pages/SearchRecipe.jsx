import { useState } from "react";
import { FaListOl } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiShoppingTag } from "react-icons/ci";
import toast from "react-hot-toast";

import UserDetailsSkele from "../skeletons/UserDetailsSkele";
import RecipePost from "../components/RecipePost";

const SearchRecipe = () => {
  const [type, setType] = useState("Tag");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [input, setInput] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (input === "") {
      toast.error("Enter a valid value");
      return;
    }
    console.log(input);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/post/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: input, type }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log(data);
      setSearchedPosts(data);
      // setInput("");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  return (
    <section className="flex flex-1 flex-col">
      <form className="flex mt-5 h-[50px] items-center gap-3">
        <label className="input input-bordered flex flex-1 items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <details
          className="dropdown"
          onClick={() => setButtonClicked((prev) => !prev)}
        >
          <summary
            className="btn m-1 min-w-[150px]"
            // onClick={() => setButtonClicked((prev) => !prev)}
          >
            {buttonClicked ? "Close" : "Search Via"}
            {!buttonClicked ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-lg">
            <li>
              <a className="flex justify-between p-3">
                Tag <CiShoppingTag />
              </a>
            </li>
            <li>
              <a className="flex justify-between p-3">
                Ingredients <FaListOl />{" "}
              </a>
            </li>
          </ul>
        </details>
        <button
          onClick={handleSearch}
          className="btn  btn-md bg-primary hover:bg-primary-hover text-secondary"
        >
          Search
        </button>
      </form>
      <div>
        {loading && searchedPosts && <UserDetailsSkele />}
        {!loading && searchedPosts.length === 0 && input !== "" && (
          <h1>
            {searchedPosts.length} Recipes Found For{" "}
            <span className="text-primary">{input}</span>
          </h1>
        )}
        {!loading && searchedPosts.length !== 0 && (
          <h1 className="text-center mx-auto">
            {searchedPosts.length} Results for{" "}
            <span className="text-primary">{input}</span>
          </h1>
        )}
        {!loading &&
          searchedPosts.length !== 0 &&
          searchedPosts.map((post) => (
            <RecipePost key={post?._id} post={post} />
          ))}
      </div>
    </section>
  );
};
export default SearchRecipe;
