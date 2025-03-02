import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FormEvent, useCallback, useState } from "react";
import { ILoginAdmin, ILoginAdminResponse } from "@/interfaces/apiInterfaces";
import { ToastContainer } from "react-toastify";
import { validateSchema } from "@/validations/validateSchema";
import { loginAdminSchema } from "@/validations/schema/adminSchema";
import { handleCatchErrors, handleToastPopup, setUserLogin } from "@/utils/commonUtils";
import { loginAdmin } from "@/api/adminApi";
import { useAdminContext } from "@/contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData,setFormData] = useState({email:"",password:""} as ILoginAdmin);
  const {setAdminData,setIsLoggedIn} =  useAdminContext();
  const  navigate  = useNavigate();
  const handleFormSubmit = useCallback(async (ev:FormEvent) => {
    ev.preventDefault();

    const  validateFormData  =  validateSchema(loginAdminSchema,formData);
    if(Array.isArray(validateFormData))
      validateFormData.map((err)  =>  handleToastPopup({message:err,type:"error"}));
    else{
      try {
        const  response = await loginAdmin(formData);
        if(response.status &&  response.data)
        {
          const responseData = response.data as  ILoginAdminResponse;
          setUserLogin(responseData.loginToken);
          setAdminData(responseData.userData);
          setIsLoggedIn(true);
          handleToastPopup({message:"Login Successfully",type:"success"});
          setTimeout(()=> navigate("/dashboard"),1000);  
        }else{
          handleToastPopup({message:(response.message),type:"error"});  
        }
      } catch (error) {
        handleToastPopup({message:(handleCatchErrors(error)),type:"error"});
      }
    }

  },[formData,setAdminData,setIsLoggedIn,navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-96 p-6 shadow-md  border-gray-300">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" className="mt-1" value={formData['email']} onChange={(e) =>  setFormData(prev => ({...prev,'email':e.target.value}))}/>
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" className="mt-1" value={formData['password']} onChange={(e) =>  setFormData(prev => ({...prev,'password':e.target.value}))} />
            </div>
            <Button className="w-full  bg-gray-900 text-white   hover:bg-black cursor-pointer">Login</Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}