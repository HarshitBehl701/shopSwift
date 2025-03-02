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
        "user":"/api/v1/user",
        "seller":"/api/v1/seller",
        "product":"/api/v1/product",
        "order":"/api/v1/order",
        "comment":"/api/v1/comment",
        "main":"/api/v1/main",
    }
    return urls[type] ?? baseUrl;
}

export  const  userRoutes:{[key:string]:string} = {
    "register":"register",
    "verifyAccount":"verify_account",
    "login":"login",
    "logout":"logout",
    "getAccountDetails":"account_details",
    "updateAccountDetails":"update_account_user",
}

export  const  sellerRoutes:{[key:string]:string} = {
    "register":"register",
}

export  const  commentRoutes:{[key:string]:string} = {
    "createComment":"create_comment",
    "manageComment":"update_comment_user",
    "getOrderAllComments":"get_order_comments_user",
    "getProductAllComments":"get_product_comments",
}

export  const  mainRoutes:{[key:string]:string} = {
    "getAllActiveCategoriesSubCategories":"get_active_categories_sub_categories",
    "submitContactForm":"create_contact_us",
}

export  const  orderRoutes:{[key:string]:string} = {
    "placeNewOrder":"place_order",
    "cancelOrder":"cancel_order",
    "getUserAllOrders":"get_user_orders_user",
    "manageOrderRating":"manage_order_rating",
}

export  const  productRoutes:{[key:string]:string} = {
    "getAllLiveProducts":"get_all_live_products",
    "manageUserCart":"manage_user_cart",
    "manageUserWhislist":"manage_user_whislist",
}