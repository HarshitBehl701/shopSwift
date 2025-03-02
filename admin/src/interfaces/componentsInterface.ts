import React, { ReactNode } from "react";
import { IAdminModal, ICategoryDataType, IOrderModal, IProductModal, ISellerModal, ISubCategoryType, IUserModal } from "./commonInterfaces";
import { IManageProduct } from "./apiInterfaces";

export interface  ISideNavbarDropDownMenu{
    title:  string  | React.ReactNode;
    subMenus: {
        link: string;
        title: string;
    }[]
}


export interface IUploadPictureParam{
    displayText: string;
    limit: number;
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    allowedFiles:string[];
    maxFileSize: number;
}

export interface  ICustomTable{
    title:string;
    headings:string[];
    columns: string[];
    currentPage?:string;
    editActionRequired:boolean;
    editActionRedirectUrl?:string;
    isColumnIncludedInRedirectUrl?:boolean;
    columnNameOfRedirectUrl?:string;
    isSearchParamInRedirecdtUrl?:boolean;
    searchParams?:string;
    rowsData: ICategoryDataType[] | ISubCategoryType[] |  IUserModal[] | IAdminModal[] | ISellerModal[]  | IProductModal[] | IOrderModal[] | null;
}

export  interface IPopupParam{
    buttonText: string |  ReactNode;
    buttonStyling?: string;
    children:ReactNode;
    buttonVariant?:  "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
}

export interface IManageUserParam{
    userType:string | undefined;
    userData:   IUserModal  | ISellerModal | IAdminModal;
    setUserData:React.Dispatch<React.SetStateAction<ISellerModal | IUserModal  | IAdminModal>>
}

export   interface  IUpdateAdminParam{
    userData:IAdminModal;
}

export interface  IUpdateSellerParam{
    userData:ISellerModal;
}

export  interface IUpdateUserParam{
    userData:IUserModal;
}

export interface IUpdatePhoto{
    userType:string | undefined;
    userData: IUserModal |  ISellerModal |IAdminModal;
}

export   interface  ICreatNewSubCategoryParam{
    categories: ICategoryDataType[] |  null;
}

export interface IEditProductParam{
    productData:IProductModal;
    setProductData: React.Dispatch<React.SetStateAction<IProductModal>>;
    fieldName: keyof IManageProduct;
}


export   interface ISubCategories{
    sub_category_id: number;
    sub_category_name: string;
    sub_category_image?:string;
    sub_category_is_active: number;
    sub_category_updated_at: Date;
    sub_category_created_at: Date;
}

export interface  IUpdateCategorySubCategoryImage{
    data:   ICategoryDataType | ISubCategoryType;
}