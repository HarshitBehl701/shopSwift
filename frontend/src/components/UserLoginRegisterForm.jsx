import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";

function UserLoginRegisterForm({ leftPanelObj, rightPanelObj, currentPage }) {
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

  const allowedRequestPages = ["login", "register"];

  return (
    <>
      <div className="mainContainer   w-full   min-h-screen  flex  items-center  justify-center">
        <Link to={'/home'}  className="bg-red-600 hover:bg-red-700 px-2 py-1  rounded-md  text-xs font-semibold  text-white absolute  top-4 right-4">Back to home</Link>
        <div className="bg-white border shadow-lg rounded-lg w-[90%] max-w-4xl flex flex-col md:flex-row overflow-hidden">
          <div className="hidden md:flex w-full md:w-1/2 bg-blue-600 text-white flex-col items-center justify-center p-8">
            <h1
              className="text-4xl font-bold mb-4"
              dangerouslySetInnerHTML={{ __html: leftPanelObj.header }}
            ></h1>
            <p className="text-lg">{leftPanelObj.subParaText}</p>
          </div>

          <div className="w-full md:w-1/2 p-8">
            <div className="flex justify-center mb-6">
              {allowedRequestPages.map((pageName, index) => (
                <Link
                  key={index}
                  to={`/${pageName}`}
                  className={`tab active px-6 py-2 ${
                    currentPage == pageName
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  } font-semibold focus:outline-none`}
                >
                  {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
                </Link>
              ))}
            </div>

            <form
              className="space-y-4"
              method="post"
              onSubmit={rightPanelObj.handleFormSubmit}
            >
              {rightPanelObj.nameFieldRequired && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your Name"
                    className="mt-1 w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                    onChange={rightPanelObj.handleFormInputFieldsOnChange}
                    value={rightPanelObj.formData.name}
                    required
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  onChange={rightPanelObj.handleFormInputFieldsOnChange}
                  value={rightPanelObj.formData.email}
                  required
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="flex items-center border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-300">
                  <input
                    type={currentPasswordState.input}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border-none focus:outline-none"
                    onChange={rightPanelObj.handleFormInputFieldsOnChange}
                    value={rightPanelObj.formData.password}
                    required
                  />
                  <FontAwesomeIcon
                    icon={currentPasswordState.icon}
                    className="cursor-pointer text-gray-500 px-3 hover:text-gray-700"
                    onClick={handleUpdateCurrentPasswordState}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                {rightPanelObj.linkText}{" "}
                <Link
                  to={rightPanelObj.redirectionLink}
                  className="text-blue-600 font-semibold focus:outline-none"
                  id="switchToRegister"
                >
                  {currentPage == "login" ? "Register" : "Login"}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserLoginRegisterForm;
