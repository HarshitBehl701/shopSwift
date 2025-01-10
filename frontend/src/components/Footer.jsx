import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="getEmailUpdates  w-full py-1   px-3 bg-slate-100"></div>
      <footer className="w-full h-fit bg-[#2D3142]">
        <div className="upperSection text-white flex flex-wrap  gap-4 pt-12 pb-8 md:px-20 px-8 justify-between  w-full ">
          <ul className="md:w-1/6 w-full">
            <li className="flex items-center  gap-2">
              <img
                src="/assets/logoBgRemove.png"
                className="h-12   cursor-pointer"
                alt="Flowbite Logo"
              />
              <h5 className="text-2xl font-semibold cursor-pointer hover:text-blue-400">
                Scatch
              </h5>
            </li>
            <li className="text-sm italic  mt-2">Your Store, Your Choice</li>
          </ul>
          <ul className="md:w-1/6 w-full">
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
          <ul  className="md:w-1/6 w-full">
            <li className="font-semibold">Important Links</li>
            <li>
              <Link to="/faq" className="hover:text-blue-500 text-sm">
                FAQ
              </Link>
            </li>
            <li className={(localStorage.getItem('token')) ? 'hidden'  : ''}>
              <Link to="/seller-login" className="hover:text-blue-500 text-sm">
                Join As Seller
              </Link>
            </li>
          </ul>
          <ul className="cursor-pointer md:w-1/5 w-full">
            <li className="font-semibold">Get In Touch</li>
            <li className="text-sm">Email: scatch@helpdesk.in</li>
            <li className="text-sm">Mob: 123-456-789 , 123-456-789</li>
            <li className="text-sm">
              Address: R-z 24, some district, <br />
              city , country , 123012
            </li>
          </ul>
        </div>
      </footer>
      <div className="lowerSection text-white text-xs bg-zinc-800 w-full py-2">
          <p className="text-white  text-center">© 2024 All Rights Reserved. Scatch </p>
        </div>
    </>
  );
}

export default Footer;
