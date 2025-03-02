import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { IUpdateSellerParam } from "@/interfaces/componentsInterface";
import { FormEvent, useCallback, useState } from "react";
import { IApiResponse, IManageSeller } from "@/interfaces/apiInterfaces";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { ToastContainer } from "react-toastify";
import { manageSeller } from "@/api/sellerApi";

function UpdateSeller({userData}:IUpdateSellerParam) {
    const [formData,setFormData] = useState({
        seller_id: userData.id,
        seller_name: userData.seller_name,
        brand_name: userData.brand_name,
        email: userData.email,
        is_verified: userData.is_verified,
        change_verification_code: userData.is_verified,
        verification_expiration: userData.verification_expiration,
        is_active: userData.is_active,
    } as  IManageSeller);
    

  const handleFormSubmit  =   useCallback(async  (ev:FormEvent) => {
      ev.preventDefault();
      try {
          const response =  await manageSeller(formData) as  IApiResponse;
          if(response.status)
          {
            handleToastPopup({message:"Successfully Updated Seller Data",type:"success"});
          }else   
            handleToastPopup({message:(response.message),type:"error"});
      } catch (error) {
        handleToastPopup({message:handleCatchErrors(error),type:"error"});
      }
    },[formData]);

  return (
    <>
      <h1 className="font-semibold text-xl">Update Seller</h1>
      <form onSubmit={handleFormSubmit} className="space-y-3">
        {/* Seller Name */}
        <div>
          <Label htmlFor="seller_name">Seller Name</Label>
          <Input id="seller_name" placeholder="Enter seller name" value={formData.seller_name} onChange={(e) => setFormData(prev =>  ({...prev,"seller_name":e.target.value}))} />
        </div>

        {/* Brand Name */}
        <div>
          <Label htmlFor="brand_name">Brand Name</Label>
          <Input id="brand_name" placeholder="Enter brand name" value={formData.brand_name} onChange={(e) => setFormData(prev =>  ({...prev,"brand_name":e.target.value}))}  />
        </div>

        {/* GSTIN */}
        <div>
          <Label htmlFor="gstin">GSTIN</Label>
          <Input id="gstin" placeholder="Enter GSTIN" value={formData.gstin} onChange={(e) => setFormData(prev =>  ({...prev,"gstin":e.target.value}))}  />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email" value={formData.email} onChange={(e) => setFormData(prev =>  ({...prev,"email":e.target.value}))}   />
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="seller_password">Password</Label>
          <Input id="seller_password" type="password" placeholder="Enter password"  value={formData.seller_password} onChange={(e) => setFormData(prev =>  ({...prev,"seller_password":e.target.value}))}   />
        </div>

        {/* Verification Expiration (Date-Time) */}
        <div>
          <Label htmlFor="verification_expiration">Verification Expiration</Label>
          <Input id="verification_expiration" type="datetime-local" value={new Date().toISOString().slice(0, 16)} onChange={(e) => setFormData(prev =>  ({...prev,"verification_expiration":new  Date(e.target.value)}))} />
        </div>

        {/* Checkboxes */}
        <div className="flex gap-3 items-center justify-center">
        <div className="flex items-center space-x-2">
          <Checkbox id="is_verified" checked={formData.is_verified ===  1} onCheckedChange={() =>  setFormData(prev =>  ({...prev,"is_verified": prev.is_verified === 1  ? 0 :  1}))} />
          <Label htmlFor="is_verified">Is Verified</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="change_verification_code" checked={formData.change_verification_code ===  1} onCheckedChange={() =>  setFormData(prev =>  ({...prev,"change_verification_code": prev.change_verification_code === 1  ? 0 :  1}))} />
          <Label htmlFor="change_verification_code">Change Verification Code</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="is_active"  checked={formData.is_active ===  1} onCheckedChange={() =>  setFormData(prev =>  ({...prev,"is_active": prev.is_active === 1  ? 0 :  1}))} />
          <Label htmlFor="is_active">Is Active</Label>
        </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full bg-black  text-white text-xs">Submit</Button>
      </form>
      <ToastContainer />
    </>
  );
}

export default UpdateSeller;