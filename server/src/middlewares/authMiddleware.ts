import  {Request,Response,NextFunction} from  "express";
import { getCookiesStructureObj, getCustomCatchBlockResponseStructure, responseStructure } from "../utils/commonHelpers";
import jwt from "jsonwebtoken";
import { IUserModal, UserModal } from "../modals/UserModel";
import { AdminModal, IAdminModal } from "../modals/AdminModal";
import { ISellerModal, SellerModal } from "../modals/SellerModal";

export const authMiddleware = (key: string[]  | string  | null) => async (req:Request,res:Response,next:NextFunction):Promise<void> =>{
    const  cookiesStructure = getCookiesStructureObj();
    try{
        if(Array.isArray(key))
        {
            const tokens:{[key:string]:string}[] = key.map((val) => ({[val]:cookiesStructure[val]}));

            if(tokens.length  > 0)
            {
                const secretKey  = process.env.SECRET_KEY  || "shopSwift";
                let  isUserLogin:boolean =  false;
                let  regUser:boolean| null  | IUserModal |  IAdminModal | ISellerModal = null;
                let  regUserType:null  |  string = null;

                for(let  i =  0 ; i < tokens.length  ;  i++)
                {
                    const obj = tokens[i];
                    const key = Object.keys(obj)[0];
                    const value = obj[key];
                    const token  =  req.cookies[value];

                    if(token)
                    {
                        const decryptToken = jwt.verify(token,secretKey);
                        const  {id} =  decryptToken  as {id:number,iat:number};   
                        if(key  === 'seller')
                            regUser  =   await  isSellerExists(id);
                        else  if(key === 'user')
                            regUser  =   await  isUserExists(id);
                        else if(key === 'admin')
                            regUser  =   await  isAdminExists(id);

                        if(regUser)
                        {
                            isUserLogin   = true;
                            regUserType  = key;
                            break;
                        }
                    }   
                }

                if(isUserLogin &&  regUserType && regUser)
                {
                    (req as  any)[regUserType] = regUser;
                    next();
                }
            }
        }else  if(typeof key === 'string')
        {
            const  loginToken  = cookiesStructure[key];
            if(loginToken)
            {
                const  token = req.cookies[loginToken];
                if(token)
                {
                    const secretKey  = process.env.SECRET_KEY  || "shopSwift";
                    const decryptToken = jwt.verify(token,secretKey);
                    const  {id} =  decryptToken  as {id:number,iat:number};
                    let regUser:boolean | IUserModal  |  ISellerModal  |  IAdminModal = false;

                    if(key === 'admin')
                        regUser = await isAdminExists(id);
                    else if(key ===  'seller')
                        regUser = await isSellerExists(id);
                    else if(key ===  'user')
                        regUser = await isUserExists(id);

                    if(regUser !==  false)
                    {
                        (req as any)[key] =  regUser;
                        next();
                        return;
                    }

                }
            }

        }
        res.status(401).json(responseStructure(false,"Access  Denied"));
    } catch (error) {
        res.status(400).json(getCustomCatchBlockResponseStructure(error));
    }
}

//helpers  
const isUserExists  = async  (id:number):Promise<(boolean  | ISellerModal | IUserModal | IAdminModal)> => {
    try {
        
        const userModal =  new UserModal();
    
        const  userAccountResponse = await userModal.getUser([{column_name:"id",value:id},{column_name:"is_active",value:1}]);

        if(!userAccountResponse.status  || !(Array.isArray(userAccountResponse.data)  &&  userAccountResponse.data.length > 0))
            return false;

        return  (userAccountResponse.data  as   IUserModal[])[0];
    } catch (error) {
        return false;
    }
}

const isSellerExists  = async  (id:number):Promise<(boolean  | ISellerModal | IUserModal | IAdminModal)> => {
    try {
        
        const sellerModal =  new SellerModal();
    
        const  sellerAccountResponse = await sellerModal.getSeller([{column_name:"id",value:id},{column_name:"is_active",value:1}]);

        if(!sellerAccountResponse.status  || !(Array.isArray(sellerAccountResponse.data)  &&  sellerAccountResponse.data.length > 0))
            return false;

        return  (sellerAccountResponse.data  as   ISellerModal[])[0];
    } catch (error) {
        return false;
    }
}


const isAdminExists  = async  (id:number):Promise<(boolean  | ISellerModal | IUserModal | IAdminModal)> => {
    try {
        
        const adminModal =  new AdminModal();
    
        const  adminAccountResponse = await adminModal.getAdmin([{column_name:"id",value:id},{column_name:"is_active",value:1}]);

        if(!adminAccountResponse.status  || !(Array.isArray(adminAccountResponse.data) &&  adminAccountResponse.data.length > 0))
            return false;

        return  (adminAccountResponse.data  as   IAdminModal[])[0];
    } catch (error) {
        return false;
    }
}