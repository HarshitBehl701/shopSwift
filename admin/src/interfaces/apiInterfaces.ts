import { IAdminModal, ICategorySubCategoryModal, IOrderModal, IProductModal, ISellerModal, IUserModal } from "./commonInterfaces";

export  interface IApiResponse{
    status:boolean;
    message:string;
    data?:string;
}

export  interface IRegisterNewAdmin{
    admin_name: string;
    admin_email: string;
    admin_password: string;
}


export  interface   IMangeOrder{
    price?:number;
    order_status?:'Pending'|'Processing'|'Shipped'|'Delivered'|'Cancelled'|'Refunded'|'Failed'|'On Hold'|'Returned'
    cancel_reason?:string;
    is_active?:number;
    order_id:number;
}

export interface ILoginAdmin{
    email:string;
    password:string;
}

export  interface  ILoginAdminResponse{
    userData:IAdminModal;
    loginToken:string;
}

export  interface  IAdminAccountDetailsResponse{
    userData:IAdminModal;
    loginToken:string;
}

export interface IUpdateAdminAccount{
    admin_id:number;
    admin_name?:string;
    admin_email?:string;
    admin_password?:string;
    is_active?:number;
}

export interface   IGetAdminDetailsParam{
    admin_id:number;
}

export interface   IGetAdminDetailsResponse{
    adminData:IAdminModal;
}

export  interface IUpdateComment{
    product_id:number;
    order_id:number;
    user_id:number;
    user_comment:string;
    is_active:number;
}

export interface   IGetOrderAllComments{
    order_id:number;
}

export interface   IGetUserAllComments{
    user_id:number;
}

export interface  ICreateNewCategory{
    name:string;
    image?:File;
}

export interface  IUpdateCategory{
    category_id:number;
    name?:string;
    image?:File;
    is_active?:number;
}

export interface  ICreateNewSubCategory{
    category_id:number;
    image?:File;
    sub_category_name:string;
}

export interface  IUpdateSubCategory{
    category_id:number | undefined;
    image?:File;
    sub_category_id:number;
    sub_category_name?:string;
    is_active?:number;
}

export  interface   IManageOrder{
    product_id?:number;
    user_id?:number;
    price?:number;
    cancel_reason?:string;
    order_status?:string;
    is_active?:number;
    order_id:number;
}

export interface IGetProductAllOrders{
    product_id:number;
}

export interface IGetUserAllOrders{
    user_id:number;
}

export interface  IManageProduct{
    product_name?:string;
    description?:string;
    images?:File[];
    deleteImages?:string;
    category?:number;
    sub_category?:number;
    price?:number;
    discount?:number;
    is_active?:number;
    seller_id?:string;
    views?:string;
    number_of_customer_rate?:string;
    average_rating?:string;
    sum_rating?:string;
    status?:number;
    product_id:number;
}

export   interface IGetSellerAllProducts{
    seller_id:number;
}

export interface   IManageUserCart{
    user_id:number;
    product_id:number;
    action:string;
}

export interface IManageUserWhislist{
    user_id:number;
    product_id:number;
    action:string;
}

export interface IManageSeller{
    seller_id:number;
    seller_name?:string;
    sellerPhoto?:File;
    brand_name?:string;
    gstin?:string;
    email?:string;
    seller_password?:string;
    is_verified?:number;
    change_verification_code?:number;
    verification_expiration?:Date;
    is_active?:number;
}

export  interface   IUpdateSellerPhoto{
    seller_id:string;
    brand_logo:File;
}

export interface  IGetSellerDetails{
    seller_id:number;
}

export interface  IGetSellerDetailsResponse{
    sellerData:ISellerModal;
}

export  interface  IUpdateUserPhoto{
    user_id:string;
    userPhoto:File;
}

export interface IManageUser{
    user_id:number;
    user_name?:string;
    user_password?:string;
    user_email?:string;
    user_address?:string;
    user_cart?:string;
    user_whislist?:string;
    is_verified?:number;
    change_verification_code?:number;
    verification_expiration?:Date;
    is_active?:number;
}

export interface IGetUserDetails{
    user_id:number;
}


export interface  IGetUserDetailsResponse{
    userData:IUserModal;
}

export   interface   IGetAllCategoriesAndSubCategories{
    data: ICategorySubCategoryModal[]
}

export interface IGetAllUsersResponseData{
    users:  IUserModal[];
}

export interface IGetAllAdminsResponseData{
    admins:  IAdminModal[];
}

export interface IGetAllSellersResponseData{
    sellers:  ISellerModal[];
}

export  interface  IGetAllProductsResponse{
    data: {
        products: IProductModal[]
    }
}

export  interface IGetAllOrdersOfSellerResponse{
    orders:   IOrderModal[]
}

export interface IGetAllOrdersOfProductResponse{
    orders:   IOrderModal[];
}

export    interface   IGetAllCategoriesSubCategoriesResponse{
    data: ICategorySubCategoryModal[];
}