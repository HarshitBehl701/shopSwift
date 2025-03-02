import {z}   from "zod";

export  const registerSellerSchema = z.object({
    seller_name: z.string().nonempty("Please  Enter your full  name"),
    brand_name: z.string().nonempty("Please  Enter your brand  name"),
    email: z.string().email("Enter A  Valid  Email").nonempty("Email Cannot  Be   Empty"),
    seller_password: z.string().min(8,"Password  must  be  of 8 characters").nonempty("Password  Cannot  Be Empty")
});