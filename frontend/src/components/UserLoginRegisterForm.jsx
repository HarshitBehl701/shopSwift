import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {  ToastContainer }  from 'react-toastify';

function UserLoginRegisterForm({
  subParaText,
  handleFormSubmit,
  handleFormInputFieldsOnChange,
  currentPasswordState,
  handleUpdateCurrentPasswordState,
  linkText,
  redirectionLink,
  submitFormBtnTxt,
  nameFieldRequired
}) {
  return (
    <>
      <div className="w-full h-screen flex items-center relative justify-center  bg-blue-400">
        <div className="centerDiv flex md:w-[60%]   w-[60%] items-center h-[60%] justify-between rounded-md shadow-md overflow-hidden">
        <div className="leftSection  w-1/2 p-5 h-full md:flex items-center justify-center flex-col hidden bg-right bg-cover relative" style={{backgroundImage: "url('/assets/loginRegisterBg.jpg')"}}>
        <div className="shadowElem absolute w-[100%] top-0 z-0 h-full"></div>
        <div className="textCont backdrop-blur-sm rounded-lg relative  z-10">
        <h1 className="text-2xl font-semibold text-center cursor-pointer">
          Join the <span  className="text-blue-600 hover:text-blue-700">Scatch</span> Community!
          </h1>
          <h2 className="text-center text-sm italic cursor-pointer font-semibold">{subParaText}</h2>
        </div>
        </div>
        <div className="rightSection md:w-1/2 w-full  flex items-center justify-center py-10 px-20 h-full bg-white">
        <form method="post" onSubmit={handleFormSubmit}>
          <h3  className="text-xl font-semibold  text-center  mb-3">{  (redirectionLink ==  '/register'  ? 'Sign In' : 'Sign Up') }</h3>
          {nameFieldRequired && <input
              className="w-full px-2 py-1 border-0 border-b-2 border-b-zinc-400 mt-2 outline-none"
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleFormInputFieldsOnChange}
              required
            />}
            <input
              className="w-full px-2 py-1 border-0 border-b-2 border-b-zinc-400 mt-2 outline-none"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleFormInputFieldsOnChange}
              required
            />
            <div className="border-b-2 border-b-zinc-400 mt-2 flex  items-center justify-between">
              <input
                className="w-full px-2 py-1   border-0  outline-none"
                type={currentPasswordState.input}
                placeholder="Password"
                name="password"
                onChange={handleFormInputFieldsOnChange}
                required
              />
              <FontAwesomeIcon
                icon={currentPasswordState.icon}
                className="cursor-pointer"
                onClick={handleUpdateCurrentPasswordState}
              />
            </div>
            <div className="mt-4">
              <input
                className="px-2  py-1  border rounded text-sm w-full  font-semibold bg-blue-600 text-white   cursor-pointer  hover:bg-blue-700"
                type="submit"
                value={submitFormBtnTxt}
              />
              <Link to={redirectionLink} className="text-blue-500  italic text-sm font-semibold   block   mt-2">
                {linkText}
              </Link>
            </div>
          </form>
        </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserLoginRegisterForm;
