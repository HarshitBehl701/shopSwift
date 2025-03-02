import { Card, CardContent } from "@/components/ui/card";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Comment from "@/components/customComponents/Comment";
import { useCallback, useEffect, useState } from "react";
import { IOrderModal, IProductModal } from "@/interfaces/commonInterfaces";
import { useUserContext } from "@/contexts/userContext";
import { formatDate, handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import ImageCarousel from "@/components/customComponents/ImageCarousel";
import Reviews from "@/components/customComponents/Reviews";
import { ToastContainer } from "react-toastify";
import { cancelOrder, manageOrderRating } from "@/api/orderApi";
import { IApiResponse } from "@/interfaces/apiInterfaces";
import { useUtilFunctionsContext } from "@/contexts/utilFunctionsContext";
import { Star } from "lucide-react";

function OrderCartWhislistDetails() {
    const  {requestedPage} =  useParams();
    const location  =  useLocation();
    const [pageData] =   useState<IProductModal| IOrderModal | null>(location.state || null);
    const {userData,userOrders} = useUserContext();
    const navigate    =  useNavigate();
    const {handleUserCart,handlePlaceOrder,handleUserWhislist} = useUtilFunctionsContext();

    const handleCancelOrder =  useCallback(async() => {
      if(requestedPage?.includes('order') && pageData && Object.keys(pageData).length > 0)
      {
        if(window.confirm("Are you sure you   want   to cancel  this order?"))
        {
          try {
            const response = await cancelOrder({order_id:(pageData as  IOrderModal).id}) as  IApiResponse;

              if(response.status)
              {
                handleToastPopup({message:"Successfully Cancel Order",type:'success'});
                setTimeout(() => navigate(`/${encodeURIComponent(userData?.user_name ??  "")}/orders`),100);
              }else
                handleToastPopup({message:(response.message),type:'error'});
            
          } catch (error) {
            handleToastPopup({message:handleCatchErrors(error),type:'error'});
          }
        }
      }
    },[pageData,requestedPage,navigate,userData]);

    useEffect(() =>{
      if(pageData  &&  userData)
      {
        if(requestedPage?.includes("orders"))
        {
          const isOrderExists = userOrders?.filter((order) => order.id ===  (pageData   as IOrderModal).id);

          if(!isOrderExists  ||  (Array.isArray(isOrderExists) &&  isOrderExists.length ===  0))
            navigate(`/${encodeURIComponent(userData.user_name)}/orders`);
        }else if(requestedPage?.includes("cart"))
        {
          const  isCartExists =  userData.user_cart ? userData.user_cart.split(',').filter((obj) => obj.includes((pageData  as IProductModal).id.toString())) : null;

          if(!isCartExists  ||  (Array.isArray((isCartExists) && isCartExists.length ===  0 )))
            navigate(`/${encodeURIComponent(userData.user_name)}/cart`);

        }else   if(requestedPage?.includes("whislist"))
        {
          const  isWhislistExists =  userData.user_whislist ? userData.user_whislist.split(',').filter((obj) => obj.includes((pageData  as IProductModal).id.toString())) : null;

          if(!isWhislistExists  ||  (Array.isArray((isWhislistExists) && isWhislistExists.length ===  0 )))
            navigate(`/${encodeURIComponent(userData.user_name)}/whislist`);
        }
      }
    },[pageData,userOrders,requestedPage,navigate,userData]);

    const  handleOrderRating  =   useCallback(async (rating:number) =>{
      if(requestedPage?.includes("order") && pageData)
      {
        try {
          const response =  await  manageOrderRating({order_id:(pageData  as  IOrderModal).id,rating:rating}) as  IApiResponse;
          if(response.status)
          {
            handleToastPopup({message:"Thanks for  giving rating to this  product!",type:"success"}) ;
            setTimeout(() => window.location.reload(),1200);
            setTimeout(() => navigate(`/${encodeURIComponent(userData?.user_name ?? '')}/orders`),1000);
          }else
            handleToastPopup({message:(response.message),type:"error"}) ;

        } catch (error) {
          handleToastPopup({message:handleCatchErrors(error),type:"error"}) ;
        }
      }
    },[pageData,requestedPage,navigate,userData]);

  return (
    <div className="p-6">
      <Card className="border-none shadow-none ">
        <h1 className="text-xl  capitalize  font-semibold">{requestedPage} Details</h1>
      <CardContent className="p-6 flex gap-6 items-center">
        {/* Left Side - User Image */}
        {/* <Avatar className="w-24 h-24">
          <AvatarImage src="/placeholder.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar> */}
        {pageData &&  <ImageCarousel  images={pageData?.images} type="product"  mainCarouselCss="h-40 w-40" imageCss="h-40" />}
        
        {/* Right Side - User Details */}
        <div className="flex-1 space-y-1">
          <h2 className="text-xl font-semibold">{pageData?.product_name}</h2>
          {!requestedPage?.includes('order') && <p className="text-gray-500">{(pageData as IProductModal).brand_name}</p>}
          {requestedPage?.includes('order') && 
            <>
              <p className="text-gray-500">Order Date : {formatDate((pageData  as  IOrderModal).created_at)}</p>
              <p className="text-gray-500">Order Status : {(pageData as IOrderModal).order_status}</p>
              <p className="text-gray-500">Delivery  Address : {userData?.address}</p>
              {!((pageData  as IOrderModal).order_status.includes("Delivered") ||  (pageData  as IOrderModal).order_status.includes("Cancelled")) && <Button variant={'destructive'} className="cursor-pointer" onClick={handleCancelOrder}>Cancel Order</Button>}
              <div className="rating flex items-center gap-3">
                  {Array.from({ length: 5 }).fill(1).map((_,index) => {
                    return (
                      <Star
                        key={Math.random()}
                        className={`${
                          pageData   && (pageData  as IOrderModal).rating < index + 1
                          ?  "fill-gray-300 stroke-gray-400 cursor-pointer"
                           : "fill-yellow-500 stroke-yellow-500 cursor-pointer"
                        }`}
                        onClick={() =>  handleOrderRating(index +  1)}
                        onDoubleClick={() => handleOrderRating(0)}
                      />
                    )
                  })}
                </div>
            </>
          }
          {!requestedPage?.includes("order") &&
             <div className="flex gap-3 items-center mt-3">
             {pageData && (
               <Button
                 className={`text-xs font-semibold cursor-pointer ${
                   userData?.user_cart &&
                   userData.user_cart
                     .split(",")
                     .includes(pageData.id.toString())
                     ? "bg-red-500 hover:bg-red-600 text-white"
                     : ""
                 }`}
                 onClick={() => handleUserCart(pageData.id)}
               >
                 {userData?.user_cart &&
                 userData.user_cart
                   .split(",")
                   .includes(pageData.id.toString())
                   ? "Remove From Cart"
                   : "Add To  Cart"}
               </Button>
             )}

             {pageData &&
               userData?.user_cart &&
               userData.user_cart
                 .split(",")
                 .includes(pageData.id.toString()) && (
                 <Button className="bg-blue-600  hover:bg-blue-700 cursor-pointer" onClick={() => handlePlaceOrder(pageData.id,(pageData as IProductModal).price-(pageData  as  IProductModal).discount)}>
                   Place Order
                 </Button>
               )}

             {pageData && (
               <Button
                 className={`text-xs font-semibold cursor-pointer ${
                   userData?.user_whislist &&
                   userData.user_whislist
                     .split(",")
                     .includes(pageData.id.toString())
                     ? "bg-red-500 hover:bg-red-600 text-white"
                     : ""
                 }`}
                 onClick={() => handleUserWhislist(pageData.id)}
               >
                 {userData?.user_whislist &&
                 userData.user_whislist
                   .split(",")
                   .includes(pageData.id.toString())
                   ? "Remove From Whislist"
                   : "Add To Whislist"}
               </Button>
             )}
           </div>    
          }
          {/* <Button className="bg-green-600  hover:bg-green700">Place Order</Button> */}
        </div>
      </CardContent>
      </Card>
      {requestedPage?.includes('order') && (pageData  as IOrderModal).order_status.includes("Delivered") &&  <Comment  order_id={(pageData as IOrderModal).id} product_id={(pageData  as  IOrderModal).product_id} />}
      <Reviews product_id={(pageData as IOrderModal).product_id ?? (pageData as  IProductModal).id} />
      <ToastContainer />
    </div>
  )
}

export default OrderCartWhislistDetails