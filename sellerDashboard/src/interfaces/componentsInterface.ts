import React, { ReactNode } from "react";
import { ICategorySubCategoryModal, IOrderModal, IProductModal, ISellerModal } from "./commonInterfaces";
import { IManageProduct } from "./apiInterfaces";

export interface  ISideNavbarDropDownMenu{
    title:  string  | React.ReactNode;
    subMenus: {
        link: string;
        title: string;
    }[]
}
export interface  ICustomTable{
    title:string;
    headings:string[];
    columns: string[];
    editActionRequired:boolean;
    editActionRedirectUrl?:string;
    isColumnIncludedInRedirectUrl?:boolean;
    columnNameOfRedirectUrl?:string;
    isSearchParamInRedirecdtUrl?:boolean;
    searchParams?:string;
    rowsData: ICategorySubCategoryModal[] | ISellerModal[] | IProductModal[] |  IOrderModal[] | null;
}

export interface  ILoginFormFields{
    email:string;
    password:string;
}


export  interface IPopupParam{
    buttonText: string |  ReactNode;
    buttonStyling?: string;
    children:ReactNode;
    buttonVariant?:  "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
}

export interface IUploadPictureParam{
    displayText: string;
    limit: number;
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    allowedFiles:string[];
    maxFileSize: number;
}

export   interface ISubCategories{
    sub_category_id: number;
    sub_category_name: string;
    sub_category_is_active: number;
    sub_category_updated_at: Date;
    sub_category_created_at: Date;
}

export interface IEditProductParam{
    productData:IProductModal;
    setProductData: React.Dispatch<React.SetStateAction<IProductModal>>;
    fieldName: keyof IManageProduct;
}