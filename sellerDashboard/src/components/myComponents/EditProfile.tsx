import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent, useCallback, useState } from "react";
import { IApiResponse, IUpdateSellerAccount } from "@/interfaces/apiInterfaces";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { ToastContainer } from "react-toastify";
import { updateAccount } from "@/api/sellerApi";
import { useUserContext } from "@/contexts/userContext";

function EditProfile() {

  const {userData} =  useUserContext();

    const [formData,setFormData] = useState({} as IUpdateSellerAccount);
    
  const handleFormSubmit  =   useCallback(async  (ev:FormEvent) => {
      ev.preventDefault();
      try {
          const response =  await updateAccount(formData) as  IApiResponse;
          if(response.status)
          {
            handleToastPopup({message:"Successfully Updated Account Details",type:"success"});
            setTimeout(() =>window.location.reload(),1000);
          }else   
            handleToastPopup({message:(response.message),type:"error"});
      } catch (error) {
        handleToastPopup({message:handleCatchErrors(error),type:"error"});
      }
    },[formData]);

  return (
    <>
      <h1 className="font-semibold text-xl">Update Account</h1>
      <form onSubmit={handleFormSubmit} className="space-y-3">
        {/* Seller Name */}
        <div>
          <Label htmlFor="seller_name">Seller Name</Label>
          <Input id="seller_name" placeholder="Enter seller name" value={formData.seller_name ?? userData?.seller_name} onChange={(e) => setFormData(prev =>  ({...prev,"seller_name":e.target.value}))} />
        </div>

        {/* Brand Name */}
        <div>
          <Label htmlFor="brand_name">Brand Name</Label>
          <Input id="brand_name" placeholder="Enter brand name" value={formData.brand_name ??  userData?.brand_name} onChange={(e) => setFormData(prev =>  ({...prev,"brand_name":e.target.value}))}  />
        </div>

        {/* GSTIN */}
        <div>
          <Label htmlFor="gstin">GSTIN</Label>
          <Input id="gstin" placeholder="Enter GSTIN" value={formData.gstin ??  userData?.gstin} onChange={(e) => setFormData(prev =>  ({...prev,"gstin":e.target.value}))}  />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email" value={formData.email ?? userData?.email} onChange={(e) => setFormData(prev =>  ({...prev,"email":e.target.value}))}   />
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="seller_password">Password</Label>
          <Input id="seller_password" type="password" placeholder="Enter password"  value={formData.seller_password  ?? ''} onChange={(e) => setFormData(prev =>  ({...prev,"seller_password":e.target.value}))}   />
        </div>
        {/* Submit Button */}
        <Button className="w-full bg-black  text-white text-xs">Submit</Button>
      </form>
      <ToastContainer />
    </>
  );
}

export default EditProfile;