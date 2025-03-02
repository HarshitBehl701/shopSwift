import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getImagePathUrl, handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { manageProduct } from "@/api/productApi";
import { IEditProductParam, ISubCategories } from "@/interfaces/componentsInterface";
import { Pen, Trash } from "lucide-react";
import Popup from "./Popup";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { IApiResponse, IGetAllCategoriesSubCategoriesResponse, IManageProduct } from "@/interfaces/apiInterfaces";
import { Textarea } from "../ui/textarea";
import UploadPicture from "./UploadPicture";
import { ICategorySubCategoryModal } from "@/interfaces/commonInterfaces";
import { getAllCategoriesAndSubCategories } from "@/api/mainApi";

function EditProduct({productData,setProductData,fieldName}:IEditProductParam) {
    const [form,setForm] = useState({product_id:productData.id} as IManageProduct);
    const [categories,setCategories] =  useState<ICategorySubCategoryModal[] | null>(null);
    const [subCategories,setSubCategories] = useState<ISubCategories[]>([]);
    const [images,setImages] =  useState<File[]>([]);   
    const  [selectedCategory,setSelectedCategory] = useState<number>(0);
    const [limit,setLimit] = useState<number>(5 - productData.images.split(",").length);

    const  handleProductEdit  = useCallback(async  (ev:FormEvent) =>  {
        ev.preventDefault();
        if(window.confirm(`Are you  sure  you  want to Save  Changes`) && ((Object.values(form).length > 1 && fieldName  !==  'images') || (fieldName  === 'images' &&  Object.values(form).length > 0)))
        {
          try {
              const response  = (fieldName ===  'images') ? await manageProduct({...form,images:images}) as  IApiResponse: await manageProduct(form)  as  IApiResponse;
              if(response.status)
              {
                if((fieldName  == 'category' || fieldName  == 'sub_category') &&  Array.isArray(categories) && categories.length >  0)
                {
                    const categoryName:string = categories.filter((category) =>   category.category_id === selectedCategory)[0]['category_name'];
                    const  subCategoryName:string = categories.filter((category) =>   category.category_id === selectedCategory)[0]['sub_categories'].filter((sub_category) => sub_category.sub_category_id  === form.sub_category)[0]['sub_category_name'];
                    setProductData((prev)=>({...prev,category_name:categoryName,sub_category_name:subCategoryName}));
                }else if(fieldName  === 'images' && 'images' in form  || 'deletedImages' in form)
                {
                 setTimeout(() => window.location.reload(),1000);   
                }
                handleToastPopup({message:`Successfully Updated Product ${fieldName.includes("_") ? fieldName.split("_").join(" ") : fieldName}`,type:"success"});
              }else
                handleToastPopup({message:(response.message),type:"error"});
          } catch (error) {
            handleToastPopup({message:handleCatchErrors(error),type:"error"});
          }
        }
      },[form,setProductData,images,fieldName,categories,selectedCategory]);

    const allowedFilesUpload:string[] = useMemo(() => ['image/png','image/jpg','image/jpeg'],[]);
    const maxFileSizeUpload = 2 * 1024 * 1024 //2 MB;

    useEffect(() =>  {
        if((fieldName === "category"  || fieldName === "sub_category")  && categories === null)
        {
            ;(async  () => {
                try {
                    const response = await getAllCategoriesAndSubCategories();
                    if(response.status && response.data)
                    {
                        const responseData = (response.data as  unknown as  IGetAllCategoriesSubCategoriesResponse).data;
                        setCategories(responseData);
                        setSelectedCategory(responseData.filter((obj) => obj.category_name === productData.category_name)[0]['category_id']);
                        if(productData.sub_category_name)
                        {
                            const categoryArr = responseData.filter((obj) => obj.category_name ===  productData.category_name ? obj.sub_categories :  null)[0];
                            setSubCategories(categoryArr['sub_categories']);
                        }

                    }else{
                        handleToastPopup({message:(response.message),type:"error"});
                    }
                } catch (error) {
                    handleToastPopup({message:handleCatchErrors(error),type:"error"});
                }
            })()
        }
    },[categories,fieldName,productData.category_name,productData.sub_category_name]);

    const handleCategorySelection  = useCallback((category_id:string) => {
        if(categories && categories.length > 0 && category_id)
        {
          const categoryArr = categories.filter((obj) => obj.category_id ===  parseInt(category_id) ? obj.sub_categories :  null)[0];
          setSubCategories(categoryArr['sub_categories']);
        }
      },[categories]);

    const handleImageDeletion = useCallback((image:string) => {
        if(limit < 5)
        {
            if(form.deleteImages)
            {
                const deleteImages = form.deleteImages.split(",");
                deleteImages.push(image);
                setForm(prev => ({...prev,deleteImages:deleteImages.join(",")}));
            }else
                setForm(prev => ({...prev,deleteImages:image}));
            setLimit(prev => prev +  1);
            setProductData(prev  => ({...prev, images: (prev.images.split(",").filter((prevImage) => prevImage  !== image ).join(","))}))
        }
    },[setProductData,limit,form.deleteImages]);

  return (
    <>
        <Popup buttonText={<Pen />}  buttonStyling="bg-transparent text-blue-500  shadow-none">
            <form onSubmit={handleProductEdit}>
                <h1 className="text-xl font-semibold  mb-3">Edit {fieldName}</h1>
                {fieldName === "product_name" && 
                    <div>
                        <Label>Product Name</Label>
                        <Input
                        name="product_name"
                        value={form.product_name || productData.product_name}
                        onChange={(e) => setForm((prev) => ({ ...prev, product_name: e.target.value }))}
                        required
                        />
                    </div>
                }
                
                {fieldName === "description" && 
                    <div>
                        <Label>Description</Label>
                        <Textarea
                        name="description"
                        className="resize-none"
                        value={form.description || productData.description}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, description: e.target.value }))
                        }
                        required
                        />
                    </div>
                }
                
                {(fieldName === "category"  || fieldName === "sub_category") && 
                    <div className="space-y-4">
                        <div>
                        <select
                        onChange={(e) => {
                            const value = e.target.value;
                            handleCategorySelection(value);
                            setSelectedCategory(parseInt(value));
                            setForm((prev) => ({...prev,category:parseInt(value)}));
                        }}
                        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm focus:ring-2 focus:ring-black focus:border-black"
                        >
                        <option value="" disabled selected>
                        Select Category
                        </option>
                        {Array.isArray(categories) &&
                            categories.map((category) => (
                            <option key={category.category_id} value={category.category_id} selected={form.category  === category.category_id ||  productData.category_name ===  category.category_name}>
                                {category.category_name}
                            </option>
                            ))}
                        </select>
                        </div>
                        <div className={`${subCategories.length >  0  || productData.sub_category_name ?   "block"  : "hidden"}`}>
                        <select
                        onChange={(e) => {
                            const value = e.target.value;
                            setForm((prev) => ({ ...prev, category: form.category ?? selectedCategory ,sub_category: parseInt(value) }));
                        }}
                        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm focus:ring-2 focus:ring-black focus:border-black"
                        >
                        <option value="" disabled   selected>
                        Select Sub Category
                        </option>
                        {Array.isArray(subCategories) &&
                            subCategories.map((subCategory) => (
                            <option key={subCategory.sub_category_id} value={subCategory.sub_category_id} selected={form.sub_category === subCategory.sub_category_id || productData.sub_category_name  === subCategory.sub_category_name}>
                                {subCategory.sub_category_name}
                            </option>
                            ))}
                        </select>
                        </div>
                    </div>
                }
                
                {fieldName === "price" && 
                    <div>
                        <Label>Price</Label>
                        <Input
                        type="number"
                        name="price"
                        value={form.price || productData.price}
                        onChange={(e) =>
                        {
                            setForm((prev) => ({ ...prev, price: parseInt(e.target.value) }))
                        }
                        }
                        required
                        />
                    </div>
                }
                
                {fieldName === "discount" && 
                    <div>
                    <Label>Discount</Label>
                    <Input
                        type="number"
                        name="discount"
                        value={form.discount ||  productData.discount}
                        onChange={(e) =>
                        setForm((prev) => ({ ...prev, discount: parseInt(e.target.value) }))
                        }
                        required
                    />
                    </div>
                }
                
                {fieldName === "images" &&
                <>
                <h1 className="text-xl  font-semibold mb-3">Uploaded Images</h1>
                <div className="grid grid-cols-5 gap-2 mb-4">
                {Array.isArray(productData.images.split(",")) && productData.images.split(",").length  > 0 && productData.images.split(",").map((image, index) => {
                    if(image !== '')
                    {
                        return  <div className="image w-fit inline-block group  cursor-pointer border border-gray-300 relative rounded-md  shadow-md" key={index}>
                        <img
                            src={getImagePathUrl("product",image)}
                            alt="preview"
                            className="w-20 h-20 object-cover rounded-md"
                        />
                        <Button className="absolute hidden group-hover:flex  items-center  justify-center text-center cursor-pointer top-0  w-full h-full  text-red-500 backdrop-blur-xs" onClick={(ev) => {
                            ev.preventDefault();
                            handleImageDeletion(image);
                        }}><Trash className="scale-150"/></Button>
                        </div>
                    }
                })}
                </div>
                <UploadPicture displayText={"Drag & Drop or  Click  to Upload Product Images"} limit={limit} images={images} setImages={setImages} allowedFiles={allowedFilesUpload} maxFileSize={maxFileSizeUpload}/>
                </> 
                }


                <Button type="submit" className="bg-blue-600 hover:bg-blue-700  cursor-pointer text-white   mt-3">Save Changes</Button>
            </form>
        </Popup>
    </>
  )
}

export default EditProduct