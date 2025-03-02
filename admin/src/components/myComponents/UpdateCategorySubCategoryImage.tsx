import { IUpdateCategorySubCategoryImage } from "@/interfaces/componentsInterface"
import { getImagePathUrl, handleCatchErrors, handleToastPopup } from "@/utils/commonUtils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useCallback, useRef, useState } from "react"
import { IApiResponse } from "@/interfaces/apiInterfaces";
import { Camera } from "lucide-react";
import { ICategoryDataType, ISubCategoryType } from "@/interfaces/commonInterfaces";
import { manageCategory, manageSubCategory } from "@/api/mainApi";

function UpdateCategorySubCategoryImage({data}:IUpdateCategorySubCategoryImage) {
  const [image,setImage]  =   useState<File |  null>(null);
  const fileInputRef =  useRef<HTMLInputElement  | null>(null);

  const  handleCategorySubCategoryImageUpdate = useCallback(async(image:File) =>{
    if(window.confirm('Are you sure  you   want  to update  Image?'))
    {
      try {
        const response  = (data as  ISubCategoryType)['sub_category_id'] &&  typeof (data as ISubCategoryType).category_id === 'number' ? await manageSubCategory({category_id:(data   as ISubCategoryType).category_id,sub_category_id:(data   as ISubCategoryType).sub_category_id,image:image}) as IApiResponse : await manageCategory({category_id:(data  as  ICategoryDataType).category_id,image:image}) as IApiResponse;
  
        if(response.status)
        {
          handleToastPopup({message:"Successfull  updated Image",type:"success"});
          setTimeout(() => window.location.reload(),1000);
        }else{
          handleToastPopup({message:(response.message),type:"error"});
        }
        
      } catch (error) {
        handleToastPopup({message:handleCatchErrors(error),type:"error"});
      }
    }
  },[data]);

  return (
    <>
      <div className="relative w-20 h-20 group">
    {/* Avatar Component */}
    <Avatar className="w-full h-full object-cover shadow-sm  border border-gray-300">
      <AvatarImage className="object-cover"
        src={
            image ?  URL.createObjectURL(image) : getImagePathUrl("others",(data as  ICategoryDataType).category_image ?? (data as  ISubCategoryType).sub_category_image)
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
      onChange={(event) =>  {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          setImage(file);
          handleCategorySubCategoryImageUpdate(file);
        }
      }}
    />
  </div>
    </>
  )
}

export default UpdateCategorySubCategoryImage