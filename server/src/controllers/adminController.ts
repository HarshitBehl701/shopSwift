import  {Request,Response} from  "express";
import { getCustomCatchBlockResponseStructure, responseStructure } from "../utils/commonHelpers"
import { AdminModal, IAdminModal } from "../modals/AdminModal";
import bcrypt   from "bcrypt";
import jwt  from "jsonwebtoken";
import { IAdminDetailsResponse } from "../interfaces/queriesInterfaces";

export  const registerAdmin = async (req:Request,res:Response):Promise<void> => {
    try {
        const  {admin_name,admin_email,admin_password} = req.body;

        const adminModal =  new  AdminModal();

        const isAdminExists  =  await adminModal.getAdmin({column_name:"admin_email",value:admin_email});
        if(isAdminExists.status)
        {
            res.status(409).json
            (responseStructure(false,"Account  Already   Exists"));
            return;
        }

        const  hashPassword = await bcrypt.hash(admin_password,10);

        const newAdmin = await  adminModal.registerNewAdmin({
            admin_name,
            admin_email,
            admin_password:hashPassword
        });

        if(!newAdmin.status)
        {
            res.status(400).json(responseStructure(false,"Something Went  Wrong"));
            return;
        }

        res.status(201).json(responseStructure(true,"Successfully  Register  New Admin"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const logoutAdmin  =  async  (req:Request,res:Response):Promise<void>  =>{
    try {
        res.clearCookie('ALoginToken');
        res.status(200).json(responseStructure(true,"Successfully Logout"));
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const loginAdmin   =   async (req:Request,res:Response):Promise<void> => {
    try {
        const {email,password}  = req.body;

        const  adminModal  = new AdminModal();

        const adminAccountResponse  = await  adminModal.getAdmin({column_name:"admin_email",value:email});
        if(!adminAccountResponse.status)
        {
            res.status(400).json(responseStructure(false,"Email Or  Password  Is Incorrect"));
            return;
        }

        const adminAccount  = (adminAccountResponse.data  as IAdminModal[])[0];

        if(adminAccount.is_active === 0)
        {
            res.status(400).json(responseStructure(false,"Account is  not active"));
            return;
        }

        const isPasswordCorrect  =  await  bcrypt.compare(password,adminAccount.admin_password);

        if(!isPasswordCorrect)
        {
            res.status(400).json(responseStructure(false,"Email Or  Password  Is Incorrect"));
            return;
        }


        const secretKey = process.env.SECRET_KEY ||  "shopSwift";
        const loginToken    =  jwt.sign({id:adminAccount.id},secretKey);
        const clientToken  =  jwt.sign({},secretKey);

        res.cookie("ALoginToken",loginToken,{
            httpOnly:   true,
            secure:  true,
            sameSite: "none",
            maxAge:  86400000  //1 day  in milliseconds
        })

        const userData:IAdminDetailsResponse  = {
            admin_id:  adminAccount.id,
            admin_name:  adminAccount.admin_name,
            admin_email:  adminAccount.admin_email,
            is_active:  adminAccount.is_active,
            created_at:  adminAccount.created_at,
            updated_at:  adminAccount.updated_at
        }

        res.status(200).json(responseStructure(true,"Successfully Login  To  Your Account",JSON.stringify({userData:userData,loginToken:clientToken})))

        
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const updateAdmin = async (req:Request,res:Response):Promise<void>=>{
    try {
        const  {admin_id,admin_name,admin_email,admin_password,is_active}  =  req.body;

        const  adminModal = new  AdminModal();

        const  adminAccountResponse  = await  adminModal.getAdmin({column_name:"id",value:admin_id});

        if(!adminAccountResponse.status)
        {
            res.status(404).json(responseStructure(false,"Account  Not found"));
            return;
        }

        const adminAccount  =  (adminAccountResponse.data as IAdminModal[])[0];

        const allowedFieldstoUpdate  =  {admin_name,admin_email,admin_password,is_active};

        const updateRequestData = Object.fromEntries(Object.entries(allowedFieldstoUpdate).filter(([key,value]) => value !== undefined));

        //if admin  updates  email
        if("admin_email" in updateRequestData   && adminAccount.admin_email.toLowerCase() !==  admin_email)
        {
            const  isOtherAdminExistsWithThisEmailResponse  =  await  adminModal.getAdmin([{column_name:"admin_email",value:admin_email},{column_name:"id",value:admin_id,operand:'!='},{column_name:"is_active",value:1}])     
            
            if(isOtherAdminExistsWithThisEmailResponse.status)
            {
                res.status(400).json(responseStructure(false,"Admin  Already Exists With Same Email"));
                return;
            }

        }

        //if admin updates account status
        if("is_active"  in  updateRequestData && adminAccount.is_active !==  is_active &&  is_active  === 1)
        {
            const  isOtherAdminExistsWithThisEmailResponse  =  await  adminModal.getAdmin([{column_name:"admin_email",value:admin_email},{column_name:"id",value:admin_id,operand:'!='},{column_name:'is_active',value:1}]);     
            
            if(isOtherAdminExistsWithThisEmailResponse.status)
            {
                res.status(400).json(responseStructure(false,"An Active  Admin  Account already exists with the  same email"));
                return;
            }
        }
        
        if(admin_password)
        {
            const hashPassword = await  bcrypt.hash(admin_password,10);
            updateRequestData.admin_password  = hashPassword;
        }


        const updateAdmin  = await  adminModal.updateAdminAccountDetails(updateRequestData,{column_name:"id",value:adminAccount.id});

        if(!updateAdmin.status)
        {
            res.status(400).json(responseStructure(false,"Something Went  Wrong"));
            return;
        }
        
        const userData:IAdminDetailsResponse = {
            admin_id:  adminAccount.id,
            admin_name:  admin_name,
            admin_email:  admin_email,
            is_active:  is_active,
            created_at:  adminAccount.created_at,
            updated_at:  adminAccount.updated_at
        }

        res.status(200).json(responseStructure(true,"Successfully Update  Admin Account",JSON.stringify({userData:userData})))

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const getAdminAccountDetails   = async   (req:Request,res:Response):Promise<void> => {
    try {
        
        const adminAccount =   (req  as any).admin  as IAdminModal;

        const {admin_id} = req.body;
        let userData:IAdminDetailsResponse; 
        if(admin_id === adminAccount.id)
        {
            userData = {
                admin_id:  adminAccount.id,
                admin_name:  adminAccount.admin_name,
                admin_email:  adminAccount.admin_email,
                is_active:  adminAccount.is_active,
                created_at:  adminAccount.created_at,
                updated_at:  adminAccount.updated_at
            }
        }else{
            const   adminModal  = new  AdminModal();
            const response  = await  adminModal.getAdmin({column_name:"id",value:admin_id});

            if(!response.status ||  !(Array.isArray(response.data) && !(response.data.length >  0)))
            {
                res.status(404).json(responseStructure(false,"Account  Not  Found"));
                return;
            }

            const adminData = (response.data as IAdminModal[])[0];

            userData = {
                admin_id:  adminAccount.id,
                admin_name:  adminData.admin_name,
                admin_email:  adminData.admin_email,
                is_active:  adminData.is_active,
                created_at:  adminData.created_at,
                updated_at:  adminData.updated_at
            }
        }

        res.status(200).json(responseStructure(true,"Successfully Fetch  Account Details",JSON.stringify({adminData:userData})))

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const getLoginAdminDetails   = async   (req:Request,res:Response):Promise<void> => {
    try {
        
        const adminAccount =   (req  as any).admin  as IAdminModal;

        const userData:IAdminDetailsResponse  = {
            admin_id:  adminAccount.id,
            admin_name:  adminAccount.admin_name,
            admin_email:  adminAccount.admin_email,
            is_active:  adminAccount.is_active,
            created_at:  adminAccount.created_at,
            updated_at:  adminAccount.updated_at
        }

        res.status(200).json(responseStructure(true,"Successfully Fetch  Account   Details",JSON.stringify({userData:userData})))

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getAllAdmins = async  (req:Request,res:Response) =>{
    try {
        const  adminModal  = new   AdminModal();

        const  adminResponse = await  adminModal.getAdmin();

        if(!adminResponse.status ||  !(Array.isArray(adminResponse.data) &&  adminResponse.data.length  > 0))
        {
            res.status(404).json(responseStructure(false,"Resource Not Found"));
            return;
        }

        const admins:IAdminDetailsResponse[] = (adminResponse.data as IAdminModal[]).map((adminAccount) =>  ({
            admin_id:  adminAccount.id,
            admin_name:  adminAccount.admin_name,
            admin_email:  adminAccount.admin_email,
            is_active:  adminAccount.is_active,
            created_at:  adminAccount.created_at,
            updated_at:  adminAccount.updated_at
        }));

        res.status(200).json(responseStructure(true,"Successfully Fetch All  Admins",JSON.stringify({admins:admins})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}