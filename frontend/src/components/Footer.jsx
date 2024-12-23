import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="getEmailUpdates  w-full mt-20 h-16 bg-zinc-300 flex items-center justify-center">
        <h4 className="w-1/3  text-right mr-3  font-semibold">Get Our Email Updates On</h4>
        <form action="" className="w-1/2">
          <div className="searchContainer flex items-center  bg-white rounded-full w-1/2">
            <input
              type="text"
              placeholder="Search for products"
              className="bg-transparent border-none outline-none w-full pl-4 pr-2 focus:ring-2 focus:ring-transparent rounded-full"
            />

            <input
              type="submit"
              value="Search"
              className="bg-slate-300 px-4 py-2 rounded-full cursor-pointer font-semibold"
            />
          </div>
        </form>
      </div>
      <footer className="w-full h-[16rem] bg-zinc-800">
        <div className="upperSection text-white flex pt-12 pb-8 px-20  justify-between  w-full h-[85%]">
          <ul>
            <li className="flex items-center  gap-2">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-12   cursor-pointer"
                alt="Flowbite Logo"
              />
              <h5 className="text-xl font-semibold cursor-pointer hover:text-blue-500">
                Scatch
              </h5>
            </li>
            <li className="text-sm italic  mt-2">Your Store, Your Choice</li>
          </ul>
          <ul>
            <li className="font-semibold">Quick Links</li>
            <li>
              <Link to="/home" className="hover:text-blue-500 text-sm ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500 text-sm  ">
                About
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-500 text-sm">
                Products
              </Link>
            </li>
          </ul>
          <ul>
            <li className="font-semibold">Important Links</li>
            <li>
              <Link to="/faq" className="hover:text-blue-500 text-sm">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500 text-sm">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-blue-500 text-sm">
                Support
              </Link>
            </li>
          </ul>
          <ul className="cursor-pointer">
            <li className="font-semibold">Get In Touch</li>
            <li className="text-sm">Email: scatch@helpdesk.in</li>
            <li className="text-sm">Mob: 123-456-789 , 123-456-789</li>
            <li className="text-sm">
              Address: R-z 24, some district, <br />
              city , country , 123012
            </li>
          </ul>
        </div>
        <div className="lowerSection text-white text-sm bg-zinc-900 w-full h-[15%] flex items-center  justify-center">
          <p className="text-white">© 2024 All Rights Reserved. Scatch </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
