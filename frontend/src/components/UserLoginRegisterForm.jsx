import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {  ToastContainer }  from 'react-toastify';

function UserLoginRegisterForm({leftPanelObj,rightPanelObj}) {
  
  const [currentPasswordState, updateCurrentPasswordState] = useState({
      input: "password",
      icon: faEyeSlash,
    });
    

  const handleUpdateCurrentPasswordState = () => {
    updateCurrentPasswordState({
      input: currentPasswordState.input == "password" ? "text" : "password",
      icon: currentPasswordState.input == "password" ? faEye : faEyeSlash,
    });
  };  

  return (
    <>
      <div className="w-full h-screen flex items-center relative justify-center  bg-blue-500">
        <div className="centerDiv flex md:w-[60%]   w-[60%] items-center h-[60%] justify-between rounded-md shadow-md overflow-hidden">
        <div className="leftSection  w-1/2 p-5 h-full md:flex items-center justify-center flex-col hidden bg-right bg-cover relative" style={{backgroundImage: "url('/assets/loginRegisterBg.jpg')"}}>
        <div className="shadowElem absolute w-[100%] top-0 z-0 h-full"></div>
        <div className="textCont backdrop-blur-sm rounded-lg relative  z-10">
        <h1 className="text-2xl font-semibold text-center cursor-pointer" dangerouslySetInnerHTML={{ __html: leftPanelObj.header }}>
          </h1>
          <h2 className="text-center text-sm italic cursor-pointer font-semibold">{leftPanelObj.subParaText}</h2>
        </div>
        </div>
        <div className="rightSection md:w-1/2 w-full  flex items-center justify-center py-10 px-20 h-full bg-white">
        <form method="post" onSubmit={rightPanelObj.handleFormSubmit}>
          <h3  className="text-xl font-semibold  text-center  mb-3">{  (rightPanelObj.redirectionLink ==  '/register'  ? 'Sign In' : 'Sign Up') }</h3>
          {rightPanelObj.nameFieldRequired && <input
              className="w-full px-2 py-1 border-0 border-b-2 border-b-zinc-400 mt-2 outline-none focus:ring-0 focus:border-b-zinc-600"
              type="text"
              placeholder="Name"
              name="name"
              onChange={rightPanelObj.handleFormInputFieldsOnChange}
              value={rightPanelObj.formInputFields.name}
              required
            />}
            <input
              className="w-full px-2 py-1 border-0 border-b-2 border-b-zinc-400 mt-2 outline-none focus:ring-0 focus:border-b-zinc-600"
              type="email"
              placeholder="Email"
              name="email"
              onChange={rightPanelObj.handleFormInputFieldsOnChange}
              value={rightPanelObj.formInputFields.email}
              required
            />
            <div className="border-b-2 border-b-zinc-400 mt-2 flex  items-center justify-between">
              <input
                className="w-full px-2 py-1 border-0 mt-2 outline-none focus:ring-0"
                type={currentPasswordState.input}
                placeholder="Password"
                name="password"
                onChange={rightPanelObj.handleFormInputFieldsOnChange}
                value={rightPanelObj.formInputFields.password}
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
                value={rightPanelObj.submitFormBtnTxt}
              />
              <Link to={rightPanelObj.redirectionLink} className="text-blue-500  italic text-sm font-semibold   block   mt-2">
                {rightPanelObj.linkText}
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
