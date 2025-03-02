import { ToastPosition, ToastTransitionProps } from "react-toastify";

export interface IAdminModal{
    id:number;
    admin_name: string;
    admin_email: string;
    admin_password: string;
    is_active:number;
    created_at:Date;
    updated_at:Date;
}


export  interface  IUserModal{
    id:number;
    user_name:string;
    user_photo:string;
    email:string;
    address:string;
    user_cart:string;
    user_whislist:string;
    is_verified:number;
    verification_code:string;
    verification_expiration:Date;
    is_active:number;
    created_at:Date;
    updated_at:Date;
}


export interface   ISellerModal{
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


export interface IProductModal{
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
    brand_name:string;
    brand_logo:string;
}

  
export interface  IOrderModal{
    id:number;
    price:number;
    order_status: 'Pending'|'Processing'|'Shipped'|'Delivered'|'Cancelled'|'Refunded'|'Failed'|'On Hold'|'Returned';
    cancel_reason:string;
    rating:number;
    is_active:number;
    quantity:number;
    created_at:Date;
    updated_at:Date;
    product_id:number;
    product_name:string;
    images:string;
    user_name:string;
    user_photo:string; 
    address:string;    
}


export interface  ICommentModal{
    id: number;
    user_comment: string;
    is_active: number;
    created_at: Date;
    product_name:string;
    rating:  number;
    user_name:string;
    user_photo:string;
}


export interface ICategorySubCategoryModal{
    category_id: number;
    category_name: string;
    category_is_active: number;
    category_created_at:Date;
    category_updated_at:Date;
    sub_categories:{
        sub_category_id: number;
        sub_category_name: string;
        sub_category_is_active: number;
        sub_category_updated_at: Date;
        sub_category_created_at: Date;
    }[];
}

export interface IToastPopupOptions{
    position: ToastPosition | undefined;
    autoClose: number;
    hideProgressBar: boolean;
    closeOnClick: boolean;
    pauseOnHover: boolean;
    draggable: boolean;
    progress: undefined | number;
    theme: string;
    transition:  ({ children, position, preventExitTransition, done, nodeRef, isIn, playToast }: ToastTransitionProps) => React.JSX.Element;
}

export  interface IToastAvailableTypes{
    [key:string]:unknown;
}

export interface  IHandleToastPopupParams{
    type: string;
    message:string;
    position?: IToastPopupOptions['position'];
    autoClose?: IToastPopupOptions['autoClose'];
    hideProgressBar?: IToastPopupOptions['hideProgressBar'];
    closeOnClick?: IToastPopupOptions['closeOnClick'];
    pauseOnHover?: IToastPopupOptions['pauseOnHover'];
    draggable?: IToastPopupOptions['draggable'];
    progress?: IToastPopupOptions['progress'];
    theme?: IToastPopupOptions['theme'];
    transition?: IToastPopupOptions['transition'];
}
