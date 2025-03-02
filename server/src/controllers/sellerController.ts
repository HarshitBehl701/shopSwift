import { Request, Response } from "express";
import { getCustomCatchBlockResponseStructure, getUniqueId, removeFiles, responseStructure } from "../utils/commonHelpers";
import { ISellerModal, SellerModal } from "../modals/SellerModal";
import  bcrypt  from  "bcrypt";
import jwt  from  "jsonwebtoken";
import { IGetSellerAccountResponse } from "../interfaces/queriesInterfaces";

export const registerNewSeller = async (req: Request, res: Response): Promise<void> => {
    try {
        const { seller_name, brand_name, email, seller_password } = req.body;

        const sellerModal  = new SellerModal();

        const isSellerExists = await sellerModal.getSeller({column_name:"email",value:email});

        if (isSellerExists.status) {
            res.status(409).json(responseStructure(false,'User Already Exists With This Email'));
            return;
        }
        
        const  isBrandExists = await  sellerModal.getSeller({column_name:"brand_name",value:brand_name});
        if (isBrandExists.status) {
            res.status(409).json(responseStructure(false,'Brand  Name Alredy   Exists'));
            return;
        }


        const verificationCode = getUniqueId(6);
        const currentDate = new Date();
        const verificationExpiration = new Date(currentDate.getTime() + 30 * 60000);
        const hashPassword  =   await  bcrypt.hash(seller_password,10);
        const newSellerResponse = await sellerModal.registerNewSeller({
            seller_name,
            seller_password:hashPassword,
            brand_name,
            email,
            verification_code: verificationCode,
            verification_expiration: verificationExpiration,
        });

        if (!newSellerResponse.status) {
            res.status(400).json(responseStructure(false, newSellerResponse.message));
            return;
        }

        res.status(201).json(responseStructure(true, "Successfully Registered New Seller"));
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
};

export  const  verifySellerAccount = async (req:Request,res:Response):Promise<void> => {
    try {
        const {verification_code,email} = req.body;

        const sellerModal   =  new SellerModal();

        const sellerAccountResponse = await sellerModal.getSeller({column_name:"email",value:email});
        if(!sellerAccountResponse.status)
        {
            res.status(404).json(responseStructure(false,"User  Account  Not Found"));
            return;
        }

        const sellerAccount = (sellerAccountResponse.data   as ISellerModal[])[0];
        const currentDate =  new Date();


        if(sellerAccount.is_verified == 1)
        {
            res.status(400).json(responseStructure(false,"User Already Verified"));
            return;
        }else if(sellerAccount.verification_code !==  verification_code)
        {
            res.status(400).json(responseStructure(false,"Invalid  Verification  Token"));
            return;
        }else  if(sellerAccount.verification_expiration > currentDate)
        {
            res.status(400).json(responseStructure(false,"Expiration Time   Exceeds"));
            return;
        }else{
            const updateSellerAccount =  await sellerModal.updateSellerAccountDetails({is_verified: 1,is_active:1},{column_name:"id",value:sellerAccount.id});
            if(!updateSellerAccount.status)
            {
                res.status(400).json(responseStructure(false,"Something  Went Wrong"));
                return;
            }else{
                res.status(200).json(responseStructure(true,"Account  Verified  Successfully"));
            }
        }
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const loginSeller  = async   (req:Request,res:Response):Promise<void> => {
    try {
        const  {email,seller_password} =  req.body;

        const  sellerModal =  new  SellerModal();

        const  sellerAccountResponse = await sellerModal.getSeller({column_name:"email",value:email});
        if(!sellerAccountResponse.status)
        {
            res.status(400).json(responseStructure(false,"Email Or Password Is Incorrect"));
            return;
        }

        const sellerAccount =  (sellerAccountResponse.data  as ISellerModal[])[0];

        if(sellerAccount.is_verified === 0)
        {
            res.status(400).json(responseStructure(false,"User Account  Is   Not  Verified Yet"));
            return;
        }else if(sellerAccount.is_active === 0)
        {
            res.status(400).json(responseStructure(false,"User Account  Is  Deactivated"));
            return;
        }

        const  verifyPassword = await  bcrypt.compare(seller_password,sellerAccount.seller_password);

        if(!verifyPassword)
        {
            res.status(400).json(responseStructure(false,"Email Or Password Is Incorrect"));
            return;
        }

        const secretKey  = process.env.SECRET_KEY  || "shopSwift";

        const  loginToken  =  jwt.sign({id:sellerAccount.id},secretKey);
        const  clientToken  =  jwt.sign({},secretKey);

        res.cookie("SLoginToken",loginToken,{
            httpOnly: true,
            secure:  true,
            sameSite:  "none",
            maxAge:  86400000 // 1  day  in milliseconds
        })

        const  userData:IGetSellerAccountResponse = {
            id:sellerAccount.id,
            seller_name:sellerAccount.seller_name,
            brand_name:sellerAccount.brand_name,
            brand_logo:sellerAccount.brand_logo,
            gstin:sellerAccount.gstin,
            email:sellerAccount.email,
            is_verified:sellerAccount.is_verified,
            verification_code:sellerAccount.verification_code,
            verification_expiration:sellerAccount.verification_expiration,
            is_active:sellerAccount.is_active,
            created_at:sellerAccount.created_at,
            updated_at:sellerAccount.updated_at,
        }

        
        res.status(200).json(responseStructure(true,"Login Successfully",JSON.stringify({userData:userData,loginToken:clientToken})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const logoutSeller  =  async  (req:Request,res:Response):Promise<void>  =>{
    try {
        res.clearCookie('SLoginToken');
        res.status(200).json(responseStructure(true,"Successfully Logout"));
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const sellerDetails  = async (req:Request,res:Response):Promise<void> =>{
    try {
        const sellerAccount = (req as  any).seller   as   ISellerModal;

        const  userData:IGetSellerAccountResponse = {
            id:sellerAccount.id,
            seller_name:sellerAccount.seller_name,
            brand_name:sellerAccount.brand_name,
            brand_logo:sellerAccount.brand_logo,
            gstin:sellerAccount.gstin,
            email:sellerAccount.email,
            is_verified:sellerAccount.is_verified,
            verification_code:sellerAccount.verification_code,
            verification_expiration:sellerAccount.verification_expiration,
            is_active:sellerAccount.is_active,
            created_at:sellerAccount.created_at,
            updated_at:sellerAccount.updated_at,
        }

        res.status(200).json(responseStructure(true,"Login Successfully",JSON.stringify({userData:userData})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getSellerDetailsForAdmin  = async (req:Request,res:Response):Promise<void> =>{
    try {
        const sellerModal  =   new SellerModal();

        const {seller_id} = req.body;

        const response = await  sellerModal.getSeller({column_name:"id",value:seller_id});

        if(!response.status || !(Array.isArray(response.data)  && !(response.data.length  > 0)))
        {
            res.status(404).json(responseStructure(false,"Seller  Not   Found"));
            return;
        }

        const  sellerAccount = (response.data as ISellerModal[])[0];

        const  userData:IGetSellerAccountResponse = {
            id:sellerAccount.id,
            seller_name:sellerAccount.seller_name,
            brand_name:sellerAccount.brand_name,
            brand_logo:sellerAccount.brand_logo,
            gstin:sellerAccount.gstin,
            email:sellerAccount.email,
            is_verified:sellerAccount.is_verified,
            verification_code:sellerAccount.verification_code,
            verification_expiration:sellerAccount.verification_expiration,
            is_active:sellerAccount.is_active,
            created_at:sellerAccount.created_at,
            updated_at:sellerAccount.updated_at,
        }

        res.status(200).json(responseStructure(true,"Successfully Fetch  Seller Details",JSON.stringify({sellerData:userData})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const updateSellerPhotoForAdmin  = async  (req:Request,res:Response):Promise<void> => {
    try {
        const {seller_id}   =  req.body;
        const sellerId  = parseInt(seller_id);

        const sellerModal  =  new SellerModal();

        const  sellerAccountResponse =  await sellerModal.getSeller({column_name:"id",value:sellerId});

        if(!sellerAccountResponse.status || !(Array.isArray(sellerAccountResponse.data) &&  sellerAccountResponse.data.length > 0))
        {
            res.status(404).json(responseStructure(false,"Seller Account  Not Found"));
            return;
        }

        const sellerAccount  =  (sellerAccountResponse.data  as ISellerModal[])[0];

        if(sellerAccount.brand_logo !== null  && sellerAccount.brand_logo !== '')
            removeFiles([sellerAccount.brand_logo],"seller");

        const  image  =  (req as any).filesName[0];

        const updateSellerDetailsResponse =  await sellerModal.updateSellerAccountDetails({brand_logo:image},{column_name:"id",value:sellerId});

        if(!updateSellerDetailsResponse.status)
        {
            res.status(500).json(responseStructure(false,"Something  Went  Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Seller  Account  Updated Successfully"));


    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const updateSellerPhotoForSeller  = async  (req:Request,res:Response):Promise<void> => {
    try {

        const sellerModal  =  new SellerModal();

        const  sellerAccount =  (req as any).seller  as ISellerModal;

        if(sellerAccount.brand_logo !== null  && sellerAccount.brand_logo !== '')
            removeFiles([sellerAccount.brand_logo],"seller");

        const  image  =  (req as any).filesName[0];

        const updateSellerDetailsResponse =  await sellerModal.updateSellerAccountDetails({brand_logo:image},{column_name:"id",value:sellerAccount.id});

        if(!updateSellerDetailsResponse.status)
        {
            res.status(500).json(responseStructure(false,"Something  Went  Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Seller  Account  Updated Successfully"));


    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const updateSellerAccountForSeller  = async  (req:Request,res:Response):Promise<void> => {
    try {
        const {seller_name,email,brand_name,gstin,seller_password}   =  req.body;

        const sellerModal  =  new SellerModal();

        const  sellerAccount =  (req as any).seller  as ISellerModal;

        
        if(sellerAccount.is_verified ===  0  || sellerAccount.is_active === 0)
        {
            res.status(400).json(responseStructure(false,"Account Not Verified Or Deactive At The   Moment"));
            return;
        }

        const allowedDataToUpdate  = {seller_name,email,brand_name,gstin,seller_password};

        const  updateRequestData = Object.fromEntries(Object.entries(allowedDataToUpdate).filter(([key,value]) => value !== undefined));

        if("email" in updateRequestData && email.toLowerCase() !== sellerAccount.email.toLowerCase())
        {
            const isOtherSellerExistsWithSameEmail = await sellerModal.getSeller([{column_name:"email",value:1},{column_name:"id",value:sellerAccount.id,operand:"!="}]);
            if(isOtherSellerExistsWithSameEmail.status)
            {
                res.status(400).json(responseStructure(false,"Seller Already  Exists  With This Email"));
                return;
            }
        }

        if("brand_name" in updateRequestData && sellerAccount.brand_name.toLowerCase() !==  brand_name.toLowerCase())
        {
            const  isBrandExists = await  sellerModal.getSeller({column_name:"brand_name",value:brand_name});
            if (isBrandExists.status) {
                res.status(409).json('Brand  Name Alredy Exists');
                return;
            }
        }

        if(seller_password)
        {
            const hashPassword =  await   bcrypt.hash(seller_password,10);
            updateRequestData.seller_password  = hashPassword;
        }

        const updateSellerDetailsResponse =  await sellerModal.updateSellerAccountDetails(updateRequestData,{column_name:"id",value:sellerAccount.id});

        if(!updateSellerDetailsResponse.status)
        {
            res.status(500).json(responseStructure(false,"Something  Went  Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Account  Updated Successfully"));
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const updateSellerAccountForAdmin  = async  (req:Request,res:Response):Promise<void> => {
    try {
        const {seller_name,brand_name,gstin,seller_id,email,seller_password,is_verified,change_verification_code,verification_expiration,is_active}   =  req.body;

        const sellerModal  =  new SellerModal();

        const  sellerAccountResponse =  await sellerModal.getSeller({column_name:"id",value:seller_id});

        if(!sellerAccountResponse.status || !(Array.isArray(sellerAccountResponse.data) &&  sellerAccountResponse.data.length > 0))
        {
            res.status(404).json(responseStructure(false,"Seller Account  Not Found"));
            return;
        }

        const sellerAccount  =  (sellerAccountResponse.data  as ISellerModal[])[0];

        const  allowedDataToUpdate = {seller_name,brand_name,gstin,email,seller_password,is_verified,verification_expiration,is_active};

        const updateRequestData  = Object.fromEntries(Object.entries(allowedDataToUpdate).filter(([key,value]) =>  value !== undefined));


        if("email"  in  updateRequestData && email.toLowerCase() !== sellerAccount.email.toLowerCase())
        {
            const isOtherSellerExistsWithSameEmail = await sellerModal.getSeller([{column_name:"email",value:1},{column_name:"id",value:sellerAccount.id,operand:"!="}]);
            if(isOtherSellerExistsWithSameEmail.status)
            {
                res.status(400).json(responseStructure(false,"Seller Already  Exists  With This Email"));
                return;
            }
        }

        if("brand_name" in  updateRequestData && sellerAccount.brand_name.toLowerCase() !==  brand_name.toLowerCase())
        {
            const  isBrandExists = await  sellerModal.getSeller({column_name:"brand_name",value:brand_name});
            if (isBrandExists.status) {
                res.status(409).json('Brand  Name Alredy Exists');
                return;
            }
        }

        if(seller_password)
        {
            const hashPassword =  await   bcrypt.hash(seller_password,10);
            updateRequestData.seller_password  = hashPassword;
        }

        const  image:string[] =  (req as any).filesName;

        if(Array.isArray(image) && image.length > 0)
        {
            updateRequestData.brand_logo = image[0];
        }

        if(change_verification_code)
        {
            const  newVerificationCode  = getUniqueId(6);
            updateRequestData.verification_code  = newVerificationCode;
        }

        if(sellerAccount.is_verified === 1)
        {
            delete   updateRequestData.verification_code;
            delete   updateRequestData.verification_expiration;
        }
        

        const updateSellerDetailsResponse =  await sellerModal.updateSellerAccountDetails(updateRequestData,{column_name:"id",value:seller_id});

        if(!updateSellerDetailsResponse.status)
        {
            res.status(500).json(responseStructure(false,"Something  Went  Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Seller  Account  Updated Successfully"));


    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const  getAllSellersForAdmin   = async (req:Request,res:Response):Promise<void> =>{
    try {
        const sellerModal   = new  SellerModal();

        const sellerResponse =  await  sellerModal.getSeller();

        if(!sellerResponse.status ||  !(Array.isArray(sellerResponse.data) &&  sellerResponse.data.length > 0))
        {
            res.status(400).json(responseStructure(false,"No Seller Found"));
            return;
        }

        const  userData:IGetSellerAccountResponse[] = (sellerResponse.data  as IGetSellerAccountResponse[]).map(sellerAccount => {
            return  {
                id:sellerAccount.id,
                seller_name:sellerAccount.seller_name,
                brand_name:sellerAccount.brand_name,
                brand_logo:sellerAccount.brand_logo,
                gstin:sellerAccount.gstin,
                email:sellerAccount.email,
                is_verified:sellerAccount.is_verified,
                verification_code:sellerAccount.verification_code,
                verification_expiration:sellerAccount.verification_expiration,
                is_active:sellerAccount.is_active,
                created_at:sellerAccount.created_at,
                updated_at:sellerAccount.updated_at,
            }
        }) 

        res.status(200).json(responseStructure(true,"Successfully Fetch  Sellers",JSON.stringify({sellers:userData})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}