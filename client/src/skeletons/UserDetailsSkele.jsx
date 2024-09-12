import React from "react";

const UserDetailsSkele = () => {
  return (
    <div className=" w-full mt-5 p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="skeleton h-20 w-20 rounded-full"></div>
          <div className="flex flex-col gap-3">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>

      <div className="mt-5">
        <div className="skeleton h-4 w-28 my-3"></div>
        <div className="skeleton h-4 w-96 my-3"></div>

        <div className="flex gap-3 justify-around w-full">
          <div className="flex flex-col gap-3">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="skeleton h-12 w-20 my-3"></div>
        <div className="skeleton h-12 w-20 my-3"></div>
        <div className="skeleton h-12 w-20 my-3"></div>
        <div className="skeleton h-12 w-20 my-3"></div>
      </div>
      <div className="skeleton h-2 w-full"></div>

      <div className="flex gap-3">
        <div className="skeleton h-8 w-10 my-3"></div>
        <div className="skeleton h-8 w-10 my-3"></div>
        <div className="skeleton h-8 w-10 my-3"></div>
        <div className="skeleton h-8 w-10 my-3"></div>
      </div>
    </div>
  );
};

export default UserDetailsSkele;

// <div className="skeleton h-4 w-20"></div> createdAt
// <div className="skeleton h-4 w-20"></div> title
// <div className="skeleton h-4 w-52"></div> description
