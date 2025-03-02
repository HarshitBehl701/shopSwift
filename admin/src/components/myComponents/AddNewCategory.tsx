import { Input } from "../ui/input"
import Popup from "./Popup"
import { FormEvent, useCallback, useState } from "react"
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { ToastContainer } from "react-toastify";
import { validateSchema } from "@/validations/validateSchema";
import { createNewCategorySchema } from "@/validations/schema/mainSchema";
import { createNewCategory } from "@/api/mainApi";
import { IApiResponse } from "@/interfaces/apiInterfaces";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

function AddNewCategory() {
  const [name,setname] = useState<string>("");

  const  handlFormSubmit = useCallback(async (ev:FormEvent) =>{
    ev.preventDefault();
    try {
      const  validateField =  validateSchema(createNewCategorySchema,name);
      
      if(Array.isArray(validateField) &&  validateField.length > 0)
        validateField.map((err) => handleToastPopup({message:err,type:"error"}));
      else{
        const response  = await createNewCategory({name:name}) as IApiResponse;
        if(response.status)
        {
          handleToastPopup({message:"Successfully Created New  Category",type:"success"});
          setTimeout(() => window.location.reload(),1000);    
        }else
          handleToastPopup({message:(response.message),type:"error"});    
      }
    } catch (error) {
      handleToastPopup({message:handleCatchErrors(error),type:"error"});
    }
  },[name]);

  return (
    <>
      <Popup buttonText="Add New Category">
        <form onSubmit={handlFormSubmit}>
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="name" placeholder="Enter  Category  Name" className="mt-1" value={name}   onChange={(e) => setname(e.target.value)}/>
              <Button className="mt-2  bg-black text-white" type="submit">Submit</Button>
        </form>
      </Popup>
      <ToastContainer />
    </>
  )
}

export default AddNewCategory