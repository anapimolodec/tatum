import React, { useState } from "react";
import {
  GridIcon,
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@radix-ui/react-icons";
import { navStore } from "../store/navStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const setPage = navStore((state) => state.setPage);
  const currentPage = navStore((state) => state.currentPage);

  const menuItems = [
    {
      icon: <GridIcon className="stroke-white stroke-1" />,
      title: "Users",
      page: "users",
    },
    {
      icon: <CalendarIcon className="stroke-white stroke-1" />,
      title: "Tasks",
      page: "tasks",
    },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-teal-700 min-h-screen p-4 pt-8 relative duration-300`}
    >
      <button
        className="absolute -right-4 top-9 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer border-2 border-teal-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronLeftIcon className="text-teal-700 stroke-1 stroke-teal-700" />
        ) : (
          <ChevronRightIcon className="text-teal-700 stroke-1 stroke-teal-700" />
        )}
      </button>

      <div className="flex flex-col gap-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setPage(item.page)}
            className={`
              flex items-center gap-2 text-white cursor-pointer px-2 h-10 rounded-md
              ${!isOpen ? "justify-center" : ""}
              ${currentPage === item.page ? "bg-teal-800" : "hover:bg-teal-800"}
            `}
          >
            <div className="flex items-center justify-center w-6 h-6">
              {item.icon}
            </div>
            <span
              className={`${
                !isOpen && "hidden"
              } origin-left duration-300 text-base font-bold`}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
