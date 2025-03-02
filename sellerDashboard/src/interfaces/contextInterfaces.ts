import { ReactNode } from "react";
import { ISellerModal } from "./commonInterfaces";

export  interface IUserContextValues{
    userData:ISellerModal |  null;
    setUserData:React.Dispatch<React.SetStateAction<ISellerModal |  null>>;
    isLoggedIn: boolean | null;
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean |  null>>;
}

export  interface IUserContextProviderParam extends IUserContextValues{
    children:ReactNode;
}