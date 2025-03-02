import React, { ReactNode } from "react";
import { ICategoryDataType,IOrderModal,IProductModal,ISubCategoryType, IUserModal } from "./commonInterfaces";

export   interface  IUserContext{
    userData:IUserModal | null;
    setUserData:React.Dispatch<React.SetStateAction<IUserModal | null>>;
    isLoggedIn: boolean  | null;
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean| null>>;
    userOrders:IOrderModal[] |   null;
    setUserOrders:React.Dispatch<React.SetStateAction<IOrderModal[]| null>>;
}

export  interface  IUserContextProviderParam extends  IUserContext{
    children:ReactNode;
}  

export  interface  IPageContext{
    categories: ICategoryDataType[] | null;
    setCategories: React.Dispatch<React.SetStateAction<ICategoryDataType[] |  null>>;
    subCategories: ISubCategoryType[] | null;
    setSubCategories: React.Dispatch<React.SetStateAction<ISubCategoryType[] |  null>>;
    products: IProductModal[] | null;
    setProducts: React.Dispatch<React.SetStateAction<IProductModal[] |  null>>;
}

export interface  IPageContextProvider  extends IPageContext{
    children: React.ReactNode;
}

export interface  IUtilFunctionsContext {
    handleUserCart:  (product_id:number) => void;
    handleUserWhislist:  (product_id:number) => void;
    isCurrentProductInUserOrder:  (product_id:number) => IOrderModal[] | null;
    handlePlaceOrder:  (product_id:number,price:number) => void;
}

export  interface  IUtilFunctionsContextProvider{
    children:React.ReactNode;
}