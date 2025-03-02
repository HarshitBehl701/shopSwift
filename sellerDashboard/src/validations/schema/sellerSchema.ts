import {z}  from "zod";

export const sellerLoginSchema = z.object({
    email: z.string().nonempty("Email  Field  Cannot  Be  Empty").email("Invalid Email"),
    password: z.string().nonempty("Password  Field  Cannot  Be  Empty").min(8,"Password  Must  Be  of 8  characters")
})