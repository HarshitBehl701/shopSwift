import { useLocation, useParams } from "react-router-dom"
import { Card} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FormEvent, useCallback, useState } from "react";
import { IOrderModal } from "@/interfaces/commonInterfaces";
import { formatDate, getImagePathUrl, handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import Popup from "@/components/myComponents/Popup";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { manageOrder } from "@/api/orderApi";
import { IApiResponse, IMangeOrder } from "@/interfaces/apiInterfaces";
import { ToastContainer } from "react-toastify";

// order status:  'Pending','Processing','Shipped','Delivered','Cancelled','Refunded','Failed','On Hold','Returned'

function OrderDetails() {
    const {orderId} = useParams();
    const location  = useLocation();
    const [order,setOrder] = useState(location.state as  IOrderModal || null);
    const [cancelReason,setCancelReason] = useState<string>("");

    const handleCancelReasonForm  = useCallback(async(ev:FormEvent) =>{
      ev.preventDefault();
      if(orderId)
      {
        try {
          const  response  =   await manageOrder({order_id:parseInt(orderId),order_status:"Cancelled",cancel_reason:cancelReason}) as IApiResponse;

          if(response.status)
          {
            handleToastPopup({message:"Successfully Cancel The Order",type:"success"});
            setOrder((prev) =>({...prev,order_status:"cancel"}));
          }else{
            handleToastPopup({message:(response.message),type:"error"});
          }

        } catch (error) {
            handleToastPopup({message:handleCatchErrors(error),type:"error"});
        }
      }
    },[cancelReason,orderId]);

    const  handleOrderStatusChange  =  useCallback(async(status:IMangeOrder['order_status']) =>  {
        if(orderId && typeof  status === 'string' &&  window.confirm(`Are you  sure  you  want to  change order   status  to  ${status}`))
        {
          try {
            const response   =  await  manageOrder({order_id:parseInt(orderId),order_status:status}) as IApiResponse;
            if(response.status)
            {
              handleToastPopup({message:`Successfully  Change Order Status  to ${status}`,type:"success"});
              setOrder((prev)  => ({...prev,'order_status':status}));
            }else
              handleToastPopup({message:(response.message),type:"error"});

          } catch (error) {
              handleToastPopup({message:handleCatchErrors(error),type:"error"});
          }
        }
    },[orderId]);

    const [newOrderStatus] = useState<{[key:string]:string}>({
      'Pending':'Processing',
      'Processing':'Shipped',
      'Shipped':'Delivered',
    });

  return (
    <div>
      <h1 className="capitalize text-2xl mb-4 font-semibold">Order ID : {orderId}</h1>
       <div className="">
      {/* Main Section */}
      <Card className="flex flex-col md:flex-row mb-3 gap-6 p-6 items-center md:items-start">
        {/* Left: Profile Image */}
        <div className="w-32 h-32">
          <Avatar className="w-full h-full border shadow-sm border-gray-400">
            <AvatarImage src={getImagePathUrl('user',order.user_photo)} alt="User" className="object-cover" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <p className="text-center font-semibold  text-sm mt-2">User  Photo</p>
        </div>

        {/* Right: User Details */}
        <div className="flex-1 space-y-1">
          <h2 className="text-2xl font-semibold">{order.product_name}</h2>
          <p className="text-gray-600">Price :  ₹ {order.price}</p>
          <p className="text-gray-600">Order On : {formatDate(order.created_at)}</p>
          <p className="text-gray-600">Order Status : {order.order_status}</p>

          {order.order_status  !== 'On Hold' && Object.values(newOrderStatus).length  >  0 && <Button onClick={() => handleOrderStatusChange(newOrderStatus[order.order_status  as keyof typeof  newOrderStatus] as  IMangeOrder['order_status'])} className="bg-blue-600  hover:bg-blue-700 text-white cursor-pointer text-xs px-3 font-semibold">Mark  Order  As {(newOrderStatus[order.order_status  as keyof typeof  newOrderStatus])}</Button>}

          {order.order_status  === 'On Hold' && <Button onClick={() => handleOrderStatusChange("Pending")} className="bg-blue-600  hover:bg-blue-700 text-white cursor-pointer text-xs px-3 font-semibold">Remove Hold</Button>}

          {!['Delivered','Cancelled','On Hold'].includes(order.order_status) && <Button  onClick={() => handleOrderStatusChange('On Hold')} className="cursor-pointer" variant={"link"}>Hold Order</Button>}
          
          {!['Delivered','Cancelled','Failed'].includes(order.order_status) &&
          <Popup buttonText="Cancel Order" buttonVariant="link" buttonStyling="text-red-500 bg-transparent">
            <form onSubmit={handleCancelReasonForm} className="space-y-3">
            <Label className="block mb-4">Enter Reason For Cancelling  This Order</Label>
            <Textarea className="resize-none" placeholder="Type  Reason..." value={cancelReason} onChange={(ev) => setCancelReason(ev.target.value)}></Textarea>
            <Button   type="submit" className="bg-black   text-white cursor-pointer">Submit</Button>
            </form>
          </Popup>
          }
        </div>
      </Card>

      {/* Bottom Section */}
      <Card className="mt-6 p-6">
        <h3 className="text-xl font-semibold">Additional Information</h3>
        <p className="text-gray-600">User Name : {order.user_name}</p>
        <p className="text-gray-600">Delivery  Address : {order.address}</p>
        <p className="text-gray-600">Last Update : {formatDate(order.updated_at)}</p>
        <p className="text-gray-600">Status: {order.is_active ? "Active" :  "Inactive"}</p>
      </Card>
    </div>
    <ToastContainer />
    </div>
  )
}

export default OrderDetails