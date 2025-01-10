import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useLocation, useParams } from "react-router-dom";
import UserAdminNav from "../components/UserAdminNav";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils/toastContainerHelperfn";
import { manageUserAdminPageData } from "../utils/manageUserProfileHelper";
import UserAdminDropDown from "../components/UserAdminDropDown";

function UserAdmin() {
  const { action, productId_or_orderId } = useParams();
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [menuOptions, setMenuOptions] = useState([]);
  const [requestPage, setRequestPage] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const main = async () => {
      const response = await manageUserAdminPageData(
        user,
        setUser,
        productId_or_orderId,
        action
      );

      if (!response.status) {
        handleError("Some Unexpected Error Occured. Please Try Again Later");
      } else {
        const data = response.data;
        setCurrentUser(data.currentUser);
        setMenuOptions(data.menuOptions);
        setRequestPage(data.requestPage);
      }
    };
    main();
  }, [location]);

  return (
    <>
      <Navbar currentPage={"Profile"} />
      <div className="mainContainer w-full px-8 py-16">
        <UserAdminNav menuOptionsData={menuOptions} />
        <div className="flex justify-between items-start gap-6">
          {/* Left Section */}
          <div className="leftSection md:block  hidden w-full md:w-1/4  p-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              Welcome,{" "}
              {currentUser.charAt(0).toUpperCase() + currentUser.slice(1)}
            </h1>
            <div className="leftPanelContainer">
              <ul className="text-xs font-semibold text-gray-700">
                {Array.isArray(menuOptions) &&
                  menuOptions.length > 0 &&
                  menuOptions.map((option, index) => {
                    const menuName = option
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ");
                    return (
                      <Link key={index} to={`/${currentUser}/${option}`}>
                        <li
                          className={`my-2 px-3 py-2 cursor-pointer ${
                            action?.toLowerCase() === option
                              ? "bg-blue-600 rounded-md text-white"
                              : "hover:bg-blue-600  hover:rounded-md hover:text-white border-b-2 border-gray-100"
                          }`}
                        >
                          {menuName}
                        </li>
                      </Link>
                    );
                  })}
              </ul>
              <Link
                to={"/logout"}
                className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg shadow-md font-semibold mt-6 block text-center"
              >
                Logout
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="rightSection flex-1 bg-white shadow-lg rounded-lg p-6">
            <div className="requestContent">{requestPage}</div>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default UserAdmin;
