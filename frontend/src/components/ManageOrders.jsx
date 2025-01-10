import React, { useState,useEffect } from 'react'
import  {Link} from "react-router-dom"
import {ToastContainer}  from 'react-toastify'
import {handleError, handleSuccess}  from "../utils/toastContainerHelperfn"
import { Carousel } from "flowbite-react";
import ExpandableDescription from "./ExpandableDescription";

import  {fetchUserOrderData} from  "../utils/manageUserProfileHelper";
import { getLocalStorageVariables } from '../utils/commonHelper';
import  {updateOrderStatus} from "../api/order";
import   {updateRatingOrderHelper,createCommentHelper} from "../utils/orderHelpers";

function ManageOrders({orderId}) {
    const [orderDetails,setOrderDetails] = useState({});
    const  [currentProductRating,setCurrentProductRating]  = useState(0);
    const   [token,currentUser] =  getLocalStorageVariables('all');
    useEffect(()  => {

      const main =   async  ()  => {
        const response   = await fetchUserOrderData(orderId);
        if(!response.status)
          {
              handleError('Some  Unexpected  Error Occured')
          }else{
              setCurrentProductRating(response.data.rating);
              setOrderDetails(response.data);
          }
      }

      main();

    },[]);

    const allowedOrderStatusWithThereOppositeStatus =  {
      "ordered" : "processing", 
      "processing" :  "out for delivery",
      "out for delivery" : "delivered",
     }

    const handleOrderUpdateStatus =  async (newStatus)  => {
      if(window.confirm(`Are you sure you want to change this order  status to "${newStatus}"?`)){
        try{
          const  response = await updateOrderStatus(token,currentUser,orderId,newStatus.trim());
          if(response.status)
            handleSuccess('Successfully  Updated the   Status')
            setTimeout(()  => {window.location.reload()},1000);
        }catch(error){
          handleError(error.message);
        }
      }
    }

    const updateRatingFn = async (newRating) => {
      setCurrentProductRating(newRating);
      const response   = await updateRatingOrderHelper(orderDetails.productDetail._id,orderDetails._id,newRating + 1);
      if(response.status){
        handleSuccess('Thank you  rating this product');
        setTimeout(()  => handleSuccess('Successfully  update  product   rating'),1000);
        setTimeout(() => window.location.reload(),2000);
      }else{
        handleError('Some Error Occured');
      }
    }

    const submitCommentHandler = async (ev) => {
      ev.preventDefault();
      const comment  =  ev.target[0].value.trim();
      if(comment.length >  0 && comment != ' '){
        const is_allow = (orderDetails.comments.length > 0) ? window.confirm('Your comment  Already added  for   this  order  do  you  still  want  to  add another  comment') : true;
        if(is_allow){
          const response  =  await createCommentHelper(orderDetails.productDetail._id,orderDetails._id,comment);
            if(!response.status){
              handleError(response.message);
            }else{
              handleSuccess('Thanks For Adding Comment');
              setTimeout(() => window.location.reload(),1000);
            }
        }   
      }else{
        handleError('Comment  Cannot Be empty');
      }
    }

  return (
    <>
    <div className="order-details-container">
      <div className="header mb-4 flex justify-between  items-center  flex-wrap">
      <h1 className="text-xl font-semibold">Order Details</h1>
      <div className="buttonContainer flex  gap-2">
      {currentUser == 'seller'   &&  orderDetails.status  !== 'cancelled' && orderDetails.status  !== 'delivered'  &&  <button  className='text-xs rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold px-2 py-1' onClick={()  => handleOrderUpdateStatus("cancelled")} >Cancel Order</button>}
      {currentUser == 'seller' &&  orderDetails.status  !== 'cancelled' && orderDetails.status  !== 'delivered'  &&  <button  className='text-xs rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold px-2 py-1' onClick={()  => handleOrderUpdateStatus(allowedOrderStatusWithThereOppositeStatus[orderDetails.status])}>Mark as {allowedOrderStatusWithThereOppositeStatus[orderDetails.status]}</button>}
      {currentUser == 'seller'   &&  <Link  to={`/seller/product/${orderDetails.productDetail?._id}`} className='text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2 py-1'>View Product</Link>}
      </div>
      </div>

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
            {(currentUser  == 'user') && orderDetails.productDetail?.description &&  <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">
                Description:
              </span>
              <span className="flex-1">
                <ExpandableDescription description={orderDetails.productDetail.description} limit={50} />
              </span>
            </li>}
            {(currentUser == 'seller') && <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">Order ID:</span>
              <span className="flex-1">{orderDetails._id}</span>
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
            {orderDetails.status  == 'delivered'  && currentUser ==  'user' && <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">Rating:</span>
              <span className="flex-1 text-2xl">{[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={currentProductRating != 0  && index <= currentProductRating  ? "text-yellow-400 cursor-pointer":"text-gray-300 cursor-pointer"}
                      onClick={()=> updateRatingFn(index)}
                    >
                      ★
                    </span>
                  ))}</span>
            </li>}
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">
                Order Date:
              </span>
              <span className="flex-1">{orderDetails.createdAt}</span>
            </li>
            {currentUser  == 'seller' &&  (<li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">
                Delivery  Address:
              </span>
              <span className="flex-1">{orderDetails.userDetail?.address}</span>
            </li>)}
            {currentUser  ==   'user'  && Array.isArray(orderDetails.comments) &&   <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">
                Your Valuable  Comment:
              </span>
              <span className="flex-1">{orderDetails.comments.map((val,index) => <span key={index} className='block'>{val.comment}</span>)}</span>
            </li>}
            {currentUser  == 'user' &&  <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-600 w-1/3">Comment:</span>
              <span className="flex-1 capitalize">
                <form method="post"  onSubmit={(ev)  => submitCommentHandler(ev)}>
                  <textarea  name='comment'  className='w-full  border-gray-400 rounded-md  shadow-sm' placeholder='please write a comment for this product..'></textarea>
                  <input type="submit" value="Add Comment" className='bg-blue-600 hover:bg-blue-700  text-white  font-semibold  px-2  py-1  rounded-md  text-xs block mt-2  cursor-pointer' />
                </form>
              </span>
            </li>}
          </ul>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default ManageOrders