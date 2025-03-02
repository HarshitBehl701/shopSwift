import { IPageContext, IPageContextProvider } from "@/interfaces/contextInterface";
import  {createContext,useContext}  from  "react";


// eslint-disable-next-line react-refresh/only-export-components
export  const PageContext  = createContext<IPageContext | null>(null);

export const PageContextProvider = ({children,categories,setCategories,subCategories,setSubCategories,products,setProducts}:IPageContextProvider)  =>  {
    return (
        <PageContext.Provider  value={{categories,setCategories,subCategories,setSubCategories,products,setProducts}}>
            {children}
        </PageContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const  usePageContext = () => {
    const  context = useContext(PageContext);
    if(!context)
        throw new  Error("Page Context Not  Found");
    return   context;
}