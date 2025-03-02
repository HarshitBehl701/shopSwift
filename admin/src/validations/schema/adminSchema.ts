import  {z} from "zod";

export  const loginAdminSchema =  z.object({
    email: z.string().nonempty("Email Cannot Be Empty").email("Please Enter A Valid Email"),
    password:  z.string().nonempty("Password Cannot Be Empty").min(8,"Minumum Password length  is 8")
})