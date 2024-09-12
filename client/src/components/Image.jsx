import React from "react";

function Image({ type }) {
  return type === "profile" ? (
    <div className="border-4 border-solid border-[#eeeeee] overflow-hidden w-[65px] h-[65px] rounded-full flex justify-center items-center absolute bottom-[-30px] left-3">
      <img
        src="../public/user.jpg"
        alt="profile"
        className="w-[60px] h-[60px]  rounded-full "
      />
    </div>
  ) : type === "cover" ? (
    <div className="w-[600px] h-[250px]">
      <img
        src="../public/background.jpg"
        alt="background"
        className="w-full h-full"
      />
    </div>
  ) : (
    <img src="../public/user.jpg" alt="post-user-image" />
  );
}

export default Image;
