import { FormEvent, useCallback, useState } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { IRegisterNewSeller } from "@/interfaces/apiInterfaces"
import { ToastContainer } from "react-toastify";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { useNavigate } from "react-router-dom";
import { validateSchema } from "@/validations/validateSchema";
import { registerSeller } from "@/api/sellerApi";
import { registerSellerSchema } from "@/validations/schema/sellerValidations";

function SellerRegistration() {
  const [formData,setFormData] = useState({}  as IRegisterNewSeller);
  const navigate  =  useNavigate();

  const handleFormSubmit =  useCallback(async(ev:FormEvent) => {
    ev.preventDefault();
    try {

      const formValidation =  validateSchema(registerSellerSchema,formData);

      if(Array.isArray(formValidation))
      {
          formValidation.map((err) =>handleToastPopup({message:err,type:"error"}));
      }else{
        const response   = await registerSeller(formData);

        if(response.status)
        {
          handleToastPopup({message:"Successfully  registered, please  check your  email to verify your account",type:"success"});
          setTimeout(() => navigate("/home"),2000);
        }else{
          handleToastPopup({message:(response.message),type:"error"});
        }
      }

    } catch (error) {
      handleToastPopup({message:handleCatchErrors(error),type:"error"});
    }
  },[formData,navigate]);

  return (
    <div className="w-full p-6 h-screen  items-center flex justify-center">
  <Card className="max-w-md w-full h-fit p-8 rounded-lg shadow-lg bg-white">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>

    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="name"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Your Full Name"
          value={formData.seller_name}
          onChange={(e) =>  setFormData((prev) =>  ({...prev,seller_name:e.target.value}))}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          id="email"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Your Email Address"
          value={formData.email}
          onChange={(e) =>  setFormData((prev) =>  ({...prev,email:e.target.value}))}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Brand Name</label>
        <input
          type="text"
          id="brandName"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter Brand  Name"
          value={formData.brand_name}
          onChange={(e) =>  setFormData((prev) =>  ({...prev,brand_name:e.target.value}))}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Create a Password"
          value={formData.seller_password}
          onChange={(e) =>  setFormData((prev) =>  ({...prev,seller_password:e.target.value}))}
        />
      </div>

      <Button className="w-full text-white py-3 rounded-md cursor-pointer">
        Register
      </Button>
    </form>
  </Card>
  <ToastContainer  />
</div>

  )
}

export default SellerRegistration