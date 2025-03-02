import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import BaseLayout from "./layouts/BaseLayout"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Orders from "./pages/Orders"
import OrderDetails from "./pages/OrderDetails"
import { useEffect, useState } from "react"
import { handleCatchErrors, isUserLogin, unsetLocalStorageVariables } from "./utils/commonUtils"
import { UserContextProvider } from "./contexts/userContext"
import { ISellerModal } from "./interfaces/commonInterfaces"
import { getSellerDetails } from "./api/sellerApi"
import { IGetSellerDetailsResponse } from "./interfaces/apiInterfaces"
import Logout from "./pages/Logout"

function App() {
  const  [isLoggedIn,setIsLoggedIn] = useState<boolean | null>(null);
  const [userData,setUserData]  = useState<ISellerModal | null>(null);

  useEffect(() =>  {
    if(isLoggedIn  ===  null)
      setIsLoggedIn(isUserLogin());
  },[isLoggedIn,setIsLoggedIn]);

  useEffect(() => {
    if(isLoggedIn && userData  == null)
    {
      ;(async () =>{
        try {
            const response  = await  getSellerDetails();

            if(response.status && response.data)
            {
              const responseData =   response.data   as  IGetSellerDetailsResponse;
              setUserData(responseData.userData);
            }else{
              unsetLocalStorageVariables();
              throw new  Error(response.message);
            }

        } catch (error) {
          unsetLocalStorageVariables();
            throw new Error(handleCatchErrors(error));
        }
      })()
    }
  },[isLoggedIn,userData]);
  
  return (
    <UserContextProvider isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}  userData={userData} setUserData={setUserData}>
      <Routes>
      {
        isLoggedIn ? 
        <>
            <Route path="/logout" element={<Logout/>} />
            <Route path="/dashboard" element={<BaseLayout><Dashboard /></BaseLayout>} />
            <Route path="/orders" element={<BaseLayout><Orders /></BaseLayout>} />
            <Route path="/order/:orderId" element={<BaseLayout><OrderDetails /></BaseLayout>} />
            <Route path="/products" element={<BaseLayout><Products /></BaseLayout>} />
            <Route path="/product/:productName" element={<BaseLayout><ProductDetails /></BaseLayout>} />
            <Route path="/*" element={<Navigate  to={"/dashboard"} />} />
        </>
        :
        <>
        <Route path="/*" element={<Login />} />
        </>
      }
    </Routes>
    </UserContextProvider>
  )
}

export default App