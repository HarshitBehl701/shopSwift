import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Popup from "./Popup";
import UploadPicture from "./UploadPicture";
import { ICategorySubCategoryModal } from "@/interfaces/commonInterfaces";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { getAllCategoriesAndSubCategories } from "@/api/mainApi";
import { IApiResponse, ICreateNewProduct, IGetAllCategoriesSubCategoriesResponse } from "@/interfaces/apiInterfaces";
import { ISubCategories } from "@/interfaces/componentsInterface";
import { validateSchema } from "@/validations/validateSchema";
import { createNewProductPage1Schema, createNewProductPage2Schema, createNewProductPage3Schema, createNewProductPage4Schema } from "@/validations/schema/productSchema";
import { ToastContainer } from "react-toastify";
import { ZodSchema } from "zod";
import { createNewProduct } from "@/api/productApi";

export default function MultiPageProductForm() {
  const [form, setForm] = useState({
    product_name: "",
    description: "",
    discount:  0
  } as ICreateNewProduct);

  const [categories,setCategories] = useState<ICategorySubCategoryModal[]>([]);
  const [subCategories,setSubCategories] = useState<ISubCategories[]>([]);
  
  const [images,setImages] = useState<File[]>([]);

  const [page, setPage] = useState<number>(1);

  const  validationSchema:Record<number,ZodSchema> = useMemo(() => ({
    1:createNewProductPage1Schema,
    2:createNewProductPage2Schema,
    3:createNewProductPage3Schema,
    4:createNewProductPage4Schema,
  }),[]);

  const nextPage = useCallback(() => {
    const validateForm = validateSchema(validationSchema[page],form); 
    if(Array.isArray(validateForm))
      validateForm.map((err) => handleToastPopup({message:err,type:"error"}));
    else
    setPage((prev) => Math.min(prev + 1, 4)) 
  },[form,page,validationSchema]);
  
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const allowedFilesUpload:string[] = useMemo(() => ['image/png','image/jpg','image/jpeg'],[]);
  const   maxFileSizeUpload = 2 * 1024 * 1024 //2 MB;

  const hanldeFormSubmt = useCallback(async(e:FormEvent) =>{
    e.preventDefault();
    try {
        const   response  =  await createNewProduct({...form,images}) as  IApiResponse;
        if(response.status)
        {
          handleToastPopup({message:"Successfully Added New Product",type:"success"});
          setTimeout(()=>window.location.reload(),1000);          
        }else
          handleToastPopup({message:(response.message),type:"error"});
    } catch (error) {
        handleToastPopup({message:handleCatchErrors(error),type:"error"});
    }
  },[form,images])

  useEffect(() => {
    if(page  == 2 &&  categories.length == 0)
    {
      ;(async() => {
        try {
          const response = await getAllCategoriesAndSubCategories();

          if(response.status &&  response.data){
            const responseData = (response.data as  unknown as  IGetAllCategoriesSubCategoriesResponse).data;
            setCategories(responseData);
          }else{
            handleToastPopup({message:"Something  Went  Wrong ,  Please  Try Again  Later",type:"error"});
            setTimeout(() =>  window.location.reload(),1000);
          }

        } catch (error) {
            handleToastPopup({message:"Something  Went  Wrong ,  Please  Try Again  Later",type:"error"});
            setTimeout(() =>  window.location.reload(),1000);
            throw   new  Error(handleCatchErrors(error));
        }
      })()
    }
      
  },[page,categories.length]);

  const handleCategorySelection  = useCallback((category_id:string) => {
    if(categories.length > 0 && category_id)
    {
      const categoryArr = categories.filter((obj) => obj.category_id ===  parseInt(category_id) ? obj.sub_categories :  null)[0];
      setSubCategories(categoryArr['sub_categories']);
    }
  },[categories]);

  return (
    <Popup buttonText="Add New Product">
      <form onSubmit={hanldeFormSubmt}>

            <div className="flex justify-between mb-4 w-[98%] items-center">
            <h2 className="text-xl font-semibold">Create New Product</h2>
            <span className="text-gray-500 text-sm">Page {page} / 4</span>
          </div>
          {page === 1 && (
            <div className="space-y-4">
              <div>
                <Label>Product Name</Label>
                <Input
                  name="product_name"
                  value={form.product_name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, product_name: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  name="description"
                  className="resize-none"
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  required
                />
              </div>
            </div>
          )}

          {page === 2 && (
            <div className="space-y-4">
              <div>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  handleCategorySelection(value);
                  setForm((prev) => ({ ...prev, category: parseInt(value),sub_category:0 }));
                }}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm focus:ring-2 focus:ring-black focus:border-black"
              >
                <option value="" disabled selected>
                Select Category
                </option>
                {Array.isArray(categories) &&
                  categories.map((category) => (
                    <option key={category.category_id} value={category.category_id} selected={form.category === category.category_id}>
                      {category.category_name}
                    </option>
                  ))}
              </select>
              </div>
              <div className={`${subCategories.length >  0 ?   "block"  : "hidden"}`}>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  handleCategorySelection(value);
                  setForm((prev) => ({ ...prev, sub_category: parseInt(value) }));
                }}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm focus:ring-2 focus:ring-black focus:border-black"
              >
                <option value="" disabled   selected>
                Select Sub Category
                </option>
                {Array.isArray(subCategories) &&
                  subCategories.map((subCategory) => (
                    <option key={subCategory.sub_category_id} value={subCategory.sub_category_id} selected={form.sub_category === subCategory.sub_category_id}>
                      {subCategory.sub_category_name}
                    </option>
                  ))}
              </select>
              </div>
            </div>
          )}

          {page === 3 && (
            <div className="space-y-4">
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, price: parseInt(e.target.value) }))
                  }
                  required
                />
              </div>
              <div>
                <Label>Discount</Label>
                <Input
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, discount: parseInt(e.target.value) }))
                  }
                  required
                />
              </div>
            </div>
          )}

          {page   ===  4 &&  <UploadPicture displayText={"Drag & Drop or  Click  to Upload Product Images"} limit={5} images={images} setImages={setImages} allowedFiles={allowedFilesUpload} maxFileSize={maxFileSizeUpload}/>}

          <div className="flex justify-between mt-4">
            {page > 1 && <Button   type="button" onClick={prevPage} variant={'link'} className="cursor-pointer">Previous</Button>}
            {page < 4 ? <Button type="button" onClick={nextPage} className="bg-black text-white cursor-pointer">Next</Button> : <Button type="submit" className="bg-blue-600 cursor-pointer hover:bg-blue-700  text-white">Submit</Button>}
          </div>

      </form>
      <ToastContainer />
    </Popup>
  );
}