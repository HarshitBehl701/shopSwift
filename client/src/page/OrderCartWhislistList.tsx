import OrdersListTable from "@/components/customComponents/OrdersListTable";
import ProductListTable from "@/components/customComponents/ProductListTable";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePageContext } from "@/contexts/pageContext";
import { useUserContext } from "@/contexts/userContext";
import { IProductModal } from "@/interfaces/commonInterfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderCartWhislistList() {
  const  {requestedPage} =  useParams();
  const  [filteredProduct,setFilteredProduct] = useState<IProductModal[] | null>(null);
  const  {products} = usePageContext();
  const  {userData} = useUserContext();

  useEffect(() => {
    if(products && userData)
    {
      if(requestedPage?.includes("cart"))
        setFilteredProduct([...new Set(products.filter((product) => userData?.user_cart ? userData?.user_cart.split(",").includes(product.id.toString()) :  false))]);
      else if(requestedPage?.includes("whislist"))
        setFilteredProduct([...new Set(products.filter((product) => userData?.user_whislist ? userData?.user_whislist.split(",").includes(product.id.toString()) : false))]);
    }
  },[requestedPage,products,userData]);
  
  return (
    <Card className="border-none  shadow-none">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 capitalize">{requestedPage}</h3>
          <Separator />
          {requestedPage?.includes("order") && <OrdersListTable   />}
          {(requestedPage?.includes('cart') || requestedPage?.includes("whislist")) && <ProductListTable filteredProduct={filteredProduct} request_page={requestedPage} />}
        </CardContent>
      </Card>
  )
}

export default OrderCartWhislistList