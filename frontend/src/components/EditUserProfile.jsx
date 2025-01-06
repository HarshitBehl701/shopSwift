import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/toastContainerHelperfn";
import { useNavigate } from "react-router-dom";
import { handlePicUploadFn } from "../utils/commonHelper";
import { manageUserEditProfilePageData } from "../utils/manageUserProfileHelper";
import {
  handleFormInputChangeEvent,
  handleUpdateProfileFormSubmit,
} from "../utils/formHandlers";

function EditUserProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [currentFieldAsPerUser, setCurrentFieldAsPerUser] = useState([]);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const main = async () => {
      const response = await manageUserEditProfilePageData();

      if (!response.status) handleError(response.message);
      else {
        const data = response.data;
        setFormData(data.defaultFormObj);
        setFormData(data.userData);
        setImageSrc(data.imageSrc);
        setCurrentFieldAsPerUser(data.currentFieldAsPerUser);
        setCurrentUser(data.currentUser);
      }
    };

    main();
  }, []);

  const handlePicUpload = async (e) => {
    const response = await handlePicUploadFn(e);

    if (!response.status) handleError(response.message);
    else {
      handleSuccess("Uploaded Profile Photo  Successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleChange = (e) => handleFormInputChangeEvent(e, setFormData);

  const handleSubmit = async (e) => {
    const response = await handleUpdateProfileFormSubmit(formData);

    if (!response.status) {
      handleError(response.message);
    } else {
      handleSuccess("Successfully updated  your profile");
      setTimeout(() => {
        navigate(`/${currentUser}/profile`);
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 2100);
    }
  };

  return (
    <>
      <h1 className="font-semibold mb-4">Edit Profile</h1>

      {/* Profile Picture Section */}
      <div className="imageContainer rounded-full shadow-lg border border-gray-300 w-[120px] h-[120px] overflow-hidden mx-auto relative">
        <img
          src={`/uploads/${
            currentUser === "user" ? "profilePic" : "brandLogo"
          }/${imageSrc}`}
          alt="Profile"
          className="object-cover object-top w-full h-full"
        />
        <form
          encType="multipart/form-data"
          onSubmit={(ev) => ev.preventDefault()}
        >
          <input
            type="file"
            name="profilePic"
            className="hidden"
            id="uploadPic"
            onChange={handlePicUpload}
          />
          <button
            type="submit"
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
            onClick={(ev) => {
              ev.preventDefault();
              document.getElementById("uploadPic").click();
            }}
          >
            <FontAwesomeIcon icon={faCamera} className="text-white text-xl" />
          </button>
        </form>
      </div>
      <p className="text-sm text-center mt-2 text-gray-600 italic">
        Profile Picture
      </p>

      <hr className="my-6 border-gray-200" />

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {currentFieldAsPerUser.map((field, index) => (
          <div key={index}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              id={field}
              placeholder={`Enter ${
                field.charAt(0).toUpperCase() + field.slice(1)
              }`}
              value={formData[field]}
              onChange={handleChange}
              readOnly={field === "email"}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-2 py-1 bg-blue-600 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default EditUserProfile;
