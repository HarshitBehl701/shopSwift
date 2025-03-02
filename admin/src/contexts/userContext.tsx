import { IAdminContextProvider, IUserContextValue } from "@/interfaces/contextInterfaces";
import {createContext, useContext}  from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const  AdminContext  =  createContext<IUserContextValue | null>(null);

export  const AdminContextProvider =  ({children,data}:IAdminContextProvider) => {
    return  (
        <AdminContext.Provider value={data}>
            {children}
        </AdminContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export  const useAdminContext  = ()=>{
    const context  =  useContext(AdminContext);
    if(!context)
        throw new   Error ('Admin Context Not Set');
    return context;
}
