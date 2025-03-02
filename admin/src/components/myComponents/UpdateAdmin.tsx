import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { IUpdateAdminParam } from "@/interfaces/componentsInterface";
import { FormEvent, useCallback, useState } from "react";
import { IApiResponse, IUpdateAdminAccount } from "@/interfaces/apiInterfaces";
import { updateAdminAccount } from "@/api/adminApi";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { ToastContainer } from "react-toastify";

function UpdateAdmin({userData}:IUpdateAdminParam) {

  const [formData,setFormData] = useState({
    admin_id: userData.admin_id,
    admin_name: userData.admin_name,
    admin_email: userData.admin_email,
    admin_password: userData.admin_password,
    is_active: userData.is_active,
  } as IUpdateAdminAccount);

  const handleFormSubmit = useCallback(async  (ev:FormEvent) => {
    ev.preventDefault();
    try {
        const response =  await updateAdminAccount(formData) as  IApiResponse;
        if(response.status)
        {
          handleToastPopup({message:"Successfully Updated Admin Data",type:"success"});
        }else   
          handleToastPopup({message:(response.message),type:"error"});
    } catch (error) {
      handleToastPopup({message:handleCatchErrors(error),type:"error"});
    }
  },[formData]);

  return (
    <>
      <h1 className="font-semibold text-xl">Update Admin</h1>
      <form onSubmit={handleFormSubmit} className="space-y-3">
        {/* Admin Name */}
        <div>
          <Label htmlFor="admin_name">Admin Name</Label>
          <Input id="admin_name" placeholder="Enter admin name" value={formData.admin_name} onChange={(e) => import.meta.env.VITE_ADMIN_EMAIL !== formData.admin_email ? setFormData((prev) =>  ({...prev,'admin_name':e.target.value})):null} readOnly={import.meta.env.VITE_ADMIN_EMAIL === formData.admin_email}  />
        </div>

        {/* Admin Email */}
        <div>
          <Label htmlFor="admin_email">Admin Email</Label>
          <Input id="admin_email" type="email" placeholder="Enter admin email" value={formData.admin_email} onChange={(e) =>  import.meta.env.VITE_ADMIN_EMAIL !== formData.admin_email ?  setFormData((prev) =>  ({...prev,'admin_email':e.target.value})) : null} readOnly={import.meta.env.VITE_ADMIN_EMAIL === formData.admin_email}  />
        </div>

        {/* Admin Password */}
        <div>
          <Label htmlFor="admin_password">Set New Password</Label>
          <Input id="admin_password" type="password" placeholder="Set New Password" value={formData.admin_password} onChange={(e) =>   setFormData((prev) =>  ({...prev,'admin_password':e.target.value}))}  />
        </div>

        {/* Is Active Checkbox */}
        {import.meta.env.VITE_ADMIN_EMAIL !== formData.admin_email && <div className="flex items-center space-x-2">
          <Checkbox id="is_active" checked={formData.is_active? true :  false} onCheckedChange={() => setFormData((prev)=> ({...prev,"is_active": prev.is_active ==  1  ?  0  :  1}))} />
          <Label htmlFor="is_active">Is Active</Label>
        </div>}

        {/* Submit Button */}
        <Button className="w-full bg-black  text-white text-xs">Submit</Button>
      </form>
      <ToastContainer  />
    </>
  );
}

export default UpdateAdmin;