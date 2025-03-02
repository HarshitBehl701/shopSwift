import { ICategorySubCategoryModal, IOrderModal, IProductModal, ISellerModal } from "./commonInterfaces";

export interface  IApiResponse{
    status:boolean;
    message:string;
    data?:string;
}

export  interface   IVerifySellerAccount{
    verification_code:string;
    email:string;
}

export interface  ILoginSeller{
    email:string;
    seller_password:string;
}

export   interface ILoginSellerResponse{
    userData:ISellerModal;
    loginToken:string;
}

export  interface IGetSellerDetailsResponse{
    userData:ISellerModal;
}

export interface IUpdateSellerAccount{
    seller_name?:string;
    email?:string;
    brand_name?:string;
    seller_password?:string;
    gstin?:string;
}

export interface  IUpdateSellerBrandLogo{
    brandLogo:File;
}

export interface  IGetOrderAllComments{
    order_id:number;
}

export  interface   IMangeOrder{
    price?:number;
    order_status?:'Pending'|'Processing'|'Shipped'|'Delivered'|'Cancelled'|'Refunded'|'Failed'|'On Hold'|'Returned'
    cancel_reason?:string;
    is_active?:number;
    order_id:number;
}

export  interface IGetAllProductOrders{
    product_id: number;
}

export interface ICreateNewProduct{
    product_name:string;
    description:string;
    category:number;
    sub_category:number;
    price:number;
    discount:number;
    images: File[];
}

export  interface  IManageProduct{
    product_name?:string;
    description?:string;
    images?:File[];
    deleteImages?:string;
    category?:number;
    sub_category?:number;
    price?:number;
    discount?:number;
    is_active?:number;
    status?:number;
    product_id:number;
}

export  interface IGetAllProductsResponse{
    data:  {
        products:  IProductModal[];
    }
}

export    interface   IGetAllCategoriesSubCategoriesResponse{
    data: ICategorySubCategoryModal[];
}

export interface IGetAllOrdersOfProductResponse{
    orders:   IOrderModal[];
}

export  interface IGetAllOrdersOfSellerResponse{
    orders:  IOrderModal[];
}