import { createComment,updateRating } from "../api/order";
import {getLocalStorageVariables}  from "./commonHelper"

export  const  createCommentHelper   = async (productId,orderId,comment)  => {
    try{
        const [token,userType]  =  getLocalStorageVariables('all');
        const response =  await createComment(token,userType,productId,orderId,comment)
        return  response;
    }catch(error){
        return  {status:false,message:  error.message};
    }
}

export  const updateRatingOrderHelper  =  async  (productId,orderId,rating = 0)  => {
    try{
        const  [token,userType]  = getLocalStorageVariables('all');
        const response  =  await updateRating(token,userType,productId,orderId,rating);
        return response;
    }catch(error){
        return {status:false,message:error.message};
    }
}