import { Request,Response } from "express"
import { getCustomCatchBlockResponseStructure, getUniqueId, removeFiles, responseStructure } from "../utils/commonHelpers"
import { IUserModal, UserModal} from "../modals/UserModel";
import  bcrypt  from  "bcrypt";
import  jwt from "jsonwebtoken";
import { IGetUserAccountResponse } from "../interfaces/queriesInterfaces";

export  const registerNewUser =  async (req:Request,res:Response):Promise<void>  =>  {
    try {
        const   {user_name,email,user_password}    = req.body;
        
        const userModal  = new   UserModal();

        const isUserExists = await  userModal.getUser([{column_name:"email",value:email},{column_name:"is_active",value:1}]);

        if(isUserExists.status)
        {
            res.status(400).json(responseStructure(false,"User  Already Exists  With This Email"));
            return;
        }

        const hashPassword  = await  bcrypt.hash(user_password,10);
        const verification_code  = getUniqueId(6);
        const  currentDate =  new Date;
        const verification_expiration = new Date(currentDate.getTime() + 30 * 60000);

        const newUser = await userModal.registerNewUser({
            user_name,
            email,
            user_password:hashPassword,
            verification_code,
            verification_expiration
        });

        if(!newUser.status)
        {
            res.status(400).json(responseStructure(false,"Something Went Wrong"));
            return;
        }

        res.status(201).json(responseStructure(true,"User  Registered Successfully"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const verifyUserAccount = async (req:Request,res:Response):Promise<void>=>{
    try {
        const  {verification_code,email} = req.body;

        const  userModal   = new  UserModal();

        const  userAccountResponse = await userModal.getUser({column_name:"email",value:email});

        if(!userAccountResponse.status)
        {
            res.status(404).json(responseStructure(false,"User  Account  Not Found"));
            return;
        }

        const  userAccount =  (userAccountResponse.data as IUserModal[])[0];
        const currentDate   = new Date();

        if(userAccount.is_verified   ===  1)
        {
            res.status(400).json(responseStructure(false,"Account Already  Verified"));
            return;
        }else   if(userAccount.verification_code !== verification_code)
        {
            res.status(400).json(responseStructure(false,"Invalid  Token"));
            return;
        }else if(userAccount.verification_expiration > currentDate)
        {
            res.status(400).json(responseStructure(false,"Verification Time   Exceeds"));
            return;
        }else{
            const updateUserAccount =  await userModal.updateUserAccountDetails({is_verified:1,is_active:1},{column_name:"id",value:userAccount.id});

            if(!updateUserAccount.status)
            {
                res.status(400).json(responseStructure(false,"Something Went Wrong"));
                return;
            }else{
                res.status(200).json(responseStructure(true,"User  Account  Verified  Successfully"));
            }

        }
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const loginUser =  async (req:Request,res:Response):Promise<void>  => {
    try {
        const  {email,password}  =  req.body;

        const   userModal  = new   UserModal();

        const userAccountResponse = await userModal.getUser({column_name:"email",value:email}); 

        if(!userAccountResponse.status)
        {
            res.status(404).json(responseStructure(false,"Email Or  Password  Is  Incorrect"));
            return;
        }

        const userAccount  = (userAccountResponse.data   as IUserModal[])[0];


        if(userAccount.is_verified  ===  0 ||  userAccount.is_active === 0)
        {
            res.status(400).json(responseStructure(false,"Account  Is  Either  Not Verified Or Not   Active  Yet"));
            return;
        }

        const verifyPassword  = await  bcrypt.compare(password,userAccount.user_password);

        if(!verifyPassword)
        {
            res.status(404).json(responseStructure(false,"Email Or  Password  Is  Incorrect"));
            return;
        }

        const  secretKey  =  process.env.SECRET_KEY ||  'shopSwift';

        const  loginToken  =  jwt.sign({id:userAccount.id},secretKey);
        const  clientToken  =  jwt.sign({},secretKey);

        res.cookie("ULoginToken",loginToken,{
            httpOnly:  true,
            secure: true,
            sameSite:  "none",
            maxAge: 86400000 //  1 day in  milliseconds
        })

        const userData:IGetUserAccountResponse =  {
            id:userAccount.id,
            user_name:userAccount.user_name,
            user_photo:userAccount.user_photo,
            address:userAccount.address,
            email:userAccount.email,
            user_cart:userAccount.user_cart,
            user_whislist:userAccount.user_whislist,
            is_verified:userAccount.is_verified,
            verification_code:userAccount.verification_code,
            verification_expiration:userAccount.verification_expiration,
            is_active:userAccount.is_active,
            created_at:userAccount.created_at,
            updated_at:userAccount.updated_at,
        }

        res.status(200).json(responseStructure(true,"Successfully Login To Account",JSON.stringify({userData:userData,loginToken:clientToken})))

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}


export const logoutUser  =  async  (req:Request,res:Response):Promise<void>  =>{
    try {
        res.clearCookie('ULoginToken');
        res.status(200).json(responseStructure(true,"Successfully Logout"));
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const userDetailsForUser =  async (req:Request,res:Response):Promise<void> =>{
    try {

        const userAccount =  (req  as   any).user  as IUserModal;
        
        const userData:IGetUserAccountResponse =  {
            id:userAccount.id,
            user_name:userAccount.user_name,
            user_photo:userAccount.user_photo,
            address:userAccount.address,
            email:userAccount.email,
            user_cart:userAccount.user_cart,
            user_whislist:userAccount.user_whislist,
            is_verified:userAccount.is_verified,
            verification_code:userAccount.verification_code,
            verification_expiration:userAccount.verification_expiration,
            is_active:userAccount.is_active,
            created_at:userAccount.created_at,
            updated_at:userAccount.updated_at,
        }

        res.status(200).json(responseStructure(true,"Successfully Fetch Account  Details",JSON.stringify({userData:userData})))


    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const getUserDetailsForAdmin =  async (req:Request,res:Response):Promise<void> =>{
    try {

        const {user_id} = req.body;
        const userModal  = new  UserModal();
        const response   =   await  userModal.getUser({column_name:"id",value:user_id});

        if(!response.status || !(Array.isArray(response.data) &&  !(response.data.length  >0)))
        {
            res.status(404).json(responseStructure(false,"User Account  Not  Found"));
            return;
        }

        const userAccount =  (response.data as  IUserModal[])[0];
        
        const userData:IGetUserAccountResponse =  {
            id:userAccount.id,
            user_name:userAccount.user_name,
            user_photo:userAccount.user_photo,
            address:userAccount.address,
            email:userAccount.email,
            user_cart:userAccount.user_cart,
            user_whislist:userAccount.user_whislist,
            is_verified:userAccount.is_verified,
            verification_code:userAccount.verification_code,
            verification_expiration:userAccount.verification_expiration,
            is_active:userAccount.is_active,
            created_at:userAccount.created_at,
            updated_at:userAccount.updated_at,
        }

        res.status(200).json(responseStructure(true,"Successfully Fetch Account  Details",JSON.stringify({userData:userData})))


    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const updateUserAccountForUser =  async (req:Request,res:Response):Promise<void>  =>{
    try {
        const  {user_name,user_email,user_password,address} =  req.body;
        
        const  userModal  = new  UserModal();


        const userAccount = (req as any).user  as  IUserModal;

        if(user_email   &&  userAccount.email  !== user_email)
        {
            const isUserExistsWithSameEmail   = await userModal.getUser([{column_name:"email",value:user_email},{column_name:"id",value:userAccount.id,operand:"!="}]);
            if(isUserExistsWithSameEmail &&  Array.isArray(isUserExistsWithSameEmail.data) && isUserExistsWithSameEmail.data.length  >  0)
            {
                res.status(400).json(responseStructure(false,"User  Already Exists With the Same Email"));
                return;
            }
        }

        const  allowedDataToUpdate =  {user_name,user_email,user_password,address};

        const updateRequestFields = Object.fromEntries(Object.entries(allowedDataToUpdate).filter(([key,value]) =>  value  !== undefined));

        const  userPhoto  = (req as any).filesName;

        if(userPhoto.length >  0)
        {
            updateRequestFields.user_photo  = userPhoto[0];
            removeFiles([userAccount.user_photo],'user');
        }
        
        const updateUserAccount = await userModal.updateUserAccountDetails(updateRequestFields,{column_name:"id",value:userAccount.id});

        if(!updateUserAccount.status)
        {
            res.status(400).json(responseStructure(false,"Something  Went Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Successfully Updated Account  Details"))

    } catch (error) {   
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const  updateUserPhotoForAdmin  = async (req:Request,res:Response):Promise<void> => {
    try {
        
        const {user_id}  = req.body;
        
        const  userModal = new  UserModal();
        const  userId = parseInt(user_id);

        const userResponse  = await userModal.getUser([{column_name:"id",value:userId}]);

        if(!userResponse.status)
        {
            res.status(404).json(responseStructure(false,"User Not Found"));
            return;
        }

        const  userPhoto  = (req as any).filesName[0] ?? null;
        
        const  userAccount =  (userResponse.data  as  IUserModal[])[0];        

        if(userAccount.user_photo !==  null  &&  userAccount.user_photo  !== '')
            removeFiles([userAccount.user_photo],"user");


        const response = await userModal.updateUserAccountDetails({user_photo:userPhoto},{column_name:"id",value:userId});


        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something Went  Wrong"));
            return;
        }
        
        res.status(200).json(responseStructure(true,"Successfully Updated  User Account"));
        
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const  manageUserAccountForAdmin  = async (req:Request,res:Response):Promise<void>=>{
    try {
        const {user_name,user_password,user_id,user_email,user_address,user_cart,user_whislist,is_verified,change_verification_code,verification_expiration,is_active}  = req.body;

        const  userModal = new  UserModal();

        const userResponse  = await userModal.getUser([{column_name:"id",value:user_id}]);

        if(!userResponse.status)
        {
            res.status(404).json(responseStructure(false,"User Not Found"));
            return;
        }
        
        const  userAccount =  (userResponse.data  as  IUserModal[])[0];

        const allowedDataToUpdate =   {user_name,user_password,user_cart,user_whislist,is_verified,verification_expiration,is_active};

        const updateDataRequest =  Object.fromEntries(Object.entries(allowedDataToUpdate).filter(([key,value]) => value !== undefined));
        
        //check  if  email  already  exists  if it  is  requested for updation
        if(user_email && userAccount.email.toLowerCase()  !== user_email.toLowerCase())
        {
            const  isOtherUserExistsWithSameEmail = await  userModal.getUser([{column_name:"email",value:user_email},{column_name:"id",value:user_id,operand:"!="}]);

            if(isOtherUserExistsWithSameEmail.status)
            {
                res.status(404).json(responseStructure(false,"An User  Already exists with  this email  id"));
                return;
            }
        }

        //if  admin update  user  account  to  active
        if("is_active" in  updateDataRequest && is_active !== userAccount.is_active &&  is_active == 1)
        {
            const  isOtherUserExistsWithSameEmail = await  userModal.getUser([{column_name:"email",value:user_email},{column_name:"id",value:user_id,operand:"!="},{column_name:'is_active',value:1}]);

            if(isOtherUserExistsWithSameEmail.status)
            {
                res.status(404).json(responseStructure(false,"An Active User  Already exists with  the  same  email"));
                return;
            }
        }

        if(user_password)
        {
            const hashPassword = await bcrypt.hash(user_password,10);
            updateDataRequest.user_password = hashPassword;
        }

        if(change_verification_code && change_verification_code  ==  1)
        {
            const  newVerificationCode  = getUniqueId(6);
            updateDataRequest.verification_code =  newVerificationCode;
        }

        if(user_email)
        {
            updateDataRequest.email =  user_email;
        }

        if(user_address)
        {
            updateDataRequest.address = user_address;
        }

        if(userAccount.is_verified  ===  1)
        {
            delete updateDataRequest.verification_expiration
            delete updateDataRequest.verification_code
        }

        const response = await userModal.updateUserAccountDetails(updateDataRequest,{column_name:"id",value:user_id});

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something Went  Wrong"));
            return;
        }
        
        res.status(200).json(responseStructure(true,"Successfully Updated  User Account"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const  getAllUsersForAdmin = async (req:Request,res:Response):Promise<void> =>{
    try {
        const userModal  =  new  UserModal();

        const response  = await userModal.getUser();

        if(!response.status)
        {
            res.status(404).json(responseStructure(false,"Something   Went  Wrong"));
            return;
        }

        
        const userData:IGetUserAccountResponse[] =  (response.data as  IGetUserAccountResponse[]).map(userAccount => {
            return  {
                id:userAccount.id,
                user_name:userAccount.user_name,
                user_photo:userAccount.user_photo,
                address:userAccount.address,
                email:userAccount.email,
                user_cart:userAccount.user_cart,
                user_whislist:userAccount.user_whislist,
                is_verified:userAccount.is_verified,
                verification_code:userAccount.verification_code,
                verification_expiration:userAccount.verification_expiration,
                is_active:userAccount.is_active,
                created_at:userAccount.created_at,
                updated_at:userAccount.updated_at,
            }
        })

        res.status(200).json(responseStructure(true,"Successfully Fetch  Users",JSON.stringify({users:userData})));
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}