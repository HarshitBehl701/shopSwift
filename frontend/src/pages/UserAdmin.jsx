import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserProfile from "../components/UserProfile";
import { Link } from "react-router-dom";
import EditUserProfile from "../components/EditUserProfile";
import ManageOrders from "../components/ManageOrders";
import UserAdminNav from "../components/UserAdminNav";
import AddProduct from "../components/AddProduct";
import { useParams } from "react-router-dom";
import { getUser } from "../api/user";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import ProductList from "../components/ProductList";
import ProductDetailSeller from "../components/ProductDetailSeller";
import ProductDetailUser from "../components/ProductDetailUser";

function UserAdmin() {
  const { action, productId } = useParams();

  const currentUser = localStorage.getItem("userType");

  const fieldsAsPerUsers = {
    user: ["name", "email", "address", "contact", "profile"],
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

  const currentFieldAsPerUser = fieldsAsPerUsers[currentUser];

  const defaultObj = currentFieldAsPerUser.reduce((acc, curr) => {
    acc[curr] = "";
    return acc;
  }, {});

  const [user, setUser] = useState(defaultObj);

  let userFetched = false;

  useEffect(() => {
    async function fetchUserfn() {
      try {
        const userData = await getUser(
          localStorage.getItem("token"),
          localStorage.getItem("userType")
        );
        setUser(userData.data);
      } catch (error) {
        handleError(error.message);
      }
    }

    if (!userFetched) {
      fetchUserfn();
      userFetched = true;
    }
  }, []);

  const requestedPagesAsPerUserType = {
    common: {
      profile: <UserProfile userData={user} />,
      edit_profile: <EditUserProfile userData={user} />,
    },
    user: {
      cart: <ManageOrders currentPage={"Cart"} />,
      orders: (
        <ManageOrders currentPage={"Orders"} />
      ),
      whislist: (
        <ManageOrders
          currentPage={"Whislist"}
        />
      ),
    },
    seller: {
      add_product: <AddProduct />,
      all_products: (
        <ProductList title={"all products"} type={"all_products"} />
      ),
      live_products: (
        <ProductList title={"live products"} type={"live_products"} />
      ),
    },
    specialPage: {
      seller: {
        product: <ProductDetailSeller productId={productId} />,
      },
      user:{
        product_detail: <ProductDetailUser productId={productId}  />
      }
    },
  };

  let allowedRequestedPages = Object.assign(
    {},
    requestedPagesAsPerUserType["common"],
    requestedPagesAsPerUserType[currentUser]
  );

  allowedRequestedPages = productId
    ? Object.assign({}, allowedRequestedPages, {
        special: requestedPagesAsPerUserType["specialPage"][currentUser],
      })
    : allowedRequestedPages;

  const menuOptions = Object.keys(allowedRequestedPages).filter(
    (option) => option != "special"
  );

  let requestPage = allowedRequestedPages["profile"];

  if (action in allowedRequestedPages)
    requestPage = allowedRequestedPages[action];
  else if (
    productId &&
    "special" in allowedRequestedPages &&
    action in allowedRequestedPages["special"]
  )
    requestPage = allowedRequestedPages["special"][action];

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
                {menuOptions.map((option, index) => {
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
