import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { getUserCartWhislist } from "../api/user";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import { Carousel } from "flowbite-react";
import ExpandableDescription from "./ExpandableDescription";

function ManageOrders({currentPage }) {
  const [userCurrentPageListData, setUserCurrentPageListData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const fetchUserCartAndWhislist = async () => {
      try {
        const response = await getUserCartWhislist(
          localStorage.getItem("token"),
          localStorage.getItem("userType")
        );
        if (response.status) {
          setUserCurrentPageListData(response.data[currentPage.toLowerCase()]);
        }
      } catch (error) {
        handleError(error.message);
      }
    };

    const fetchUserOrdersList = async() =>{
      try{
      }catch(error){
        handleError(error.message);
      }
    }

    if(['whislist','cart'].includes(currentPage.toLowerCase())){
      fetchUserCartAndWhislist()
    }else{
      fetchUserOrdersList()
      setUserCurrentPageListData([]);
    }
  }, [location]);

  return (
    <>
      <h1 className="font-semibold">{currentPage}</h1>
      <ul
        className={
          userCurrentPageListData?.length === 0
            ? "hidden"
            : "mt-4 overflow-x-hidden overflow-y-auto"
        }
      >
        {userCurrentPageListData?.map((product, index) => (
          <Link key={index} to={`/user/product_detail/${product._id}`}>
          <li className="my-2 border-b border-zinc-300 p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Image Container */}
              <div className="imageContainer w-[90px] h-[90px] sm:w-[120px] sm:h-[120px]">
                <Carousel
                  pauseOnHover
                  indicators={false}
                  controls={false}
                  leftControl=" "
                  rightControl=" "
                >
                  {product?.image?.map((src, srcIndex) => (
                    <img
                      key={srcIndex}
                      src={`/uploads/other/${src}`}
                      alt="productImage"
                      className="w-full h-full object-cover object-top rounded-md"
                    />
                  ))}
                </Carousel>
              </div>

              <ul className="flex-1 text-sm space-y-4">
                <li className="text-xs font-semibold flex items-start gap-2 sm:gap-4">
                  <span className="w-[30%] sm:w-[20%] text-gray-600">Name</span>
                  <span className="w-[10%] text-gray-600">:</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md flex-1">
                    {product.name}
                  </span>
                </li>
                <li className="text-xs font-semibold flex items-start gap-2 sm:gap-4">
                  <span className="w-[30%] sm:w-[20%] text-gray-600">
                    Price
                  </span>
                  <span className="w-[10%] text-gray-600">:</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md flex-1">
                    {product.price - product.discount}
                  </span>
                </li>
                <li className="text-xs font-semibold flex items-start gap-2 sm:gap-4">
                  <span className="w-[30%] sm:w-[20%] text-gray-600">
                    Description
                  </span>
                  <span className="w-[10%] text-gray-600">:</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md flex-1">
                    <ExpandableDescription
                      description={product.description}
                      limit={20}
                    />
                  </span>
                </li>
              </ul>
            </div>
          </li>
          </Link>
        ))}
      </ul>

      {userCurrentPageListData?.length == 0 && (
        <p className="italic  mt-4 text-sm">
          No items in your {currentPage}...
        </p>
      )}
      <ToastContainer />
    </>
  );
}

export default ManageOrders;
