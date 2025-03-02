import { ReactNode } from "react";
import { IOrderModal, IProductModal } from "./commonInterfaces";

export interface IExpandableDescription{
    description:string;
    maxLength:number;
}

export interface  IProductCardParam{
    productData:IProductModal;
}

export  interface   IProductListingParam{
    newProducts?:IProductModal[] | null;
}

export interface IImageCarouselParam{
    images:string | string[];
    type:string;
    imageCss?:string;
    mainCarouselCss?:string
}

export  interface IReviewsParam{
    product_id:number |  undefined;
}

export  interface IPopupParam{
    buttonText: string |  ReactNode;
    buttonStyling?: string;
    children:ReactNode;
    buttonVariant?:  "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
}

export  interface IOrdersListTableParam{
    filteredOrders?: IOrderModal[] | undefined  |  null;
}

export  interface IProductListTableParam{
    filteredProduct?: IProductModal[] | null;
    request_page:string;
}

export  interface  ICommentParam{
    order_id:number;
    product_id:number;
}