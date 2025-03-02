export interface ICreateNewCategoryParam{
    name:string;
    category_image?:string;
}

export  interface  IUpdateCategoryParam{
    category_name?:string;
    category_image?:string;
    is_active?:number;
    created_at?:Date;
    updated_at?:Date;
}

export   interface  ICreateNewCommentParam{
    order_id:number;
    user_id:number;
    product_id:number;
    user_comment:string;
}

export interface ICreateContactForm{
    name:string;
    email:string;
    message:string;
}

export interface  IUpdateCommentParam{
    product_id?: number;
    order_id?: number;
    user_id?: number;
    user_comment?: string;
    is_active?: number;
    created_at?: Date;
    updated_at?: Date;
}

export  interface  ICreateNewOrderSingleParam{
    product_id:number;
    user_id:number;
    price:number;
    quantity:number;
}

export interface   IUpdateOrderParam{
    product_id?:number;
    user_id?:number;
    price?:number;
    order_status?:string;
    rating?:number;
    is_active?:number;
    created_at?:Date;
    updated_at?:Date;
}

export  interface  ICreateNewProductParam{
    product_name:string;
    description?:string;
    images?:string;
    seller_id?:number;
    category?:number;
    sub_category?:number;
    price?:number;
    discount?:number;
}

export interface IUpdateProductDetailsParam{
    product_name?:string;
    description?:string;
    images?:string;
    seller_id?:number;
    category?:number;
    sub_category?:number;
    views?:number;
    number_of_customer_rate?:number;
    average_rating?:number;
    sum_rating?:number;
    price?:number;
    discount?:number;
    is_active?:number;
    created_at?:Date;
    updated_at?:Date;
}

export  interface IRegisterNewAdminSingleParam{
    admin_name: string;
    admin_email: string;
    admin_password: string;
}

export  interface IUpdateAdminDetailsParam{
    admin_name?: string;
    admin_email?: string;
    admin_password?: string;
    is_active?:number;
    created_at?:Date;
    updated_at?:Date;
}

export interface ICreateNewSubCategoryParam{
    category_id:number;
    sub_category_name:string;
    sub_category_image?:string;
}

export  interface  IUpdateSubCategoryParam{
    category_id?:number;
    sub_category_name?:string;
    sub_category_image?:string;
    is_active?:number;
    created_at?:Date;
    updated_at?:Date;
}

export  interface  IRegisterNewSellerParam{
    seller_name:string;
    brand_name:string;
    email:string;
    seller_password:string;
    verification_code:string;
    verification_expiration:Date;
}

export  interface  IUpdateSellerDetailsParam{
    seller_name?:string;
    brand_name?:string;
    brand_logo?:string;
    gstin?:string;
    email?:string;
    seller_password?:string;
    is_verified?:number;
    verification_code?:string;
    verification_expiration?:Date;
    is_active?:number;
    created_at?:Date;
    updated_at?:Date;
}

export interface  IRegisterNewUserParam{
    user_name:string;
    email:string;
    user_password:string;
    verification_code:string;
    verification_expiration:Date;
}

export interface  IUpdateUserDetailsParam{
    user_name?:string;
    user_photo?:string;
    email?:string;
    user_password?:string;
    user_cart?:string;
    user_whislist?:string;
    is_verified?:number;
    verification_code?:string;
    verification_expiration?:Date;
    is_active?:number;
    created_at?:Date;
    updated_at?:Date;
}


export interface IGetCategoriesAndSubCategoriesResponseFromJoinQueryResponse{
    id: number;
    category_name: string;
    category_image:string;
    is_active: number;
    created_at:Date;
    updated_at:Date;
    sub_category_id: number;
    sub_category_name: string;
    sub_category_image:string;
    sub_category_is_active: number;
    sub_category_updated_at: Date;
    sub_category_created_at: Date;
}

export interface IGetAllProductsResponse{
    id:number;
    product_name:string;
    description:string;
    images:string;
    views:number;
    number_of_customer_rate:number;
    average_rating:number;
    sum_rating:number;
    price:number;
    discount:number;
    created_at: Date;
    category_name:string;
    sub_category_name:string;
    status:number;
    is_active?:number;
    brand_name:string;
    brand_logo:string;
}

export interface  IAdminDetailsResponse{
    admin_id: number;
    admin_name: string;
    admin_email:string;
    is_active:  number;
    created_at: Date;
    updated_at: Date;
}

export interface IGetCommentsResponse{
    id: number;
    user_comment: string;
    is_active: number;
    created_at: Date;
    product_name:string;
    rating:  number;
    user_name:string;
    user_photo:string;
}

export  interface IGetCategoriesAndSubCategoriesResponse{
    category_id: number;
    category_name: string;
    category_image:string;
    category_is_active: number;
    category_created_at:Date;
    category_updated_at:Date;
    sub_categories:{
        sub_category_id: number;
        sub_category_name: string;
        sub_category_image: string;
        sub_category_is_active: number;
        sub_category_updated_at: Date;
        sub_category_created_at: Date;
    }[];
}

export  interface IGetAllProductsOrdersResponse{
    id:number;
    price:number;
    order_status:string;
    cancel_reason:string;
    rating:number;
    quantity:number;
    is_active:number;
    created_at:Date;
    updated_at:Date;
    product_id:number;
    product_name:string;
    images:string;
    user_name:string;
    user_photo:string;    
    address:string;    
}

export  interface IGetSellerAccountResponse{
    id:number;
    seller_name:string;
    brand_name:string;
    brand_logo:string;
    gstin:string;
    email:string;
    is_verified:number;
    verification_code:string;
    verification_expiration:Date;
    is_active:number;
    created_at:Date;
    updated_at:Date;
}

export  interface IGetUserAccountResponse{
    id:number;
    user_name:string;
    user_photo:string;
    email:string;
    user_cart:string;
    user_whislist:string;
    is_verified:number;
    verification_code:string;
    verification_expiration:Date;
    is_active:number;
    created_at:Date;
    updated_at:Date;
    address:string;   
}