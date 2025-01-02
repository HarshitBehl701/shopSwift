import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";

function Navbar({ currentPage }) {
  const [isDropMenuOpen, updateIsDropMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handleMenuToggle = () =>
    isDropMenuOpen ? updateIsDropMenuOpen(false) : updateIsDropMenuOpen(true);
  const baseMenuOptions = [
    ["Home", "/"],
    ["About", "/about"],
    ["Products", "/products"],
  ];

  const menuOptions = token
    ? baseMenuOptions
    : [...baseMenuOptions, ["Login", "/login"], ["Register", "/register"]];

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
    <nav className="bg-white shadow-md   px-8 py-1">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 gap-4">
        <Link
          to="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-600">
            Scatch
          </span>
        </Link>
        {currentPage.toLowerCase() !== "products" && (
          <SearchComponent size={"md:w-1/3"} />
        )}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center ml-auto p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 self-end focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={handleMenuToggle}
        >
          <span className="sr-only">main menu</span>
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
          className={
            isDropMenuOpen
              ? `block  w-full md:block md:w-auto`
              : `hidden w-full md:block md:w-auto`
          }
          id="navbar-default"
        >
          <ul className="font-medium text-sm flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {menuOptions.map((option) => (
              <li key={option[1]}>
                <Link
                  to={option[1]}
                  className={`block py-2 px-3 rounded md:p-0 ${
                    option[0].toLowerCase() === currentPage.toLowerCase()
                      ? "text-white  bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
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
            <li>
              <Link
                to={`/${localStorage.getItem('userType')}/profile`}
                className={
                  token
                    ? "profileiconcontianer  flex  items-center justify-center"
                    : "hidden"
                }
              >
                <img
                  src="/assets/user.png"
                  alt="profile"
                  className="object-cover w-7  h-7 rounded-full border"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div className="cursor absolute w-[30px] h-[30px] cursor-pointer rounded-full border flex items-center justify-center">
      <span className="text-xl  font-semibold absolute">&#xB7;</span>
    </div>

    </>
  );
}

export default Navbar;
