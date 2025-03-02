import { z } from "zod";

export const loginUserSchema = z.object({
    email: z.string().email("Enter A  Valid  Email").nonempty("Email Cannot  Be   Empty"),
    password: z.string().min(8,"Password  must  be  of 8 characters").nonempty("Password  Cannot  Be Empty")
});

export  const registerUserSchema = z.object({
    user_name: z.string().nonempty("Please  Enter your full  name"),
    email: z.string().email("Enter A  Valid  Email").nonempty("Email Cannot  Be   Empty"),
    user_password: z.string().min(8,"Password  must  be  of 8 characters").nonempty("Password  Cannot  Be Empty")
});

export  const  userPhotoSchema  = z.object({
    name: z.string().nonempty("File is  required"), // File name
    type: z.enum(["image/png", "image/jpeg", "image/jpg"]), // Allowed file types
    size: z.number().max(2 * 1024 * 1024,'File Size Must Be  Under 2MB'), // Max size 2MB
}).refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed",
});

export const  editUserAccountSchema =  z.object({
    user_name:  z.string().optional(),
    user_email: z.string().email("Email Is Not  Valid").optional(),
    address:z.string().optional(),
    user_password: z.string().min(8).max(16).optional(),
})