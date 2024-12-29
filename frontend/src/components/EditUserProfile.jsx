import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faHouseChimneyUser,
} from "@fortawesome/free-solid-svg-icons";
import { updateUser , profilePicUpload } from "../api/manageUser";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

function EditUserProfile({ userData }) {
  const navigate = useNavigate();

  
  const  currentUser = localStorage.getItem('userType');

  const fieldsAsPerUsers = {
    user: ["name", "email", "address", "contact"],
    seller: [
      "fullname",
      "email",
      "address",
      "contact",
      "brandname",
      "gstin",
    ],
  };

  const  currentFieldAsPerUser  = fieldsAsPerUsers[currentUser];

  const defaultObj = currentFieldAsPerUser.reduce((acc,curr) => {
    acc[curr] =    "";
    return acc;
  },{})


  const [formData, setFormData] = useState(defaultObj);


  useEffect(() => {
    if (userData) {
      const newUserData = currentFieldAsPerUser.reduce((acc,curr)  =>  {
        acc[curr] =  userData[curr] ||  ""
        return acc;
      },{})
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
    console.log(newData)
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
    const  type   = file.type.split('/')[1].toLowerCase();
    const allowedExtension = ['jpeg','jpg','png'];
    if(allowedExtension.indexOf(type) == -1) handleError('Please  Upload  A Valid  Image  only : jpg , jpeg, png');
    else if(file.size > 2097152) handleError('File  Size Must be under 2 MB');
    else{ 
      try{
        const  response = await profilePicUpload(localStorage.getItem('token'),file,currentUser);
        
        handleSuccess('Uploaded Profile Photo  Successfully');

        setTimeout(() => {window.location.reload()},1000);

      }catch(error){
        handleError(error.message);
      }
    }
  };

  const imageSrc = userData.picture || userData.brandLogo;

  return (
    <>
      <h1 className="font-semibold">Edit Profile</h1>
      <div className="imageContainer rounded-full shadow-sm border border-zinc-200 w-[100px] h-[100px] overflow-hidden mx-auto relative">
        <img src={ (imageSrc == '' || !imageSrc) ? 'https://placehold.co/150/png' : `/uploads/${currentUser == 'user' ? 'profilePic' : 'brandLogo'}/${imageSrc}`} alt="profile pic" />
        <form encType='multipart/form-data'>
          <input
            type="file"
            name="profilePic"
            className="hidden"
            id="uploadPic"
            onChange={handlePicUpload}
          />
          <button
            type="submit"
            className="w-[100px] h-[100px] absolute top-0 cursor-pointer"
            onClick={(ev) => {
              ev.preventDefault();
              document.getElementById("uploadPic").click();
            }}
          >
            <FontAwesomeIcon icon={faCamera} className="text-lg text-white" />
          </button>
        </form>
      </div>
      <p className="text-xs text-center italic">Profile Picture</p>
      <br />
      <hr />
      <br />
      <form onSubmit={handleSubmit}>
        {currentFieldAsPerUser.map((field,index) => <input
          type={(field  ==  "email") ? "email" : "text"}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          className="block my-2 w-full border-zinc-300 outline-none rounded-md"
          key={index}
          readOnly={(field == "email")}
        />)}
        <input
          type="submit"
          value="Save Changes"
          className="text-xs mt-3 py-1 px-2 font-semibold cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md"
        />
      </form>
      <ToastContainer />
    </>
  );
}

export default EditUserProfile;
