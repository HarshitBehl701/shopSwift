import { AdminModal } from "../modals/AdminModal";
import { getCustomCatchBlockResponseStructure } from "../utils/commonHelpers"
import bcrypt from "bcrypt";

export  const  createDefaultAdmin  = async () => {
    try {
        
        const adminEmail =  process.env.DEFAULT_ADMIN_EMAIL;
        const  adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
        const adminName = process.env.APP_NAME;
        if(adminEmail &&  adminPassword &&   adminName)
        {
            const adminModal = new AdminModal();

            const  isAdminExists  = await  adminModal.getAdmin({column_name:"admin_email",value:adminEmail});

            if(!isAdminExists.status  || !(Array.isArray(isAdminExists.data)  &&  isAdminExists.data.length > 0))
            {
                const hashPassword = await  bcrypt.hash(adminPassword,10);

                const response = await   adminModal.registerNewAdmin({admin_email:adminEmail,admin_password:hashPassword,admin_name:adminName})

                if(!response.status)
                {
                    console.log(response.message);
                    return;
                }
                console.log("Successfully Seed Admin Table");
                return;
            }
        }

    } catch (error) {
        console.log(getCustomCatchBlockResponseStructure(error));        
    }
}