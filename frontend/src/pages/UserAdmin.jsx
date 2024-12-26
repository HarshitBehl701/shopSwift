import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserProfile from "../components/UserProfile";
import { Link } from "react-router-dom";
import EditUserProfile from "../components/EditUserProfile";
import ManageOrders from "../components/ManageOrders";
import UserAdminNav from "../components/UserAdminNav";
import { useParams } from "react-router-dom";

function UserAdmin() {
  const { action } = useParams();

  const requestedPage  = {
      profile: <UserProfile />,
      cart: <ManageOrders />,
      orders: <ManageOrders />,
      whislist: <ManageOrders />,
      edit_profile:<EditUserProfile />
  }

  return (
    <>
      <Navbar currentPage={"Profile"} />
      <div className="mainContainer  w-full  h-fit px-8 py-16">
        <UserAdminNav />
        <div className="twoSectionLayout flex h-full justify-center  gap-3">
          <div className="leftSection w-1/3  h-full  border shadow-md rounded-md md:block hidden p-4">
            <h1 className="text-xl font-semibold">Welcome , User</h1>
            <ul className="text-sm px-2 my-8 font-semibold">
            <Link to={'/user/profile'}>
              <li className="my-1 hover:bg-blue-600  hover:rounded-md hover:text-white   cursor-pointer border-b-2 border-zinc-100  p-1 pl-2">
              Profile
              </li>
                </Link>
                <Link  to={'/user/cart'}>
              <li className="my-1 hover:bg-blue-600  hover:rounded-md hover:text-white   cursor-pointer border-b-2 border-zinc-100  p-1 pl-2">
                Cart
              </li>
              </Link>
              <Link to={'/user/orders'}>
              <li className="my-1 hover:bg-blue-600  hover:rounded-md hover:text-white   cursor-pointer border-b-2 border-zinc-100  p-1 pl-2">
                Orders
              </li>
              </Link>
              <Link to={'/user/whislist'}>
              <li className="my-1 hover:bg-blue-600  hover:rounded-md hover:text-white   cursor-pointer border-b-2 border-zinc-100  p-1 pl-2">
                Whislist
              </li>
              </Link>
            </ul>
            <Link
              to={"/logout"}
              className="text-sm bg-red-500   text-white  p-1 rounded shadow-md font-semibold"
            >
              Logout
            </Link>
          </div>
          <div className="rightSection  h-full md:w-1/2 w-full border shadow-md rounded-md  p-4">
            {action in requestedPage  ? requestedPage[action]   :  requestedPage['profile']}

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserAdmin;
