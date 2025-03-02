import { FormEvent, useCallback, useState } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { ILoginUser, ILoginUserResponse } from "@/interfaces/apiInterfaces";
import { handleCatchErrors, handleToastPopup, setUserLogin } from "@/utils/commonUtils";
import { loginUser } from "@/api/userApi";
import { ToastContainer } from "react-toastify";
import { useUserContext } from "@/contexts/userContext";
import { useNavigate } from "react-router-dom";
import { validateSchema } from "@/validations/validateSchema";
import { loginUserSchema } from "@/validations/schema/userValidations";

function Login() {
  const [formData,setFormData] = useState<ILoginUser>({} as ILoginUser);
  const {setUserData,setIsLoggedIn} = useUserContext();
  const  navigate = useNavigate();
  const handleFormSubmission  = useCallback(async (ev:FormEvent)  => {
    ev.preventDefault();
    try {
        const validateForm =  validateSchema(loginUserSchema,formData);

        if(Array.isArray(validateForm))
        {
          validateForm.map((err) =>handleToastPopup({message:err,type:"error"}));
        }else{
          const response   = await loginUser(formData);
          if(response.status &&  response.data)
          {
            const responseData = response.data as  ILoginUserResponse;
            setUserLogin(responseData.loginToken);
            setUserData(responseData.userData)
            setIsLoggedIn(true);
            handleToastPopup({message:"Successfully Login  To Account",type:"success"});
            setTimeout(()=> navigate("/dashboard"),1000);
          }else{
            handleToastPopup({message:(response.message),type:"error"});
          }
        }
    } catch (error) {
      handleToastPopup({message:handleCatchErrors(error),type:"error"});
    }
  },[formData,setIsLoggedIn,setUserData,navigate]);

  return (
    <div className="w-full p-6 flex h-screen  items-center justify-center">
  <Card className="max-w-md w-full h-fit p-8 rounded-lg shadow-lg bg-white">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>
    
    <form onSubmit={handleFormSubmission}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          id="email"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Your Email Address"
          value={formData.email}
          onChange={(e) => setFormData((prev)  => ({...prev,email:e.target.value}))}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Your Password"
          value={formData.password}
          onChange={(e) => setFormData((prev)  => ({...prev,password:e.target.value}))}
        />
      </div>

      <Button className="w-full text-white bg-blue-600 py-3 rounded-md hover:bg-blue-700">
        Login
      </Button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account? 
        <a href="/register" className="text-blue-600 hover:underline">Register Here</a>
      </p>
    </form>
  </Card>
  <ToastContainer  />
</div>

  )
}

export default Login