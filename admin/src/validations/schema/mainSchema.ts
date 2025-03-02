import {z} from "zod";

export const createNewCategorySchema  = z.object({
    name: z.string().nonempty("Please Enter  A Valid Name")
})

export const createNewSubCategorySchema =  z.object({
    category_id: z.number().min(1),
    sub_category_name: z.string().nonempty("Please Enter A Valid Name")
})