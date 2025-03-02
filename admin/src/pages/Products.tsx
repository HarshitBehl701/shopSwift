import { useEffect, useMemo, useState } from "react";
import { ICustomTable } from "@/interfaces/componentsInterface";
import CustomTable from "@/components/myComponents/CustomTable";
import { IProductModal } from "@/interfaces/commonInterfaces";
import { handleCatchErrors } from "@/utils/commonUtils";
import { getAllProducts } from "@/api/productApi";
import { IGetAllProductsResponse } from "@/interfaces/apiInterfaces";

function Products() {
    const [products,setProducts] =  useState<IProductModal[] | null>(null);

    const columns:Array<keyof IProductModal> = useMemo(() => ['product_name','brand_name','category_name','sub_category_name','average_rating','price','status'],[]); 

    const tableData:ICustomTable = useMemo(() =>  (
        {
            title: "Products",
            currentPage:"Products",
            headings:  ['Product Name','Brand Name','Category','Sub Category','Rating','Price','Status'],
            columns: columns ,
            rowsData: products,
            editActionRequired:  true,
            editActionRedirectUrl:"/product/",
            isColumnIncludedInRedirectUrl: true,
            columnNameOfRedirectUrl: "product_name",
        }
    ),[products,columns]); 

    useEffect(() =>{
        if(products ===  null)
        {
            ;(async () => {
                try {
                   const response = await getAllProducts(); 

                   if(response.status &&  response.data)
                   {
                        const responseData   =   (response as IGetAllProductsResponse).data;
                        setProducts(responseData.products);
                   }else{
                        throw new  Error(response.message);
                   }

                } catch (error) {
                    throw  new Error(handleCatchErrors(error));
                }
            })()
        }
    },[products,setProducts]);
    return (
        <>
            {Array.isArray(products) &&  <CustomTable tableData={tableData}   />}
            {(Array.isArray(products) &&  products.length === 0 || products  ===  null) && <p className="italic">No  Products  Found....</p>}
        </>
    )
}

export default Products