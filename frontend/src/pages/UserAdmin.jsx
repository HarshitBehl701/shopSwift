import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link,useLocation,useParams } from "react-router-dom";
import UserAdminNav from "../components/UserAdminNav";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils/toastContainerHelperfn";
import  {manageUserAdminPageData}   from  "../utils/manageUserProfileHelper";

function UserAdmin() {
  const { action, productId_or_orderId } = useParams();  
  const [user, setUser] = useState({});
  const [currentUser,setCurrentUser] =   useState("")
  const [menuOptions,setMenuOptions] =   useState([])
  const [requestPage,setRequestPage] =   useState([])
  const location = useLocation();

  useEffect(() =>{
    const main =  async  () => {
      const response =   await manageUserAdminPageData(user,setUser,productId_or_orderId,action);

    if(!response.status) {
      handleError('Some Unexpected  Error Occured Please  Try  Again  Later')
    }
    else{
      const data   = response.data;
      setCurrentUser(data.currentUser)
      setMenuOptions(data.menuOptions)
      setRequestPage(data.requestPage);
    }
    }
    main();
  },[location])
  
  return (
    <>
      <Navbar currentPage={"Profile"} />
      <div className="mainContainer w-full h-fit px-8 py-16">
        <UserAdminNav   menuOptionsData={menuOptions} />
        <div className="twoSectionLayout flex h-fit justify-center gap-3 items-stretch">
          {/* Left Section */}
          <div className="leftSection w-1/3 border shadow-md rounded-md md:block hidden p-4">
            <h1 className="text-xl font-semibold">Welcome, User</h1>
            <div className="leftPanelContainer h-[90%]  flex flex-col  justify-between">
              <ul className="text-sm px-2 my-8 font-semibold">
                {Array.isArray(menuOptions) && menuOptions.length > 0 && menuOptions.map((option, index) => {
                  let menuName =
                    option.split("_").length > 1
                      ? option.split("_")[0].charAt(0).toUpperCase() +
                        option.split("_")[0].slice(1) +
                        " " +
                        option.split("_")[1].charAt(0).toUpperCase() +
                        option.split("_")[1].slice(1)
                      : option.charAt(0).toUpperCase() + option.slice(1);
                  return (
                    <Link key={index} to={`/${currentUser}/${option}`}>
                      <li
                        className={
                          action?.toLowerCase() == option
                            ? "my-1 bg-blue-600 rounded-md text-white cursor-pointer p-1 pl-2"
                            : "my-1 hover:bg-blue-600 hover:rounded-md hover:text-white cursor-pointer border-b-2 border-zinc-100 p-1 pl-2"
                        }
                      >
                        {menuName}
                      </li>
                    </Link>
                  );
                })}
              </ul>
              <Link
                to={"/logout"}
                className="text-sm bg-red-500   w-fit text-white p-1 rounded shadow-md font-semibold"
              >
                Logout
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="rightSection md:w-1/2 w-full border shadow-md rounded-md p-4">
            {requestPage}
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default UserAdmin;
