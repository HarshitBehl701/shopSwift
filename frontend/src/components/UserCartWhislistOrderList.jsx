import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserCartWhislist } from "../api/user";
import { getOrders } from "../api/order";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import { Carousel } from "flowbite-react";
import ExpandableDescription from "./ExpandableDescription";

function UserCartWhislistOrderList({currentPage }) {
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
          setUserCurrentPageListData(response.data[currentPage.toLowerCase()].reverse());
        }
      } catch (error) {
        handleError(error.message);
      }
    };

    const  fetchUserOrders = async  ()   => {
      try{
        const response  = await getOrders(localStorage.getItem('token'),localStorage.getItem('userType'));

        if(!response.status){
          handleError('Some Unexpected Error   Occured')
        }else{
          setUserCurrentPageListData(response.data.reverse());
        }

      }catch(error){
        handleError(error.message);
      }
    }

    if(currentPage.toLowerCase() == 'orders') fetchUserOrders();
    else fetchUserCartAndWhislist()
  }, [location]);

  return (
    <>
      <h1 className="font-semibold">{currentPage}</h1>
      <ul
        className={
          Array.isArray(userCurrentPageListData)  && userCurrentPageListData?.length === 0
            ? "hidden"
            : "mt-4 overflow-x-hidden overflow-y-auto"
        }
      >

        {/* for Cart  And Whislist */}
        {Array.isArray(userCurrentPageListData) &&  userCurrentPageListData?.length > 0  && userCurrentPageListData?.map((data, index) => (
          <Link key={index} to={`/user/${currentPage.toLowerCase() == 'orders' ? 'order_detail'  : 'product_detail'}/${data._id}`}>
          <li className="my-2 border-b border-zinc-300 p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Image Container */}
              <div className="imageContainer w-[90px] h-[90px] sm:w-[120px] sm:h-[120px]">
              {data.image &&  <Carousel
                  pauseOnHover
                  indicators={false}
                  controls={false}
                  leftControl=" "
                  rightControl=" "
                >
                  {data.image.map((src, srcIndex) => (
                    <img
                      key={srcIndex}
                      src={`/uploads/other/${src}`}
                      alt="productImage"
                      className="w-full h-full object-cover object-top rounded-md"
                    />
                  ))}
                </Carousel>}
                {data?.productDetail?.image &&  <Carousel
                  pauseOnHover
                  indicators={false}
                  controls={false}
                  leftControl=" "
                  rightControl=" "
                >
                  {data.productDetail.image.map((src, srcIndex) => (
                    <img
                      key={srcIndex}
                      src={`/uploads/other/${src}`}
                      alt="productImage"
                      className="w-full h-full object-cover object-top rounded-md"
                    />
                  ))}
                </Carousel>}
              </div>

              <ul className="flex-1 text-sm space-y-4">
                <li className="text-xs font-semibold flex items-start gap-2 sm:gap-4">
                  <span className="w-[30%] sm:w-[20%] text-gray-600">Name</span>
                  <span className="w-[10%] text-gray-600">:</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md flex-1">
                    {data?.name  ||  data?.productDetail?.name}
                  </span>
                </li>
                <li className="text-xs font-semibold flex items-start gap-2 sm:gap-4">
                  <span className="w-[30%] sm:w-[20%] text-gray-600">
                    Price
                  </span>
                  <span className="w-[10%] text-gray-600">:</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md flex-1">
                    {(data?.price - data?.discount) ||  data?.amount }
                  </span>
                </li>
                <li className="text-xs font-semibold flex items-start gap-2 sm:gap-4">
                  <span className="w-[30%] sm:w-[20%] text-gray-600">
                    Description
                  </span>
                  <span className="w-[10%] text-gray-600">:</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md flex-1">
                    <ExpandableDescription
                      description={data?.description || data.productDetail.description}
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

      {Array.isArray(userCurrentPageListData) && userCurrentPageListData?.length == 0 && (
        <p className="italic  mt-4 text-sm">
          No items in your {currentPage}...
        </p>
      )}
      <ToastContainer />
    </>
  );
}

export default UserCartWhislistOrderList;