import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserAdminDropDown = ({ heading, subData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const formatName = (name) => {
    if (name.indexOf("-") !== -1) {
      return name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <ul className="my-2 text-xs">
      <li>
        <button
          onClick={toggleMenu}
          className={`font-semibold flex items-center justify-between w-full my-2 px-3 py-1 cursor-pointer ${
            isOpen
              ? "bg-blue-600 text-white rounded-md"
              : "hover:bg-blue-600 hover:text-white hover:rounded-md"
          }`}
        >
          {formatName(heading)}
          <span
            className={`inline-block text-xl transition-transform ${
              isOpen ? "rotate-0" : "rotate-[-45deg]"
            }`}
          >
            &#8735;
          </span>
        </button>
        <ul
          className={`w-[95%] text-xs transition-all overflow-hidden ${
            isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {subData.map((val, index) => (
            <Link key={index} to={`${val.link}`}>
              <li
                className="border-b hover:bg-blue-600 hover:text-white hover:font-semibold hover:rounded-lg mt-1 py-2 border-zinc-400 px-3"
              >
                {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
              </li>
            </Link>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default UserAdminDropDown;