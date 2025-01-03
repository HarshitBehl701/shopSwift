import React, { useState } from "react";
import { Link ,useParams} from "react-router-dom";

function UserAdminNav({ menuOptionsData }) {
  const { action} = useParams();
  const currentUser = localStorage.getItem("userType");
  const [isDropMenuOpen, updateIsDropMenuOpen] = useState(false);
  const handleMenuToggle = () =>
    isDropMenuOpen ? updateIsDropMenuOpen(false) : updateIsDropMenuOpen(true);
  return (
    <nav className="bg-white text-xs  md:hidden  block border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Welcome , User
        </span>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={handleMenuToggle}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isDropMenuOpen ? "" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {menuOptionsData.map((option, index) => {
              const menuName =
                option.split("_").length > 1
                  ? option.split("_")[0].charAt(0).toUpperCase() +
                    option.split("_")[0].slice(1) +
                    " " +
                    option.split("_")[1].charAt(0).toUpperCase() +
                    option.split("_")[1].slice(1)
                  : option.charAt(0).toUpperCase() + option.slice(1);
              return (
                <Link key={index} to={`/${currentUser}/${option}`}>
                  <li
                    className={
                      action?.toLowerCase() == option
                        ? "my-1 bg-blue-600 rounded-md text-white cursor-pointer p-1 pl-2"
                        : "my-1 hover:bg-blue-600 hover:rounded-md hover:text-white cursor-pointer border-b-2 border-zinc-100 p-1 pl-2"
                    }
                  >
                    {menuName}
                  </li>
                </Link>
              );
            })}

            <li>
              <Link
                to={"/logout"}
                className="block py-2 px-3 text-red-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UserAdminNav;
