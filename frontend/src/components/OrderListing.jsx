import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";

function OrderListing({ orderData }) {
  return (
    <Link
      to={`/seller/order_detail/${orderData?.id}`}
      className="border-b border-gray-200 pb-4"
    >
      <div className="twoSection flex flex-col md:flex-row md:gap-4 gap-6">
        {/* Left Side (Carousel) */}
        <div className="leftSide w-[120px] h-[120px] md:flex-none flex justify-center items-center cursor-pointer">
          <Carousel
            pauseOnHover
            indicators={false}
            controls={false}
            leftControl=" "
            rightControl=" "
            className="w-[120px] h-[120px] rounded-md shadow-md"
          >
            {orderData?.product?.image?.map((image, imageIndex) => (
              <img
                key={imageIndex}
                src={`/uploads/other/${image}`}
                alt={`product-${imageIndex}`}
                className="w-full h-full rounded-md object-cover object-top"
              />
            ))}
          </Carousel>
        </div>

        {/* Right Side (Product Details) */}
        <div className="rightSide flex-1">
          <ul className="space-y-2">
            <li className="flex gap-2 items-center text-sm">
              <span className="inline-block md:w-[25%] w-[35%] font-medium">
                Product Name
              </span>
              <span className="text-gray-500">:</span>
              <span className="text-gray-800">{orderData?.product?.name}</span>
            </li>
            <li className="flex gap-2 items-center text-sm">
              <span className="inline-block md:w-[25%] w-[35%] font-medium">
                Order Date
              </span>
              <span className="text-gray-500">:</span>
              <span className="text-gray-800">{orderData?.order_date}</span>
            </li>
            <li className="flex gap-2 items-center text-sm">
              <span className="inline-block md:w-[25%] w-[35%] font-medium">
                Order Id
              </span>
              <span className="text-gray-500">:</span>
              <span className="text-gray-800">{orderData?.id}</span>
            </li>
            <li className="flex gap-2 items-center text-sm">
              <span className="inline-block md:w-[25%] w-[35%] font-medium">
                Amount
              </span>
              <span className="text-gray-500">:</span>
              <span className="text-gray-800">{orderData?.amount}</span>
            </li>
            <li className="flex gap-2 items-center text-sm">
              <span className="inline-block md:w-[25%] w-[35%] font-medium">
                Status
              </span>
              <span className="text-gray-500">:</span>
              <span className="text-blue-600">{orderData?.status?.charAt(0)?.toUpperCase() +  orderData?.status?.slice(1)}</span>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
}

export default OrderListing;
