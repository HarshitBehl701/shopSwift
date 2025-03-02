import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormEvent, useCallback, useState } from "react";
import { ILoginFormFields } from "@/interfaces/componentsInterface";
import { handleCatchErrors, handleToastPopup, setUserLogin } from "@/utils/commonUtils";
import { validateSchema } from "@/validations/validateSchema";
import { sellerLoginSchema } from "@/validations/schema/sellerSchema";
import { loginSeller } from "@/api/sellerApi";
import { ILoginSellerResponse } from "@/interfaces/apiInterfaces";
import { ToastContainer } from "react-toastify";
import { useUserContext } from "@/contexts/userContext";

export default function Login() {
  const [formData,setFormData] = useState({email:"",password:""}  as ILoginFormFields);
  const {setUserData,setIsLoggedIn} = useUserContext();

  const hanldeFormSubmit = useCallback(async(ev:FormEvent) => {
    ev.preventDefault();
    if(formData){
      try {
        const validateFormFields = validateSchema(sellerLoginSchema,formData);

        if(Array.isArray(validateFormFields))
        {
          validateFormFields.map((err) => handleToastPopup({message:err,type:'error'}));
        }else{
          const  response  = await  loginSeller({email:formData.email,seller_password:formData.password});
          if(response.status && response.data)
          {
            const   responseData  = response.data as  ILoginSellerResponse;
            handleToastPopup({message:"Successfully Login  To Account",type:"success"});  
            setTimeout(() => {
              setUserLogin(responseData.loginToken);
              setUserData(responseData.userData);
              setIsLoggedIn(true);
            },1000);
          }else
            handleToastPopup({message:response.message,type:"error"});  
        }
      } catch (error) {
        handleToastPopup({message:handleCatchErrors(error),type:"error"});
      }
    }
  },[formData,setIsLoggedIn,setUserData]);

  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-96 p-6 shadow-md  border-gray-300">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form  onSubmit={hanldeFormSubmit}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" className="mt-1" value={formData.email} onChange={(e) => setFormData((prev) => ({...prev,"email":e.target.value}))} />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" className="mt-1" value={formData.password} onChange={(e) => setFormData((prev) => ({...prev,"password":e.target.value}))}  />
            </div>
            <Button className="w-full  bg-gray-900 text-white   hover:bg-black cursor-pointer">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
    <ToastContainer   />
    </>
  );
}