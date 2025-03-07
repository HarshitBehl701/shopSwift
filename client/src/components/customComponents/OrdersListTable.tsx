import { useUserContext } from "@/contexts/userContext"
import { IOrdersListTableParam } from "@/interfaces/componentInterfaces"
import { formatDate } from "@/utils/commonUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IOrderModal } from "@/interfaces/commonInterfaces";
import LoadingTableSkeleton from "../skeletons/LoadingTableSk";

function OrdersListTable({filteredOrders}:IOrdersListTableParam) {
    const  {userOrders,userData} = useUserContext();
    const  navigate  = useNavigate();

    const [pageData,setPageData] = useState<IOrderModal[] |  null   | undefined>(null);

    useEffect(() =>{
        if(filteredOrders)
        {   
            setPageData(filteredOrders);
        }else{
            setPageData(userOrders);
        }
    },[userOrders,filteredOrders]);


  return (
    <>
        {Array.isArray(pageData)  && pageData.length  > 0 && <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(pageData) && pageData.map((order,index) => 
                <TableRow  className="cursor-pointer" onClick={() =>  navigate(`/${encodeURIComponent(userData?.user_name ?? '')}/order/${order.product_name}?order_id=${order.id}&product_id=${order.product_id}`,{state:order})}>
                  <TableCell className="font-semibold">{index +  1}</TableCell>
                  <TableCell className="font-semibold">{order.product_name}</TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell className="text-green-500">{order.order_status}</TableCell>
                  <TableCell>₹{order.price}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>}
          {!pageData &&  <LoadingTableSkeleton />}
          {((Array.isArray(pageData) &&  pageData.length  === 0)) && <p className="italic text-gray-500">Your last  orders  will show  here...</p>}
    </>
  )
}

export default OrdersListTable