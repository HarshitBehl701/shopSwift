import React from "react";
import { Link } from "react-router-dom";
import NavbarProfileBtn from "./NavbarProfileBtn";
import { getLocalStorageVariables } from "../utils/commonHelper";

function NavbarMenus({ currentPage }) {
  const [token, currentUser] = getLocalStorageVariables("all");

  const defaultMenus = [
    ["Home", "/"], // MenuName , Redirection  Link
    ["About", "/about"],
    ["Products", "/products"],
  ];

  const menuOptions = token
    ? defaultMenus
    : [...defaultMenus, ["Login", "/login"], ["Register", "/register"]];

  const profileDropdownOptions = {
    user: ["cart", "whislist", "orders"],
    seller: ["add_product", "all_products", "live_products", "manage_orders"],
  };

  const currentProfileDropdownOptionsForCurrentUser =
    profileDropdownOptions[currentUser];

  return (
    <div>
      <ul className="font-medium text-sm flex flex-col md:flex-row p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:items-center md:justify-start space-y-0 md:space-y-0">
        {menuOptions.map((option) => (
          <li key={option[1]}>
            <Link
              to={option[1]}
              className={`block py-2 px-3 rounded md:p-0 ${
                option[0].toLowerCase() === currentPage.toLowerCase()
                  ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
                  : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              aria-current={
                option[0].toLowerCase() === currentPage.toLowerCase()
                  ? "page"
                  : undefined
              }
            >
              {option[0]}
            </Link>
          </li>
        ))}

        {token && currentUser && (
          <li  className="flex justify-end px-2">
            <NavbarProfileBtn
              dropDownOptions={currentProfileDropdownOptionsForCurrentUser}
              currentUser={currentUser}
            />
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavbarMenus;