import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiShoppingTag, CiCircleList } from "react-icons/ci";
import { FaListOl } from "react-icons/fa6";
import { useUserContext } from "../context/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { usePostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import Tag from "../components/Tag";
function CreateRecipePage() {
  const [content, setContent] = useState({
    description: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [inputs, setInputs] = useState({
    instruction: "",
    ingredient: "",
  });
  const { user } = useUserContext();
  const { posts, setPosts } = usePostContext();

  const navigate = useNavigate();
  const handleTextArea = (e) => {
    // if (content.length == 200) return;
    if (e.target.value.length > 200) return;
    setContent({ ...content, description: e.target.value });
  };

  const addTag = (e) => {
    e.preventDefault();
    if (content.tags.length >= 5) {
      toast.error("Maximum 5 tags allowed");
      setTagInput("");

      return;
    }
    if (tagInput === "") {
      toast.error("enter valid tag");
      return;
    }
    setContent({ ...content, tags: [...content.tags, `${tagInput}`] });
    setTagInput("");
    console.log(content.tags);
  };
  const addInstruction = (e) => {
    e.preventDefault();
    if (inputs.instruction === "") {
      toast.error("Instruction cannot be empty");
      return;
    }
    setInstructions([...instructions, inputs.instruction]);
    setInputs({ ...inputs, instruction: "" });
  };
  const addIngredient = (e) => {
    e.preventDefault();
    if (inputs.ingredient === "") {
      toast.error("Instruction cannot be empty");
      return;
    }
    setIngredients([...ingredients, inputs.ingredient]);
    setInputs({ ...inputs, ingredient: "" });
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    if (recipeTitle === "") {
      toast.error("Please enter title");
      return;
    }
    if (ingredients.length === 0) {
      toast.error("Enter At least One ingredient");
      return;
    }
    if (instructions.length === 0) {
      toast.error("Enter At least One instruction");
      return;
    }
    if (content.tags.length === 0) {
      toast.error("Please enter At least One tag");
      return;
    }
    if (content.description.length == 0) {
      toast.error("Please enter post content");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/post/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: content.description,
          tags: content.tags,
          title: recipeTitle,
          instructions,
          ingredients,
        }),
      });
      if (!res.ok) throw new console.error("Error in creating recipe");
      const data = await res.json();
      toast.success("Recipe created successfully");
      setLoading(false);
      setContent("");
      setPosts([...posts, data]);
      // window.localStorage.setItem("posts", JSON.stringify([...posts, data]));
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex w-[600px]  flex-col text-secondary mt-4">
      <p>Create A Recipe</p>
      <form className="flex flex-col gap-3 bg-[#212830] h-full w-full p-4">
        <label className="input input-bordered flex items-center gap-2 w-3/4 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501m4.501-8.627 2.25-1.5v10.126m0 0h-2.25m2.25 0h2.25"
            />
          </svg>
          <input
            type="text"
            className="grow"
            value={recipeTitle}
            placeholder="Recipe Title"
            onChange={({ target }) => setRecipeTitle(target.value)}
          />
        </label>
        {/* Instructions */}
        <label className="input input-bordered flex items-center gap-2 w-3/4 relative">
          <CiCircleList />
          <input
            type="text"
            className="grow"
            value={inputs.instruction}
            placeholder="Add Instructions"
            onChange={({ target }) =>
              setInputs({ ...inputs, instruction: target.value })
            }
          />
          <button
            onClick={addInstruction}
            className="h-full w-[50px] hover:bg-primary-hover hover:underline hover:underline-offset-4 absolute right-0 rounded-md transition-all duration-300"
          >
            Add
          </button>
        </label>
        <ol className="flex flex-col text-lg p-4 w-[300px] ">
          <p>Recipe Instructions: </p>

          {instructions.length === 0 ? (
            <p>No instructions</p>
          ) : (
            instructions.length > 0 &&
            instructions.map((instruction, index) => (
              <li key={index} className="break-words">
                <span className="text-primary">{index + 1}. </span>
                {instruction}
              </li>
            ))
          )}
        </ol>
        {/* Ingredients */}
        <label className="input input-bordered flex items-center gap-2 w-3/4 relative">
          <FaListOl />
          <input
            type="text"
            className="grow"
            value={inputs.ingredient}
            placeholder="Add Ingredients"
            onChange={({ target }) =>
              setInputs({ ...inputs, ingredient: target.value })
            }
          />
          <button
            onClick={addIngredient}
            className="h-full w-[50px] hover:bg-primary-hover hover:underline hover:underline-offset-4 absolute right-0 rounded-md transition-all duration-300"
          >
            Add
          </button>
        </label>
        <ol className="flex flex-col text-lg p-4 w-[300px] ">
          <p>Recipe Ingredients: </p>

          {ingredients.length === 0 ? (
            <p>No ingredients</p>
          ) : (
            ingredients.length > 0 &&
            ingredients.map((ingredient, index) => (
              <li key={index} className="break-words">
                <span className="text-primary">{index + 1}. </span>
                {ingredient}
              </li>
            ))
          )}
        </ol>
        <label className="input input-bordered flex items-center gap-2 w-3/4 relative">
          <CiShoppingTag />
          <input
            type="text"
            className="grow"
            value={tagInput}
            placeholder="Add Tags"
            onChange={({ target }) => setTagInput(target.value)}
          />

          <button
            onClick={addTag}
            className="h-full w-[50px] hover:bg-primary-hover hover:underline hover:underline-offset-4 absolute right-0 rounded-md transition-all duration-300"
          >
            Add
          </button>
        </label>
        <div className="flex flex-row gap-4 text-lg items-center flex-wrap">
          Tags:{" "}
          {content.tags?.length === 0 ? (
            <p>No tags to add</p>
          ) : (
            content.tags.length !== 0 &&
            content.tags?.map((tag, index) => <Tag key={tag} tag={tag} />)
          )}
        </div>
        <div className="relative w-1/2">
          <textarea
            placeholder="Post Description"
            rows={8}
            cols={8}
            value={content.description}
            onChange={handleTextArea}
            className="textarea textarea-bordered  w-full max-w-xs resize-none text-xl"
          ></textarea>
          <p
            className={` absolute bottom-2 right-2 ${
              200 - content.length == 0 ? "text-error" : "text-green-400"
            }`}
          >
            letters left:{" "}
            <span className="text-primary">
              {200 - content.description.length}
            </span>
          </p>
        </div>
        {/* <div className="flex flex-col gap-2">
          <p>Images Preview</p>
          <div className="flex gap-2">
            <img
              src="../public/icon.png"
              alt=""
              className="w-[100px] h-[100px]"
            />
            <img
              src="../public/icon.png"
              alt=""
              className="w-[100px] h-[100px]"
            />
          </div>
        </div>
        <input type="file" accept="image/*" /> */}
        <button
          onClick={handleCreate}
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-secondary mt-4 bg-primary hover:bg-primary-hover transition-all duration-300"
        >
          {loading ? <LoadingSpinner /> : "Create Recipe"}
        </button>
      </form>
    </div>
  );
}

export default CreateRecipePage;
