import React from "react";
import { IconButton } from "@radix-ui/themes";
import { PersonIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useStore } from "../store/useStore";

const Header = ({ user, currentPage }) => {
  const logout = useStore((state) => state.logout);
  //TODO: add logout function
  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-4">
        {currentPage === "users" ? "User List" : "Task List"}
      </h1>
      <div className="flex gap-2 items-center text-blue-600 font-bold text-sm">
        <span>{user.userName}</span>
        <span>{user.userRole}</span>

        <IconButton variant="ghost">
          <ChevronDownIcon />
        </IconButton>
        <PersonIcon className="ml-4" />
      </div>
    </nav>
  );
};

export default Header;
