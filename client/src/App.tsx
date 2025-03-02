import { Routes,Route, Navigate} from "react-router-dom"
import BaseLayout from "./layout/BaseLayout"
import Home from "./page/Home"
import Shop from "./page/Shop"
import Contact from "./page/Contact"
import Login from "./page/Login"
import Register from "./page/Register"
import ProductDetails from "./page/ProductDetails"
import DashboardLayout from "./layout/DashboardLayout"
import UserDashboard from "./page/UserDashboard"
import OrderCartWhislistList from "./page/OrderCartWhislistList"
import OrderCartWhislistDetails from "./page/OrderCartWhislistDetails"
import { UserContextProvider } from "./contexts/userContext"
import { useEffect, useState } from "react"
import { ICategoryDataType, IOrderModal, IProductModal, ISubCategoryType, IUserModal } from "./interfaces/commonInterfaces"
import { handleCatchErrors } from "./utils/commonUtils"
import { getAccountDetails } from "./api/userApi"
import { IGetAccountDetailsResponse, IGetAllCategoriesSubCategoriesResponse, IGetAllLiveProductsResponse, IGetAllUserOrdersResponse } from "./interfaces/apiInterfaces"
import { getAllActiveCategoriesSubCategories } from "./api/mainApi"
import { PageContextProvider } from "./contexts/pageContext"
import { getAllLiveProducts } from "./api/productApi"
import Logout from "./page/Logout"
import { UtilFunctionsContextProvider } from "./contexts/utilFunctionsContext"
import { getUserAllOrders } from "./api/orderApi"
import SellerRegistration from "./page/SellerRegistration"
import Loader from "./components/customComponents/Loader"

function App() {
  const  [userData,setUserData] = useState<IUserModal | null>(null);
  const  [isLoggedIn,setIsLoggedIn] = useState<boolean | null>(null);
  const [categories,setCategories] = useState<ICategoryDataType[] | null>(null);
  const [subCategories,setSubCategories] = useState<ISubCategoryType[] | null>(null);
  const [products,setProducts] = useState<IProductModal[] | null>(null);
  const [userOrders,setUserOrders] = useState<IOrderModal[] |  null>(null);

  useEffect(() =>{
    if(isLoggedIn  ===  null)
    {
      ;(async() =>{
        try {
            const response   =  await getAccountDetails();
            if(response.status && response.data)
            {
              const responseData = response.data  as IGetAccountDetailsResponse;
              setUserData(responseData.userData);
              setIsLoggedIn(true);
            }else
            {
              throw new Error(response.message);
            }
        } catch (error) {
          throw  new Error(handleCatchErrors(error));
        }
      })()
    }
  },[isLoggedIn]);

  useEffect(() => {
    if(categories ===  null)
    {
      ;(async() =>{
        try { 
            const  response  = await getAllActiveCategoriesSubCategories();
            if(response.status &&  response.data){
              const responseData = (response.data as  unknown as  IGetAllCategoriesSubCategoriesResponse).data;
              setCategories(responseData.map((obj) => ({
                category_id:obj.category_id,
                category_name:obj.category_name,
                category_image:obj.category_image,
                category_is_active:obj.category_is_active,
                category_created_at:obj.category_created_at,
                category_updated_at:obj.category_updated_at,
            })));
            responseData.forEach((data) => {
                const  subCategories:ISubCategoryType[]  =   data.sub_categories;
                if(subCategories.length >  0)
                {
                    const   newData = subCategories.map((subCategory)  => ({...subCategory,category_name:data.category_name,category_id:data.category_id}));
                    setSubCategories([...newData]);
                }
            })
            }else{
              throw new Error("Something  Went  Wrong ,  Please  Try Again  Later");
            }

        } catch (error) {
            throw new Error(handleCatchErrors(error));
        }
      })()
    }
  },[categories]);

  useEffect(() =>{
    if(products === null)
    {
      ;(async  () => {
        try {
          const response  = await   getAllLiveProducts();
          if(response.status && response.data)
          {
            const responseData = (response.data  as  IGetAllLiveProductsResponse);
            setProducts(responseData.products);
          }else{
            throw  new   Error(response.message);
          }
        } catch (error) {
          throw  new   Error(handleCatchErrors(error));
        }
      })();
    }
  },[products])

  useEffect(() => {
    if(userOrders ===  null)
    {
      ;(async()  => {
        try {
            const  response  = await getUserAllOrders();
            if(response.status)
            {
              const  responseData = (response.data as IGetAllUserOrdersResponse);
              setUserOrders(responseData.orders.reverse());
            }else
              throw  new   Error(response.message);
        } catch (error) {
            throw  new  Error(handleCatchErrors(error));
        }
      })()
    }
  },[userOrders]);  

  if(isLoggedIn ===  null)
  {
    return (
      <Loader />
    )
  }

  return (
      <PageContextProvider setCategories={setCategories} categories={categories} setSubCategories={setSubCategories}  subCategories={subCategories} setProducts={setProducts} products={products}>
        <UserContextProvider  userData={userData} setUserData={setUserData}  isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn} userOrders={userOrders}  setUserOrders={setUserOrders}>
        <UtilFunctionsContextProvider>
          <Routes>
                <Route path="/home"  element={<BaseLayout><Home /></BaseLayout>}/>
                <Route path="/shop"  element={<BaseLayout><Shop /></BaseLayout>}/>
                <Route path="/contact"  element={<BaseLayout><Contact /></BaseLayout>}/>
                <Route path="/product_details/:productName"  element={<BaseLayout><ProductDetails /></BaseLayout>}/>
                <Route path="/seller_registration"  element={<BaseLayout><SellerRegistration /></BaseLayout>}/>
                {isLoggedIn ?   
                    <>
                      <Route path="/:userName/dashboard"  element={<DashboardLayout><UserDashboard /></DashboardLayout>}/>
                      <Route path="/:userName/:requestedPage"  element={<DashboardLayout><OrderCartWhislistList /></DashboardLayout>}/>
                      <Route path="/:userName/:requestedPage/:productName"  element={<DashboardLayout><OrderCartWhislistDetails /></DashboardLayout>}/>
                      <Route path="/logout"  element={<Logout />}/>
                    </>
                    :
                    <>
                      <Route path="/login"  element={<BaseLayout><Login /></BaseLayout>}/>
                      <Route path="/register"  element={<BaseLayout><Register /></BaseLayout>}/>
                    </>
                }
              <Route path="/*"  element={<Navigate to={'/home'}/>}/>
          </Routes>
        </UtilFunctionsContextProvider>
      </UserContextProvider>
      </PageContextProvider>
  )
}

export default App