import { useEffect, useMemo, useState } from "react";
import { ICustomTable } from "../interfaces/componentsInterface";
import CustomTable from "../components/myComponents/CustomTable";
import { useParams } from "react-router-dom";
import AddNewCategory from "@/components/myComponents/AddNewCategory";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { getAllCategoriesSubCategories } from "@/api/mainApi";
import {  IGetAllCategoriesAndSubCategories } from "@/interfaces/apiInterfaces";
import { ToastContainer } from "react-toastify";
import AddNewSubCategory from "@/components/myComponents/AddNewSubCategory";
import { ICategoryDataType, ISubCategoryType } from "@/interfaces/commonInterfaces";

function ManagePage() {
  const {type} = useParams();
  const [categories,setCategories] = useState<ICategoryDataType[] | null>(null);
  const [subCategories,setSubCategories] = useState<ISubCategoryType[] | null>(null);

  const tableHeaders:Array<string> | null = useMemo(() => {
    if(type?.toLowerCase() === "categories")
        return ['Category ID','Image',"Name","Created At","Status"];
    else if(type?.toLowerCase().includes("subcategories"))
        return ["Sub Category ID",'Image','Category',"Name","Created At","Status"];
    return   null;
  },[type]);

  const tableColumns:Array<keyof ICategoryDataType |  keyof ISubCategoryType> | null = useMemo(() => {
    if(type?.toLowerCase() ===   "categories")
        return ['category_id',"category_image","category_name","category_created_at","category_is_active"];
    else if(type?.toLowerCase().includes("subcategories"))
        return ["sub_category_id","sub_category_image",'category_name',"sub_category_name","sub_category_created_at","sub_category_is_active"];
    return   null;
  },[type]);

  const tableData:ICustomTable | null = useMemo(() =>  {
    if(type && Array.isArray(tableHeaders) &&  Array.isArray(tableColumns))
    {
        return{
            title: type,
            currentPage:"Main",
            headings: tableHeaders,
            columns: tableColumns,
            rowsData: type.toLowerCase()  === 'categories' ? categories  : subCategories,
            editActionRequired:  true,
            editActionRedirectUrl: "/",
            isColumnIncludedInRedirectUrl: false,
        }
    }
    return  null;
  },[type,tableHeaders,categories,subCategories,tableColumns]); 

    useEffect(() =>{
        if(categories ===  null)
        {
            ;(async () =>  {
                try {
                    const  response  = await getAllCategoriesSubCategories();

                    if(response.status && response.data)
                    {
                        const responseData = (response.data as IGetAllCategoriesAndSubCategories).data;
                        setCategories(responseData.map((obj) => ({
                            category_id:obj.category_id,
                            category_name:obj.category_name,
                            category_image:obj.category_image,
                            category_is_active:obj.category_is_active,
                            category_created_at:obj.category_created_at,
                            category_updated_at:obj.category_updated_at,
                        })));
                        responseData.forEach((data) => {
                            const  subCategories:ISubCategoryType[]  =   data.sub_categories;
                            if(subCategories.length >  0)
                            {
                                const   newData = subCategories.map((subCategory)  => ({...subCategory,category_name:data.category_name,category_id:data.category_id}));
                                setSubCategories([...newData]);
                            }
                        })

                    }else
                        handleToastPopup({message:(response.message),type:"error"});

                } catch (error) {
                    handleToastPopup({message:handleCatchErrors(error),type:"error"});
                }
            })();
        }
    },[categories,setCategories,type]);

    return (
        <>
        <div className="btn mb-4">
        {type?.toLowerCase() == 'categories' ? <AddNewCategory />   : <AddNewSubCategory categories={categories} />}
        </div>
        {tableData &&<CustomTable tableData={tableData} />}
        <ToastContainer  />
        </>
    )
}

export default ManagePage