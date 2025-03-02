import { logoutSeller } from "@/api/sellerApi";
import { useUserContext } from "@/contexts/userContext";
import { IApiResponse } from "@/interfaces/apiInterfaces";
import { handleCatchErrors, handleToastPopup, unsetLocalStorageVariables } from "@/utils/commonUtils";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function Logout() {
    const navigate  =  useNavigate();
    const {setIsLoggedIn,setUserData} = useUserContext();
    useEffect(() =>   {
        ;(async() => {
            try {
                const response =  await logoutSeller()   as  IApiResponse;
                if(response.status)
                {
                    handleToastPopup({message:"Successfully Logout",type:"success"});
                    unsetLocalStorageVariables();
                    setIsLoggedIn(false);
                    setUserData(null);
                    setTimeout(() => navigate("/login"),1000);
                }else{
                    handleToastPopup({message:(response.message),type:"error"});
                }

            } catch (error) {
                handleToastPopup({message:handleCatchErrors(error),type:"error"});
            }
        })()
    },[navigate,setIsLoggedIn,setUserData]);
  return (
    <ToastContainer  />
  )
}

export default Logout