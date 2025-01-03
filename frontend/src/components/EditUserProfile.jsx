import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCamera,} from "@fortawesome/free-solid-svg-icons";
import { updateUser, profilePicUpload } from "../api/user";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

function EditUserProfile({ userData }) {
  const navigate = useNavigate();

  const currentUser = localStorage.getItem("userType");

  const fieldsAsPerUsers = {
    user: ["name", "email", "address", "contact"],
    seller: ["fullname", "email", "address", "contact", "brandname", "gstin"],
  };

  const currentFieldAsPerUser = fieldsAsPerUsers[currentUser];

  const defaultObj = currentFieldAsPerUser.reduce((acc, curr) => {
    acc[curr] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(defaultObj);

  useEffect(() => {
    if (userData) {
      const newUserData = currentFieldAsPerUser.reduce((acc, curr) => {
        acc[curr] = userData[curr] || "";
        return acc;
      }, {});
      setFormData(newUserData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toString() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = { ...formData };
    delete newData.email;
    newData.contact = newData.contact.toString();
    console.log(newData);
    try {
      const user = await updateUser(
        localStorage.getItem("token"),
        newData,
        currentUser
      );
      handleSuccess("Successfully updated  your profile");
      setTimeout(() => {
        navigate(`/${currentUser}/profile`);
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 2100);
    } catch (error) {
      handleError(error.message);
    }
  };

  const handlePicUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const type = file.type.split("/")[1].toLowerCase();
    const allowedExtension = ["jpeg", "jpg", "png"];
    if (allowedExtension.indexOf(type) == -1)
      handleError("Please  Upload  A Valid  Image  only : jpg , jpeg, png");
    else if (file.size > 2097152) handleError("File  Size Must be under 2 MB");
    else {
      try {
        const response = await profilePicUpload(
          localStorage.getItem("token"),
          file,
          currentUser
        );

        handleSuccess("Uploaded Profile Photo  Successfully");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        handleError(error.message);
      }
    }
  };
  const imageSrc = userData.picture || userData.brandLogo;
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
