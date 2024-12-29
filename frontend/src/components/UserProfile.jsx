import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserProfile({ userData }) {
  const currentUser = localStorage.getItem("userType");

  const fieldsAsPerUser  =  {
    user: ['name','email','address','contact','picture'],
    seller: ['fullname','email','address','contact','brandname','brandLogo','gstin']
  }

  const  currentFieldAsCurrentUser = fieldsAsPerUser[currentUser];
  
  const defaultObj = currentFieldAsCurrentUser.reduce((acc,curr) => {
    acc[curr] = "";
    return acc;  
  },{})

  const [user, setUser] = useState(defaultObj);

  useEffect(() => {
    if (userData) {
      const  newUserData =  currentFieldAsCurrentUser.reduce((acc,curr) => {
        acc[curr] =  userData[curr] || "";
        return  acc;
      },{});
      setUser(newUserData);
    }
  }, [userData]);

  const  imageSrc =  user.picture  || user.brandLogo;


  return (
    <>
      <div className="userProfile">
        <div className="twoSectionLayout flex md:flex-row flex-col justify-between">
          <div className="leftSection md:w-[150px] md:h-[150px]  w-full overflow-hidden p-2">
            <img
              src={(imageSrc  == ""  || !imageSrc) ? "https://placehold.co/150/png" : `/uploads/${currentUser == 'user' ? 'profilePic' : 'brandLogo'}/${imageSrc}`}
              alt="profilePicture"
              className="md:w-[150px] cursor-pointer md:h-[150px] md:mx-0 mx-auto  rounded-md object-cover   object-top"
            />
          </div>
          <div className="rightSection md:w-[70%] w-full border md:p-2  p-4  pl-6  rounded-md  shadow-md text-sm  font-semibold">
            <div className="contentSection mb-5">
              <ul>
                {currentFieldAsCurrentUser.map((item,index) => {
                  if(item == 'picture'  || item == 'brandLogo')  return false;
                  return <li key={index} className="flex  justify-evenly gap-6 my-1">
                  <div className="leftSection  w-[30%]">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                    </div>
                    <div className="middleSection w-[5%]">:</div>
                    <div className="rightSection   w-[65%]">
                    { (user[item] !== '') ? (user[item]) :( <Link to={`/${localStorage.getItem('userType')}/edit_profile`}className="hover:text-blue-600 font-light  italic text-xs">{`Add ${item}`}</Link>)}
                    </div>
                </li>

                } )}
              </ul>
            </div>
            <Link
              to={`/${localStorage.getItem('userType')}/edit_profile`}
              className="bg-blue-600 text-white   py-1 px-2 rounded-md shadow-md  hover:bg-blue-700 cursor-pointer"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
