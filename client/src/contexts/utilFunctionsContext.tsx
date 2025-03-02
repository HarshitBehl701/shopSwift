import { IUtilFunctionsContext, IUtilFunctionsContextProvider } from "@/interfaces/contextInterface";
import  {createContext,useCallback,useContext}  from  "react";
import { useUserContext } from "./userContext";
import { manageUserCart, manageUserWhislist } from "@/api/productApi";
import { IApiResponse } from "@/interfaces/apiInterfaces";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { ToastContainer } from "react-toastify";
import { usePageContext } from "./pageContext";
import { placeNewOrder } from "@/api/orderApi";


// eslint-disable-next-line react-refresh/only-export-components
export  const UtilFunctionsContext  = createContext<IUtilFunctionsContext | null>(null);

export const UtilFunctionsContextProvider = ({children}:IUtilFunctionsContextProvider)  =>  {
    const  {userData,userOrders} = useUserContext();
    const  {products} = usePageContext();

    const handleUserWhislist  = useCallback(async(product_id:number) =>  {
        if(userData)
        {
          try {
              const   action  = userData.user_whislist && userData.user_whislist.split(',').includes(product_id.toString()) ? 'remove' : 'add';
              const response   =  await manageUserWhislist({product_id:(product_id),action:action}) as  IApiResponse;
    
              if(response.status)
              {
                handleToastPopup({message:`Successfully ${action} product ${action  == 'add' ?  'to' :"from"} your whislist`,type:"success"});
                setTimeout(() => window.location.reload(),1000);
              }else{
                handleToastPopup({message:(response.message),type:"error"});
              }
          } catch (error) {
              handleToastPopup({message:handleCatchErrors(error),type:"error"});
          }
        }
      },[userData])
    
    const handleUserCart  = useCallback(async(product_id:number) =>  {
      if(userData)
      {
        try {
            const   action  = userData.user_cart && userData.user_cart.split(',').includes(product_id.toString()) ? 'remove' : 'add';
            const response   =  await manageUserCart({product_id:(product_id),action:action}) as  IApiResponse;
  
            if(response.status)
            {
              handleToastPopup({message:`Successfully ${action} product ${action  == 'add' ?  'to' :"from"} your Cart`,type:"success"});
              setTimeout(() => window.location.reload(),1000);
            }else{
              handleToastPopup({message:(response.message),type:"error"});
            }
        } catch (error) {
            handleToastPopup({message:handleCatchErrors(error),type:"error"});
        }
      }
    },[userData])

    const isCurrentProductInUserOrder   = useCallback((product_id:number)  =>   {
      if(userData && Array.isArray(userOrders) &&  userOrders.length >  0)
        return  userOrders.filter((order) => order.product_id  === product_id);
      return  [];
    },[userOrders,userData]);

    const handlePlaceOrder  = useCallback(async (product_id:number,price:number) => {
      if( userData && products && product_id)
      {
        const isCurrentProductInOrder =  isCurrentProductInUserOrder(product_id);

        if(Array.isArray(isCurrentProductInOrder))
        {
          if(window.confirm('The Product is already  in  your Orders  List. Do  you  want to place new Order?'))
          {
            try {
              const response  = await placeNewOrder({product_id:product_id,price:price}) as IApiResponse;
              if(response.status)
                {
                  handleToastPopup({message:"Successfully  Place New Order",type:"success"});
                  setTimeout(() => window.location.reload(),1000);
                }else
                  handleToastPopup({message:(response.message),type:"error"});
            } catch (error) {
              handleToastPopup({message:handleCatchErrors(error),type:"error"});
            }
          }
        }else{
          try {
            const response  = await placeNewOrder({product_id:product_id,price:price}) as IApiResponse;
            if(response.status)
              {
                handleToastPopup({message:"Successfully  Place New Order",type:"success"});
                setTimeout(() => window.location.reload(),1000);
              }else
                handleToastPopup({message:(response.message),type:"error"});
          } catch (error) {
            handleToastPopup({message:handleCatchErrors(error),type:"error"});
          }
        }
      }
    },[userData,products,isCurrentProductInUserOrder])

    return (
        <UtilFunctionsContext.Provider  value={{handleUserWhislist,handleUserCart,isCurrentProductInUserOrder,handlePlaceOrder}}>
            {children}
            <ToastContainer />
        </UtilFunctionsContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const  useUtilFunctionsContext = () => {
    const  context = useContext(UtilFunctionsContext);
    if(!context)
        throw new  Error("Page Context Not  Found");
    return   context;
}