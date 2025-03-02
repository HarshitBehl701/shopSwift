import  {z}  from  "zod";

export const createNewProductPage1Schema = z.object({
    product_name: z.string().nonempty("Product  Name is  required"),
    description: z.string().nonempty("Description is  required"),
});

export const createNewProductPage2Schema = z.object({
    category: z.number().min(1,"Category is required"),
    sub_category: z.number().min(1,"Sub Category is   required")
});

export const createNewProductPage3Schema = z.object({
    price: z.number().min(0,"Price  Field is required"),
    discount: z.number()
});

export const createNewProductPage4Schema = z.object({
    images: z.array(z.instanceof(File)).nonempty("Please Upload At Least  One  Image").max(5,"At max 5  Product Images Are  Allowed")
});