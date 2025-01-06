import React, { useState,useEffect } from 'react'
import {ToastContainer}  from 'react-toastify'
import {handleError,handleSuccess}  from "../utils/toastContainerHelperfn"
import {getOrder}  from "../api/order";
import { Carousel } from "flowbite-react";
import ExpandableDescription from "./ExpandableDescription";

function ManageOrders({orderId}) {

    const [orderDetails,setOrderDetails] = useState({});

    useEffect(()  => {
        const getOrderDetails = async() => {
            try{
                const response  = await getOrder(localStorage.getItem('token'),localStorage.getItem('userType'),orderId);

                if(!response.status)
                {
                    handleError('Some  Unexpected  Error Occured')
                }else{
                    setOrderDetails(response.data);
                }

            }catch(error){
                handleError(error.message)
            }
        }
        getOrderDetails();
    },[]);

  return (
    <>
    <div className="order-details-container p-4 border rounded-lg shadow-sm">
      <h1 className="text-xl font-semibold mb-4">Order Details</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Carousel Section */}
        <div className="imageContainer w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
          {Array.isArray(orderDetails.productDetail?.image) && orderDetails.productDetail?.image.length > 0 ? (
            <Carousel
              pauseOnHover
              indicators={false}
              controls={false}
              leftControl=" "
              rightControl=" "
            >
              {orderDetails.productDetail?.image.map((src, index) => (
                <img
                  key={index}
                  src={`/uploads/other/${src}`}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-full object-cover  object-top rounded-md"
                />
              ))}
            </Carousel>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex-1">
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">Name:</span>
              <span className="flex-1">{orderDetails.productDetail?.name}</span>
            </li>
            {orderDetails.productDetail?.description &&  <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">
                Description:
              </span>
              <span className="flex-1">
                <ExpandableDescription description={orderDetails.productDetail.description} limit={50} />
              </span>
            </li>}
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">Quantity:</span>
              <span className="flex-1">{orderDetails.quantity}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">Total:</span>
              <span className="flex-1">{orderDetails.amount} ₹</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">Status:</span>
              <span className="flex-1 capitalize">{orderDetails.status}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">
                Order Date:
              </span>
              <span className="flex-1">{orderDetails.createdAt}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default ManageOrders