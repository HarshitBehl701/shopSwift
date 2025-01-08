import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import NavbarMenus from "./NavbarMenus";

function Navbar({ currentPage }) {
  
  // Menu Toggle Btn
  const [isDropMenuOpen, updateIsDropMenuOpen] = useState(false);
  const handleMenuToggle = () => isDropMenuOpen ? updateIsDropMenuOpen(false) : updateIsDropMenuOpen(true);

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
            className='block  w-full md:block md:w-auto'
            id="navbar-default"
          >
            <NavbarMenus currentPage={currentPage} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
