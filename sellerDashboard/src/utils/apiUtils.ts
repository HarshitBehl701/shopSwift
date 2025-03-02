import { IApiResponse } from "@/interfaces/apiInterfaces";
import  axios, { AxiosResponse } from "axios";
import { unsetLocalStorageVariables } from "./commonUtils";

export const baseUrl =  import.meta.env.VITE_API_URL;
export  const axiosInstance =  (type:string) =>  {
    const instance  = axios.create({
        baseURL:  `${baseUrl}${getApiBaseUrl(type)}`,
        withCredentials: true,
    });
    
    instance.interceptors.response.use((response) => response,(error) => {
        if(error.response && error.response.status === 409)
            unsetLocalStorageVariables();
        return Promise.reject(error);
    })
    
    return instance;
}

export  const handleApiResponse = (response:AxiosResponse) =>{
    const serverResponse = response.data as IApiResponse;
    if('data' in   serverResponse && typeof serverResponse.data ===  'string')
        serverResponse.data = JSON.parse(serverResponse.data);
    return  serverResponse;
}

export const getApiBaseUrl = (type:string) => {
    const urls:{[key:string]:string} = {
        "seller":"/api/v1/seller",
        "product":"/api/v1/product",
        "order":"/api/v1/order",
        "comment":"/api/v1/comment",
        "main":"/api/v1/main",
    }
    return urls[type] ?? baseUrl;
}

export  const sellerRoutes:{[key:string]:string} = {
    "verifyAccount":"seller_account_verified",
    "login":"login",
    "logout":"logout",
    "getAccountDetail":"seller_details",
    "updateAccount":"update_details_seller",
    "updateProfilePhoto":"update_photo_seller_seller",
}

export  const commentRoutes:{[key:string]:string} = {
    "getAllOrderComments":"get_order_comments",
}

export  const orderRoutes:{[key:string]:string} = {
    "manageOrder":"update_order_seller",
    "getProductAllOrders":"get_product_orders_seller",
    "getSellerAllOrders":"get_all_orders_seller",
}

export  const productRoutes:{[key:string]:string} = {
    "createNewProduct":"create_new_product",
    "updateProduct":"update_product_seller",
    "getAllProducts":"get_all_products_seller",
}

export  const mainRoutes:{[key:string]:string} = {
    "getAllActiveCategoriesSubCategories":"get_active_categories_sub_categories",
}