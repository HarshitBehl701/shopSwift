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
        "admin":"/api/v1/admin",
        "user":"/api/v1/user",
        "seller":"/api/v1/seller",
        "product":"/api/v1/product",
        "order":"/api/v1/order",
        "comment":"/api/v1/comment",
        "main":"/api/v1/main",
    }
    return urls[type] ?? baseUrl;
}

export const adminRoutes:{[key:string]:string} = {
    "getLoginAdminDetails":"get_login_admin_details",
    "getAdminDetails":"get_admin_details",
    "login":"login",
    "logout":"logout",
    "register":"register",
    "updateAccount":"account_update",
    "getAllAdmins":"get_admins",
}

export const userRoutes:{[key:string]:string} = {
    "manageUser":"manage_user_admin",
    "getUserDetails":"get_user_details_admin",
    "getAllUsers":"get_all_users_admin",
    "updateUserPhotoForAdmin":"update_user_photo_admin",
}

export const sellerRoutes:{[key:string]:string} = {
    "manageSeller":"update_details_admin",
    "getAllSellers":"get_all_sellers",
    "getSellerDetails":"seller_details_admin",
    "updateSellerPhotoForAdmin":"update_seller_photo_admin",
}

export const productRoutes:{[key:string]:string} = {
    "manageProduct":"update_product_admin",
    "getSellerAllProducts":"get_all_products_seller_admin",
    "getAllProducts":"get_all_products_admin",
    "manageUserCart":"manage_user_cart_for_admin",
    "manageUserWhislist":"manage_user_whislist_for_admin",
    "getAllLiveProducts":"get_all_live_products",
}

export const orderRoutes:{[key:string]:string} = {
    "manageOrder":"update_order_admin",
    "getProductAllOrders":"get_product_orders_admin",
    "getUserAllOrders":"get_user_orders_admin",
    "getAllOrders":"get_all_orders_admin",
}

export const commentRoutes:{[key:string]:string} = {
    "manageComment":"update_comment_admin",
    "getOrderAllComments":"get_order_comments",
    "getUserAllComments":"get_user_comments",
    "getAllComments":"get_all_comments",
}

export const mainRoutes:{[key:string]:string} = {
    "createNewCategory":"create_category",
    "manageCategory":"update_category",
    "createNewSubCategory":"create_sub_category",
    "manageSubCategory":"update_sub_category",
    "getAllActiveCategoriesSubCategories":"get_active_categories_sub_categories",
    "getAllCategoriesSubCategories":"get_all_categories_sub_categories",
    "getAllContactRows":"get_contact_us",
}