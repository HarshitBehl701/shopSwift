import { IManageUserParam } from "@/interfaces/componentsInterface";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { manageUser } from "@/api/userApi";
import { manageSeller } from "@/api/sellerApi";
import { updateAdminAccount } from "@/api/adminApi";
import { IAdminModal, ISellerModal, IUserModal } from "@/interfaces/commonInterfaces";
import { ToastContainer } from "react-toastify";
import Popup from "./Popup";
import UpdateUser from "./UpdateUser";
import UpdateSeller from "./UpdateSeller";
import UpdateAdmin from "./UpdateAdmin";

function ManageUser({userType,userData,setUserData}:IManageUserParam) {
    const handleChangeStatus  = useCallback(async () =>{
        try {
            const response   = (userType?.includes("user")) ? await  manageUser({user_id:(userData  as   IUserModal).id,is_active: userData.is_active ==  1  ? 0 : 1}) : (userType?.includes("seller") ?  await manageSeller({seller_id:(userData as ISellerModal).id,is_active:  userData.is_active == 1  ?   0   : 1}) : (userType?.includes("admin") ?  updateAdminAccount({admin_id:(userData as IAdminModal).admin_id,is_active: userData.is_active ===  1 ? 0 : 1}) :  null));

            if(response)
            {
                if(response.status)
                {
                    handleToastPopup({message:"Successfully Change User Status",type:"success"});
                    setUserData((prev) => ({...prev,is_active:(userData.is_active?0:1)}));
                }else{  
                    handleToastPopup({message:(response.message),type:"error"});
                }
            }   
        } catch (error) {   
            handleToastPopup({message:handleCatchErrors(error),type:"error"});
        }
    },[userData,userType,setUserData]);

  return (
    <>
        {userType  !==  'admin'   &&  <Button onClick={handleChangeStatus} variant={"link"} className={`${userData.is_active ?  "text-red-500" : "text-green-600"} p-0  mr-2 cursor-pointer`}>{userData.is_active ?  "Inactive" : "Active"} Account</Button>}
        <Popup  buttonText="Edit Profile">
            {userType?.includes("user")  && <UpdateUser userData={(userData as  IUserModal)} />}
            {userType?.includes("seller")  && <UpdateSeller userData={(userData as  ISellerModal)} />}
            {userType?.includes("admin")  && <UpdateAdmin userData={(userData as  IAdminModal)} />}
        </Popup>
        <ToastContainer   />
    </>
  )
}

export default ManageUser