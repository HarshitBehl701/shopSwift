import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function UserProfile() {
  return (
    <>
      <div className="userProfile">
        <div className="twoSectionLayout flex md:flex-row flex-col justify-between">
          <div className="leftSection md:w-[150px] md:h-[150px]  w-full overflow-hidden p-2">
            <img
              src="https://placehold.co/150"
              alt="profilePicture"
              className="md:w-[150px] md:h-[150px] md:mx-0 mx-auto  rounded-md object-cover"
            />
          </div>
          <div className="rightSection md:w-[70%] w-full border md:p-2  p-4  pl-6  rounded-md  shadow-md text-sm  font-semibold">
            <div className="contentSection flex gap-6  mb-2">
              <ul>
                <li className="flex  items-center  justify-between  gap-6 my-1">
                  Name <span>:</span>
                </li>
                <li className="flex  items-center  justify-between  gap-6 my-1">
                  Email <span>:</span>
                </li>
                <li className="flex  items-center  justify-between  gap-6 my-1">
                  Phone <span>:</span>
                </li>
                <li className="flex  items-center  justify-between  gap-6 my-1">
                  Address <span>:</span>
                </li>
              </ul>
              <ul>
                <li className="my-1">Name</li>
                <li className="my-1">Email</li>
                <li className="my-1">Phone</li>
                <li className="my-1">Address</li>
              </ul>
            </div>
            <Link
              to={"/user/edit_profile"}
              className="bg-blue-600 text-white   py-1 px-2 rounded-md shadow-md  hover:bg-blue-700 cursor-pointer"
            >
              Edit Profile
            </Link>
          </div>
        </div>
        <br />
        <hr />
        <h3 className="text-xl font-semibold mt-3">Recent Activities</h3>
        <ul className="text-sm font-semibold">
          <li className="p-2 border-b  border-zinc-300">
            <FontAwesomeIcon icon={faAngleRight} /> Here It will show
          </li>
          <li className="p-2 border-b  border-zinc-300">
            <FontAwesomeIcon icon={faAngleRight} /> Here It will show
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserProfile;
