import { IHandleToastPopupParams, IToastPopupOptions } from "@/interfaces/commonInterfaces";
import { AxiosError } from "axios";
import {Bounce, toast}  from "react-toastify";

export const isUserLogin =  () => {
    return  localStorage.getItem("ULoginToken")  ?  true  :  false;
}

export  const setUserLogin = (token:string) => {
    localStorage.setItem("ULoginToken",token);
}

export  const unsetLocalStorageVariables = ()=>{
    localStorage.removeItem("ULoginToken");
}

export const handleToastPopup = (data:IHandleToastPopupParams) =>  {
    const options:IToastPopupOptions = {
        position: data.position ?? "top-right",
        autoClose: data.autoClose  ?? 5000,
        hideProgressBar: data.hideProgressBar ??  false,
        closeOnClick: data.closeOnClick  ?? false,
        pauseOnHover: data.pauseOnHover  ??   true,
        draggable: data.draggable  ?? true,
        progress: data.progress  ?? undefined,
        theme: data.theme ?? "light",
        transition: data.transition  ?? Bounce,
    }

    switch(data.type)
    {
        case  'error':
            toast.error(data.message,options); 
            break;
        case  'success':
            toast.success(data.message,options); 
            break;
        case  'warning':
            toast.warning(data.message,options); 
            break;
        case  'info':
            toast.info(data.message,options); 
            break;
        default:
            toast(data.message,options);
    }
}

export const handleCatchErrors = (error:unknown) => {
    return error  instanceof  Error ? error.message  : 'Something  Went Wrong';
}

export const handleCatchErrorsOfApi = (error:unknown) => {
    const   response:{[key:string]:boolean|string} = {status:false,message:handleCatchErrors(error)};
    if(error instanceof  AxiosError &&  error.response && 'data' in error.response)
    {
        return error.response.data;
    }
    return response;
}

export  const formatDate =  (date:Date) => {
    const rawDate  = new Date(date);
    return rawDate.toLocaleDateString("en-GB",{
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
}

export  const getImagePathUrl   = (type:string,imageUrl:string) => {
    const basePath = import.meta.env.VITE_API_URL;
    const imagePathObj =  {
        "main":'/api/main/v1',
        "user":'/api/user/v1',
        "seller":'/api/seller/v1',
        "product":'/api/product/v1',
        "admin":'/api/admin/v1',
        "other":'/api/others/v1'
    }
    if(type  in imagePathObj)
        return basePath + imagePathObj[type as keyof typeof imagePathObj] + "/"  + imageUrl;
    return  "";
}   