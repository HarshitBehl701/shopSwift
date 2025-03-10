import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { FormEvent, useCallback, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "../ui/button";
import { getImagePathUrl, handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { updateUserAccount } from "@/api/userApi";
import { IApiResponse } from "@/interfaces/apiInterfaces";
import { useUserContext } from "@/contexts/userContext";
import { ToastContainer } from "react-toastify";
import { validateSchema } from "@/validations/validateSchema";
import { userPhotoSchema } from "@/validations/schema/userValidations";

function UpdatePhoto() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const  [file,setFile] = useState<File|null>(null);
  const {userData}  = useUserContext();

  const handleImageUpload = useCallback(async  (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        setFile(file);
    }
  },[]);

  const  handleFormSubmit  = useCallback(async (ev:FormEvent) => {
    ev.preventDefault();
    if(file)
    {
      const validateUserPhoto =  validateSchema(userPhotoSchema,file);
      if(Array.isArray(validateUserPhoto))
      {
        {validateUserPhoto.map((error) =>handleToastPopup({message:error,type:"error"}))};
      }else{
          try {   
              const  response = await updateUserAccount({userPhoto:file}) as  IApiResponse ;
              if(response.status)
              {
                  handleToastPopup({message:"Successfully Updated Profile Photo",type:"success"});
                  setFile(null);
              }else
                  handleToastPopup({message:(response.message),type:"error"});

          } catch (error) {
              handleToastPopup({message:handleCatchErrors(error),type:"error"});
          }
      }
    }
  },[file]);

  return (
    <div className="relative w-32 h-32 group">
    {/* Avatar Component */}
    <Avatar className="w-full h-full object-cover shadow-sm  border border-gray-300">
      <AvatarImage className="object-cover"
        src={file ?  URL.createObjectURL(file) :   getImagePathUrl('user',userData?.user_photo ?? '')}
        alt="User"
      />
      <AvatarFallback>
        <img
          src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg"
          alt="Fallback Avatar"
        />
      </AvatarFallback>
    </Avatar>

    {/* Camera Icon Overlay */}
    <div
      className="absolute rounded-full inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
    >
      <Camera className="text-white w-8 h-8" />
    </div>

    {/* Hidden File Input */}
    <input
      type="file"
      ref={fileInputRef}
      className="hidden"
      accept="image/*"
      onChange={handleImageUpload}
    />
    {file   && <form onSubmit={handleFormSubmit}>
    <Button className="mx-auto w-full cursor-pointer text-blue-500" variant={"link"}>Save Changes</Button>
    </form>}
    <ToastContainer />  
  </div>
  )
}

export default UpdatePhoto