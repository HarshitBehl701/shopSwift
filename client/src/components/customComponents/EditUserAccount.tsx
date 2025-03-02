import { useUserContext } from "@/contexts/userContext"
import Popup from "./Popup"
import { FormEvent, useCallback, useState } from "react";
import { IApiResponse, IUpdateUserAccount } from "@/interfaces/apiInterfaces";
import { ToastContainer } from "react-toastify";
import { validateSchema } from "@/validations/validateSchema";
import { editUserAccountSchema } from "@/validations/schema/userValidations";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { updateUserAccount } from "@/api/userApi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

function EditUserAccount() {
    const  {userData} = useUserContext();
    const  [formData,setFormData] = useState({} as  IUpdateUserAccount);
    const  handleForm   = useCallback(async  (ev:FormEvent) =>  {
        ev.preventDefault();
        const validateUserForm  = validateSchema(editUserAccountSchema,formData);
        if(Array.isArray(validateUserForm))
        {
            validateUserForm.map((error) => handleToastPopup({message:error,type:"error"}));
        }else if(Object.keys(formData).length  === 0){
            setTimeout(() =>  window.location.reload(),0);
        }else{
            try {
                const  response  =  await updateUserAccount(formData) as IApiResponse;
                if(response.status)
                {
                    handleToastPopup({message:"Successfully  Updated User  Account",type:"success"});
                    setTimeout(()=>window.location.reload(),2000);
                }else{
                    handleToastPopup({message:(response.message),type:"error"});
                }
            } catch (error) {
                handleToastPopup({message:handleCatchErrors(error),type:"error"});
            }
        }

    },[formData]);
  return (
    <>
        <Popup buttonText="Edit  Profile">
        <form onSubmit={handleForm}>
            <h1 className="mb-3 font-semibold  text-xl">Edit  Profile</h1>
            <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="user_name">Username</Label>
                <Input id="user_name" placeholder="Enter your username"  value={formData.user_name ??  userData?.user_name} onChange={(e) => setFormData(prev =>({...prev,user_name:e.target.value}))} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="user_email">Email</Label>
                <Input id="user_email" type="email" placeholder="Enter your email" value={formData.user_email ??  userData?.email} onChange={(e) => setFormData(prev =>({...prev,user_email:e.target.value}))}  />
            </div>
            <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" className="resize-none" placeholder="Enter your address" value={formData.address ??  userData?.address} onChange={(e) => setFormData(prev =>({...prev,address:e.target.value}))}  />
            </div>
            <div className="space-y-2">
                <Label htmlFor="user_password">Password</Label>
                <Input id="user_password" type="password" placeholder="Enter your password" value={formData.user_password ??  ''} onChange={(e) => setFormData(prev =>({...prev,user_password:e.target.value}))} />
            </div>
            <Button type="submit" className="w-full cursor-pointer">Submit</Button>
            </div>
        </form>
        </Popup>
        <ToastContainer />
    </>
  )
}

export default EditUserAccount