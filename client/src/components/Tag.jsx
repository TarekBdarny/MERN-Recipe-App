import React from "react";
import { CiShoppingTag } from "react-icons/ci";

const Tag = ({ tag }) => {
  return (
    <p className="p-2 bg-primary hover:bg-primary-hover rounded-lg scale-110 cursor-pointer transition-all duration-300 text-xl flex justify-center items-center gap-2">
      <CiShoppingTag />
      {tag}
    </p>
  );
};

export default Tag;
