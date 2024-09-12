import React from "react";
import { Link } from "react-router-dom";
import { useDeleteAccount } from "../context/DeleteAccountContext";

function ProfileLink({ link, text, icon, func }) {
  const { deleteAccount, setDeleteAccount } = useDeleteAccount();

  return (
    <Link
      to={link}
      className={`flex items-center gap-2 text-xl text-secondary  border-b-2 border-primary w-full`}
      onClick={func !== "" ? func : () => setDeleteAccount(!deleteAccount)}
    >
      {icon}
      {text}
    </Link>
  );
}

export default ProfileLink;
