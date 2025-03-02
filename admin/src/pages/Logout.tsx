import { logoutAdmin } from "@/api/adminApi";
import { useAdminContext } from "@/contexts/userContext";
import { IApiResponse } from "@/interfaces/apiInterfaces";
import { handleCatchErrors, handleToastPopup, unsetLocalStorageVariables } from "@/utils/commonUtils";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function Logout() {
    const navigate  =  useNavigate();
    const {setIsLoggedIn,setAdminData} = useAdminContext();
    useEffect(() =>   {
        ;(async() => {
            try {
                const response =  await logoutAdmin()   as  IApiResponse;
                if(response.status)
                {
                    handleToastPopup({message:"Successfully Logout",type:"success"});
                    unsetLocalStorageVariables();
                    setIsLoggedIn(false);
                    setAdminData(null);
                    setTimeout(() => navigate("/login"),1000);
                }else{
                    handleToastPopup({message:(response.message),type:"error"});
                }

            } catch (error) {
                handleToastPopup({message:handleCatchErrors(error),type:"error"});
            }
        })()
    },[navigate,setIsLoggedIn,setAdminData]);
  return (
    <ToastContainer  />
  )
}

export default Logout