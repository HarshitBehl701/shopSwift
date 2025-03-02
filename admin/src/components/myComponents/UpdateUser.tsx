import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { IUpdateUserParam } from "@/interfaces/componentsInterface";
import { FormEvent, useCallback, useState } from "react";
import { IApiResponse, IManageUser } from "@/interfaces/apiInterfaces";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { ToastContainer } from "react-toastify";
import { manageUser } from "@/api/userApi";

function UpdateUser({userData}:IUpdateUserParam) {
  const   [formData,setFormData] = useState({
    user_id: userData.id,
    user_name: userData.user_name,
    user_email: userData.email,
    user_address: userData.address,
    is_verified: userData.is_verified,
    change_verification_code: userData.is_verified,
    verification_expiration: userData.verification_expiration,
    is_active: userData.is_active,
  } as IManageUser);

  const handleFormSubmit  =   useCallback(async  (ev:FormEvent) => {
    ev.preventDefault();
    try {
        const response =  await manageUser(formData) as  IApiResponse;
        if(response.status)
        {
          handleToastPopup({message:"Successfully Updated  User Data",type:"success"});
        }else   
          handleToastPopup({message:(response.message),type:"error"});
    } catch (error) {
      handleToastPopup({message:handleCatchErrors(error),type:"error"});
    }
  },[formData]);

  return (
    <>
    <h1 className="font-semibold text-xl">Update  User</h1>
      <form onSubmit={handleFormSubmit} className="space-y-3">
        {/* User Name */}
        <div>
          <Label htmlFor="user_name">User Name</Label>
          <Input id="user_name" placeholder="Enter user name"  value={formData.user_name}  onChange={(e) =>  setFormData((prev)  => ({...prev,"user_name":e.target.value}))} />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="user_email">Email</Label>
          <Input id="user_email" type="email" placeholder="Enter email" value={formData.user_email}  onChange={(e) =>  setFormData((prev)  => ({...prev,"user_email":e.target.value}))}  />
        </div>
        
        {/* User Address */}
        <div>
          <Label htmlFor="user_address">User Address</Label>
          <Input id="user_address" type="text" placeholder="Enter user  address" value={formData.user_address}  onChange={(e) =>  setFormData((prev)  => ({...prev,"user_address":e.target.value}))}  />
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="user_password">Password</Label>
          <Input id="user_password" type="password" placeholder="Enter password" value={formData.user_password ?? ""}  onChange={(e) =>  setFormData((prev)  => ({...prev,"user_password":e.target.value}))} />
        </div>

        {/* Verification Expiration (Date-Time) */}
        <div>
          <Label htmlFor="verification_expiration">Set New Verification Expiration</Label>
          <Input id="verification_expiration" type="datetime-local" value={(new Date()).toISOString().slice(0,16)}  onChange={(e) =>  setFormData((prev)  => ({...prev,"verification_expiration":new  Date(e.target.value)}))} />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center space-x-2">
          <Checkbox id="is_verified" checked={formData.is_verified  == 1} onCheckedChange={() => setFormData((prev) => ({...prev,"is_verified": prev.is_verified  == 1  ? 0 : 1}))} />
          <Label htmlFor="is_verified">Is Verified</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="change_verification_code"  checked={formData.change_verification_code  == 1} onCheckedChange={() => setFormData((prev) => ({...prev,"change_verification_code": prev.change_verification_code  == 1  ? 0 : 1}))} />
          <Label htmlFor="change_verification_code">Change Verification Code</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="is_active" checked={formData.is_active  == 1} onCheckedChange={() => setFormData((prev) => ({...prev,"is_active": prev.is_active  == 1  ? 0 : 1}))} />
          <Label htmlFor="is_active">Is Active</Label>
        </div>

        {/* Submit Button */}
        <Button className="w-full bg-black  text-white text-xs">Submit</Button>
      </form>
      <ToastContainer />
    </>
  )
}

export default UpdateUser