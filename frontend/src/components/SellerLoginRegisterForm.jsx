import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function SellerLoginRegisterForm({ leftPanelObj, rightPanelObj }) {
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
      <div className="mainContainer bg-blue-500 w-full  flex items-center  justify-center min-h-screen">
        <div className="formContainer border  md:w-[60%] w-[90%] h-96  rounded-md  shadow-md  overflow-hidden   flex  items-center justify-center">
          <div
            className="leftSection  w-1/2 p-5 h-full md:flex items-center justify-center flex-col hidden bg-right bg-cover relative"
            style={{ backgroundImage: "url('/assets/loginRegisterBg.jpg')" }}
          >
            <div className="shadowElem absolute w-[100%] top-0 z-0 h-full"></div>
            <div className="textCont backdrop-blur-sm rounded-lg relative  z-10">
              <h1
                className="text-xl font-semibold text-center cursor-pointer"
                dangerouslySetInnerHTML={{ __html: leftPanelObj.header }}
              ></h1>
              <h2 className="text-center text-sm italic cursor-pointer font-semibold">
                {leftPanelObj.subParaText}
              </h2>
            </div>
          </div>
          <div className="rightSection md:w-1/2 w-full  flex items-center justify-center py-10 px-20 h-full bg-white">
            <form method="post" onSubmit={rightPanelObj.handleFormSubmit}>
              <h1 className="text-xl text-center font-semibold">
                {rightPanelObj.heading}
              </h1>
              {rightPanelObj.registration && (
                <input
                  className="w-full px-2 py-1 border-0 border-b-2 border-b-zinc-400 mt-2 outline-none focus:ring-0 focus:border-b-zinc-600"
                  type="text"
                  placeholder="Full  Name"
                  name="fullName"
                  onChange={rightPanelObj.handleFormInputFieldsOnChange}
                  value={rightPanelObj.formData.fullName}
                  required
                />
              )}
              <input
                className="w-full px-2 py-1 border-0 border-b-2 border-b-zinc-400 mt-2 outline-none focus:ring-0 focus:border-b-zinc-600"
                type="email"
                placeholder="Email"
                name="email"
                onChange={rightPanelObj.handleFormInputFieldsOnChange}
                value={rightPanelObj.formData.email}
                required
              />
              {rightPanelObj.registration && (
                <input
                  className="w-full px-2 py-1 border-0 border-b-2 border-b-zinc-400 mt-2 outline-none focus:ring-0 focus:border-b-zinc-600"
                  type="text"
                  placeholder="Brand Name"
                  name="brandName"
                  onChange={rightPanelObj.handleFormInputFieldsOnChange}
                  value={rightPanelObj.formData.brandName}
                  required
                />
              )}
              <div className="border-b-2 border-b-zinc-400 mt-2 flex  items-center justify-between">
                <input
                  className="w-full px-2 py-1   border-0  outline-none focus:ring-0"
                  type={currentPasswordState.input}
                  placeholder="Password"
                  name="password"
                  onChange={rightPanelObj.handleFormInputFieldsOnChange}
                  value={rightPanelObj.formData.password}
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
                />
                <Link
                  to={rightPanelObj.linkTextPath}
                  className="text-blue-500  italic text-sm font-semibold   block   mt-2"
                >
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

export default SellerLoginRegisterForm;
