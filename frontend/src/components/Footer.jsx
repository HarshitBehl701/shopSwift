import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="getEmailUpdates  w-full md:h-16 h-fit py-2 px-3 bg-[#B0D7FF]">
        <form action="" className="flex  items-center  justify-center flex-wrap-reverse h-full gap-2">
        <h4 className="font-semibold">Get Our Email Updates</h4>
          <div className="searchContainer flex items-center  bg-[#F2FDFF] rounded-full  md:w-80 w-[80%]">
            <input
              type="email"
              placeholder="Enter your  email..."
              className="bg-transparent border-none outline-none w-full pl-4 pr-2 focus:ring-2 focus:ring-transparent rounded-full"
            />

            <input
              type="submit"
              value="Subscribe"
              className="bg-[#BFD7EA] px-4 py-2 rounded-full cursor-pointer font-semibold"
            />
          </div>
        </form>
      </div>
      <footer className="w-full h-fit bg-[#2D3142]">
        <div className="upperSection text-white flex flex-wrap  gap-4 pt-12 pb-8 md:px-20 px-8 justify-between  w-full ">
          <ul className="md:w-1/6 w-full">
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
            <li>
              <Link to="/contact" className="hover:text-blue-500 text-sm">
                Contact
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
      <div className="lowerSection text-white text-sm bg-zinc-800 w-full py-2">
          <p className="text-white  text-center">© 2024 All Rights Reserved. Scatch </p>
        </div>
    </>
  );
}

export default Footer;
