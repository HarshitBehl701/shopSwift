import Popup from "./Popup"
import { FormEvent, useCallback, useState } from "react"
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { validateSchema } from "@/validations/validateSchema";
import { createNewSubCategorySchema } from "@/validations/schema/mainSchema";
import { IApiResponse, ICreateNewSubCategory} from "@/interfaces/apiInterfaces";
import { Button } from "../ui/button";
import { createNewSubCategory } from "@/api/mainApi";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ICreatNewSubCategoryParam } from "@/interfaces/componentsInterface";

function AddNewSubCategory({categories}:ICreatNewSubCategoryParam) {
  const   [formData,setFormData]  =   useState({category_id:0,sub_category_name:""} as ICreateNewSubCategory);

  const  handlFormSubmit = useCallback(async (ev:FormEvent) =>{
    ev.preventDefault();
    try {
      const  validateField =  validateSchema(createNewSubCategorySchema,name);
      if(Array.isArray(validateField) &&  validateField.length > 0)
        validateField.map((err) => handleToastPopup({message:err,type:"error"}));
      else{
        const response  = await createNewSubCategory(formData) as IApiResponse;
        if(response.status)
        {
          handleToastPopup({message:"Successfully Created New Sub Category",type:"success"});
          setTimeout(() => window.location.reload(),1000);    
        }else
          handleToastPopup({message:(response.message),type:"error"});    
      }
    } catch (error) {
      handleToastPopup({message:handleCatchErrors(error),type:"error"});
    }
  },[formData]);

  return (
    <>
      <Popup buttonText="Add New Sub Category">
        <form onSubmit={handlFormSubmit}>
            <Label htmlFor="subcategoryname">Name</Label>
            <Input id="subcategoryname" type="text" placeholder="Enter Sub Category  Name" className="mt-1" value={formData.sub_category_name}   onChange={(e) => setFormData((prev) => ({...prev,sub_category_name:e.target.value}))}/>

              <Select onValueChange={(val) => setFormData((prev) => ({...prev,category_id:parseInt(val)}))}>
                <SelectTrigger className="w-full  mt-4" >
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {Array.isArray(categories) && categories.map((category) =>  <SelectItem value={category.category_id.toString()} key={category.category_name} className="capitalize">{category.category_name}</SelectItem>)}
                </SelectContent>
              </Select>

            <Button className="mt-2  bg-black text-white" type="submit">Submit</Button>
        </form>
      </Popup>
    </>
  )
}

export default AddNewSubCategory