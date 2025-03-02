import {Routes,Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import BaseLayout from "./layouts/BaseLayout";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/UsersList";
import UserDetail from "./pages/UserDetail";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import ManagePage from "./pages/ManagePage";
import { useEffect, useState } from "react";
import { IAdminModal } from "./interfaces/commonInterfaces";
import Loader from "./components/myComponents/Loader";
import { handleCatchErrors, isUserLogin, unsetLocalStorageVariables } from "./utils/commonUtils";
import { getLoginAdminDetails } from "./api/adminApi";
import { AdminContextProvider } from "./contexts/userContext";
import { IAdminAccountDetailsResponse } from "./interfaces/apiInterfaces";

function App() {
  const [adminData,setAdminData] = useState<IAdminModal | null>(null);
  const [isLoggedIn,setIsLoggedIn]  = useState<boolean|null>(null);
  //checks if the user  is loggedin
  useEffect(() => {
    if(isLoggedIn  === null)
      setIsLoggedIn(isUserLogin());
  },[isLoggedIn]);

  //fetch  user details if  user   login
  useEffect(() => {
    if(isLoggedIn  &&  adminData  ===  null)
    {
      ;(async () =>{
        try {
          const  response  = await getLoginAdminDetails();
          if(response.status && response.data)
          {
            const responseData =   response.data   as  IAdminAccountDetailsResponse;
            setAdminData(responseData.userData);
          }else{
            unsetLocalStorageVariables();
            throw new  Error(response.message);
          }

        } catch (error) {
            unsetLocalStorageVariables();
            throw new  Error(handleCatchErrors(error));
        }
      })()
    }

  },[isLoggedIn,adminData]);

  if(isLoggedIn == null)
    return  <Loader />

  return (
        <AdminContextProvider data={{adminData,setAdminData,isLoggedIn,setIsLoggedIn}}>
          <Routes>
            {isLoggedIn  ?  
              <>
                <Route path="/dashboard" element={<BaseLayout><Dashboard /></BaseLayout>} />
                <Route path="/products" element={<BaseLayout><Products /></BaseLayout>} />
                <Route path="/products/:productsType" element={<BaseLayout><Products /></BaseLayout>} />
                <Route path="/product/add-product" element={<BaseLayout><Products /></BaseLayout>} />
                <Route path="/product/:productName" element={<BaseLayout><ProductDetails /></BaseLayout>} />
                <Route path="/orders" element={<BaseLayout><Orders /></BaseLayout>} />
                <Route path="/orders/:ordersType" element={<BaseLayout><Orders /></BaseLayout>} />
                <Route path="/order/:orderName" element={<BaseLayout><OrderDetails /></BaseLayout>} />
                <Route path="/page/:type" element={<BaseLayout><ManagePage /></BaseLayout>} />
                <Route path="/:userType" element={<BaseLayout><UsersList /></BaseLayout>} />
                <Route path="/:userType/:userName" element={<BaseLayout><UserDetail /></BaseLayout>} />
                <Route path="/:userType/:userName" element={<BaseLayout><UserDetail /></BaseLayout>} />
                <Route path="/:userType/:userName" element={<BaseLayout><UserDetail /></BaseLayout>} />
                <Route path="/*" element={<Navigate to={"/dashboard"} />} />
              </>
              :
                <Route  path="/*" element={<Login />} />
            }
        </Routes>
        </AdminContextProvider>
  )
}

export default App