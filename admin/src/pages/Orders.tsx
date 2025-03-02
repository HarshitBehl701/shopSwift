import { useEffect, useMemo, useState } from "react";
import { ICustomTable } from "@/interfaces/componentsInterface";
import CustomTable from "@/components/myComponents/CustomTable";
import { IOrderModal } from "@/interfaces/commonInterfaces";
import { handleCatchErrors } from "@/utils/commonUtils";
import { getAllOrders } from "@/api/orderApi";
import { IGetAllOrdersOfSellerResponse } from "@/interfaces/apiInterfaces";

function Orders() {
    const [orders,setOrders]  =  useState<IOrderModal[] |  null>(null);

    const columns:Array<keyof IOrderModal> = useMemo(() => ['id','product_name','price','order_status','rating','is_active'],[]); 
    
    const tableData:ICustomTable = useMemo(() =>  (
        {
            title: "Orders",
            currentPage:"Orders",
            headings:  ['Order ID','Product  Name','Price','Status','Rating','Status'],
            columns: columns ,
            rowsData: orders,
            editActionRequired:  true,
            editActionRedirectUrl:"/order/",
            isColumnIncludedInRedirectUrl: true,
            columnNameOfRedirectUrl: "id",
        }
    ),[orders,columns]); 

    useEffect(() => {
        if(orders === null)
        {
            ;(async() => {
                try {
                    const response   = await getAllOrders();
                    if(response.status &&  response.data)
                    {
                        const responseData =  (response.data as IGetAllOrdersOfSellerResponse);
                        setOrders(responseData.orders);
                    }else
                        throw  new  Error(response.message);
                } catch (error) {
                    throw  new  Error(handleCatchErrors(error));
                }
            })()
        }
    },[orders,setOrders]);
    
    return (
        <CustomTable tableData={tableData}   />
    )
}

export default Orders;