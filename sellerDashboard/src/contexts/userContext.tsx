import { IUserContextProviderParam, IUserContextValues } from "@/interfaces/contextInterfaces";
import { createContext, useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<IUserContextValues |  null>(null);

export const  UserContextProvider =   ({children,userData,setUserData,isLoggedIn,setIsLoggedIn}:IUserContextProviderParam) =>  {
    return  (
        <UserContext.Provider value={{userData,setUserData,isLoggedIn,setIsLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext   =  () =>   {
    const context  = useContext(UserContext);
    if(!context)
        throw  new   Error("User  Context Not   Found");
    return  context;
}