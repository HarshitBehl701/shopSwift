import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { profilePicUpload } from "../api/user";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function UserProfile({ userData }) {
  const currentUser = localStorage.getItem("userType");

  const fieldsAsPerUser = {
    user: ["name", "email", "address", "contact", "picture"],
    seller: [
      "fullname",
      "email",
      "address",
      "contact",
      "brandname",
      "brandLogo",
      "gstin",
    ],
  };

  const currentFieldAsCurrentUser = fieldsAsPerUser[currentUser];

  const defaultObj = currentFieldAsCurrentUser.reduce((acc, curr) => {
    acc[curr] = "";
    return acc;
  }, {});

  const [user, setUser] = useState(defaultObj);

  useEffect(() => {
    if (userData) {
      const newUserData = currentFieldAsCurrentUser.reduce((acc, curr) => {
        acc[curr] = userData[curr] || "";
        return acc;
      }, {});
      setUser(newUserData);
    }
  }, [userData]);

  const imageSrc = user.picture || user.brandLogo;

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

  return (
    <>
      <div className="userProfile h-full p-4 md:p-6">
        <div className="twoSectionLayout flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
          {/* Left Section: Profile Image */}
          <div className="flex flex-col items-center">
            <div className="leftSection w-[140px] h-[140px] rounded-md overflow-hidden relative bg-gray-100 shadow-lg cursor-pointer">
              <img
                src={
                  imageSrc === "" || !imageSrc
                    ? "https://placehold.co/120/png"
                    : `/uploads/${
                        currentUser === "user" ? "profilePic" : "brandLogo"
                      }/${imageSrc}`
                }
                alt="profilePicture"
                className="w-full h-full object-cover object-top"
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
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="text-white text-xl"
                  />
                </button>
              </form>
            </div>
            <p className="mt-2 text-sm italic text-gray-500">Profile Picture</p>
          </div>

          {/* Right Section: User Information */}
          <div className="rightSection flex-1 p-4 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="contentSection mb-4">
              <ul className="space-y-2">
                {currentFieldAsCurrentUser.map((item, index) => {
                  if (item === "picture" || item === "brandLogo") return null;
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-4 text-gray-700 text-sm"
                    >
                      <span className="w-[30%] font-medium text-gray-600">
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </span>
                      <span className="w-[5%]">:</span>
                      <span className="flex-1 text-gray-800">
                        {user[item] !== "" ? (
                          user[item]
                        ) : (
                          <Link
                            to={`/${localStorage.getItem(
                              "userType"
                            )}/edit_profile`}
                            className="text-blue-500 italic hover:underline"
                          >
                            {`Add ${item}`}
                          </Link>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Edit Profile Button */}
            <div className="text-right">
              <Link
                to={`/${localStorage.getItem("userType")}/edit_profile`}
                className="inline-block bg-blue-600 text-white py-1 px-3 text-xs font-semibold rounded-md hover:bg-blue-700 transition-all duration-200"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserProfile;
