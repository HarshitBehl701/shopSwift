import { IAdminModal } from "./commonInterfaces";

export interface  IUserContextValue{
    adminData: IAdminModal |  null;
    setAdminData: React.Dispatch<React.SetStateAction<IAdminModal | null>>;
    isLoggedIn: boolean | null;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export  interface IAdminContextProvider{
    children: React.ReactNode;
    data:IUserContextValue;
}