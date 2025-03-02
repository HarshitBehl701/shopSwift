import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { FormEvent, useCallback, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { ISellerModal, IUserModal } from "@/interfaces/commonInterfaces";
import { IUpdatePhoto } from "@/interfaces/componentsInterface";
import { Button } from "../ui/button";
import { getImagePathUrl, handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { updateUserPhoto } from "@/api/userApi";
import { IApiResponse } from "@/interfaces/apiInterfaces";
import { updateSellerPhoto } from "@/api/sellerApi";

function UpdatePhoto({userType,userData}:IUpdatePhoto) {
  const fileInputRef = useRef<HTMLInputElement>(null);
const  [file,setFile] = useState<File|null>(null);

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
        try {   
            const  response = userType ==  'user' ?  await updateUserPhoto({user_id:(userData as IUserModal).id.toString(),userPhoto:file}) as  IApiResponse : await updateSellerPhoto({seller_id:(userData as ISellerModal).id.toString(),brand_logo:file}) as  IApiResponse ;
            if(response.status)
            {
                handleToastPopup({message:"Successfully Updated Profile Photo",type:"success"});
            }else
                handleToastPopup({message:(response.message),type:"error"});

        } catch (error) {
            handleToastPopup({message:handleCatchErrors(error),type:"error"});
        }
    }
  },[file,userData,userType]);

  return (
    <div className="relative w-32 h-32 group">
    {/* Avatar Component */}
    <Avatar className="w-full h-full object-cover shadow-sm  border border-gray-300">
      <AvatarImage className="object-cover"
        src={
            file ?  URL.createObjectURL(file) :
            (userType?.includes("seller")
            ? getImagePathUrl('seller',(userData  as ISellerModal).brand_logo)
            : userType?.includes("user")
            ? getImagePathUrl("user",(userData as  IUserModal).user_photo)
            : "https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg")
        }
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
    {userType?.includes("admin") === false && <form onSubmit={handleFormSubmit}>
    <Button className="mx-auto w-full cursor-pointer text-blue-500" variant={"link"}>Save Changes</Button>
    </form>}
  </div>
  )
}

export default UpdatePhoto