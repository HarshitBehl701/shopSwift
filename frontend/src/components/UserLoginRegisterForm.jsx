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
      <div className="w-full h-screen flex items-center justify-center">
        <div className="centerDiv w-[70%] md:w-1/3 border shadow-md rounded-lg py-4   px-8">
          <h1 className="text-xl font-semibold   text-center cursor-pointer">
          Join the <span  className="text-blue-500 hover:text-blue-600">Scatch</span> Community!
          </h1>
          <h2 className="text-center text-sm italic cursor-pointer">{subParaText}</h2>
          <form method="post" onSubmit={handleFormSubmit}>
          {nameFieldRequired && <input
              className="w-full px-2 py-1 border-b-2 border-b-zinc-400 mt-2 outline-none"
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleFormInputFieldsOnChange}
              required
            />}
            <input
              className="w-full px-2 py-1 border-b-2 border-b-zinc-400 mt-2 outline-none"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleFormInputFieldsOnChange}
              required
            />
            <div className="border-b-2 border-b-zinc-400 mt-2 flex  items-center justify-between">
              <input
                className="w-full px-2 py-1  outline-none"
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
            <div className="flex  items-center justify-between  mt-4">
              <input
                className="px-2  py-1  border rounded text-sm   font-semibold bg-blue-500 text-white   cursor-pointer  hover:bg-blue-600"
                type="submit"
                value={submitFormBtnTxt}
              />
              <Link to={redirectionLink} className="text-blue-500  italic text-sm">
                {linkText}
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserLoginRegisterForm;
