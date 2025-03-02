import { nanoid } from 'nanoid';
import { IResponseStructure } from '../interfaces/commonInterface';
import  path from "path";
import  fs   from "fs";

export  const responseStructure = (status:IResponseStructure['status'],message:IResponseStructure['message'],data:IResponseStructure['data'] = null) =>{
    const response:IResponseStructure = {status:status,message:message};
    if(data)
        response['data']  = data;  
    return  response;
}

export  const  getCustomResponseBlockForQueriesExecution = (response:IResponseStructure) => {
    if(response.status)
    {
        
        if(Array.isArray(response.data))
        {
            if(response.data.length > 0)
                return  responseStructure(true,"Rows  Found",response.data);
            else
                return  responseStructure(false,"Rows   Not Found");
        }else  if(typeof  response.data ===  'object')
        {
            if(response.data.affectedRows > 0)
                return  responseStructure(true,"Query Executed  Successfully",response.data);
            else 
                return  responseStructure(false,"Query Not Executed  Successfully");
        }else{
            return responseStructure(false,"something  Went  Wrong");
        }
    }else{
        return responseStructure(false,response.message);
    }
}

export const getCustomCatchBlockResponseStructure = (error:any)  =>{
    return  responseStructure(false,error instanceof   Error  ? error.message : 'Something  Went  Wrong');
}

export  const getUniqueId = (length:number) =>  {
    return  nanoid(length);
}

export  const  removeFiles  = (filesArr:string[],key:string):boolean =>{
    const storagePath   = getStoragePathOfServer();
    if(filesArr.length   ==  0)
        return   false;
    else if(key in storagePath)
    {
        filesArr.forEach((file) => {
            const fileDir  = `${storagePath[key]}/${file}`;
            if(fs.existsSync(fileDir))
            {
                fs.unlinkSync(path.join(process.cwd(),fileDir));
            }
        })
        return true;
    }
    return  false;
}

export  const getStoragePathOfServer  = ():{[key:string]:string} =>{
    return {
      user: "public/assets/userAssets",
      seller: "public/assets/sellerAssets",
      admin: "public/assets/adminAssets",
      product: "public/assets/productAssets",
      main: "public/assets/mainAssets/others",
    };
}

export  const getCookiesStructureObj = ():{[key:string]:string} =>{
    return  {
        "seller":'SLoginToken',
        "admin":'ALoginToken',
        "user":'ULoginToken'
    };
}