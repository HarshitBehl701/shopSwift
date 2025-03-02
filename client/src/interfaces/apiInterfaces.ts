import { ICategorySubCategoryModal, ICommentModal, IOrderModal, IProductModal, IUserModal } from "./commonInterfaces";

export interface  IApiResponse{
    status:boolean;
    message:string;
    data?:string;
}

export   interface IRegisterNewUser{
    user_name:string;
    email:string;
    user_password:string;
}

export   interface   IVerifyUser{
    verification_code:string;
    email:string;
}

export interface ILoginUser{
    email:string;
    password:string;
}

export  interface IUpdateUserAccount{
    user_name?:string;
    user_email?:string;
    user_password?:string;
    address?:string;
    userPhoto?:File;
}

export   interface IRegisterNewSeller{
    seller_name:string;
    brand_name:string;
    email:string;
    seller_password:string;
}

export   interface  ICreateNewComment{
    order_id:number;
    product_id:number;
    user_comment:string;
}

export  interface  IManageComment{
    comment_id:number;
    user_comment:string;
    is_active:number;
}

export   interface   IOrderAllComments{
    order_id:number;
}

export interface   IProductAllComments{
    product_id:number;
}

export interface ICreateContactForm{
    name:string;
    email:string;
    message:string;
}

export interface  IPlaceNewOrder{
    product_id:number;
    price:number;
    quantity?:number;
}

export interface ICancelOrder{
    order_id:number;
}

export interface IManageOrderRating{
    order_id:number;
    rating:number;
}

export interface IManageUserCart{
    product_id:number;
    action:string;
}

export interface IManageUserWhislist{
    product_id:number;
    action:string;
}

export interface ILoginUserResponse{
    loginToken:string;
    userData:IUserModal;
}

export  interface  IGetAccountDetailsResponse{
    userData:IUserModal;
}

export  interface IGetAllCategoriesSubCategoriesResponse{
    data : ICategorySubCategoryModal[];
}

export interface  IGetAllLiveProductsResponse{
    products: IProductModal[];
}

export  interface  IGetAllProductCommentsResponse{
    comments:  ICommentModal[]
}

export interface  IGetAllUserOrdersResponse{
    orders: IOrderModal[];
}