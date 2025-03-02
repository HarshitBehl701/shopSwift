import { IUserContext, IUserContextProviderParam } from "@/interfaces/contextInterface";
import  {createContext,useContext}  from  "react";

// eslint-disable-next-line react-refresh/only-export-components
export  const UserContext  = createContext<IUserContext | null>(null);

export const UserContextProvider = ({children,userData,setUserData,isLoggedIn,setIsLoggedIn,userOrders,setUserOrders}:IUserContextProviderParam)  =>  {
    return (
        <UserContext.Provider  value={{userData,setUserData,isLoggedIn,setIsLoggedIn,userOrders,setUserOrders}}>
            {children}
        </UserContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const  useUserContext = () => {
    const  context = useContext(UserContext);
    if(!context)
        throw new  Error("User Context Not  Found");
    return   context;
}