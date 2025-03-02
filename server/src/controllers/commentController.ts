import {Request,Response} from  "express";
import { getCustomCatchBlockResponseStructure, responseStructure } from "../utils/commonHelpers";
import { IOrderModal, OrderModal } from "../modals/OrderModal";
import { CommentModal, ICommentModal } from "../modals/CommentModal";
import { IUserModal } from "../modals/UserModel";
import { IGetCommentsResponse } from "../interfaces/queriesInterfaces";
import { ProductModal } from "../modals/ProductModal";

export  const addNewCommentForUser = async (req:Request,res:Response):Promise<void> => {
    try {
        const  {order_id,product_id,user_comment} = req.body;
        const userAccount = (req  as  any).user as IUserModal;
        const orderModal = new  OrderModal();
        
        const  productModal =  new   ProductModal();

        const  productResponse   = await productModal.getProduct({column_name:"id",value:product_id});


        if(!productResponse.status ||  !(Array.isArray(productResponse.data) &&  productResponse.data.length   > 0))
        {
            res.status(404).json(responseStructure(false,"Product Not Found"));
            return;
        }

        
        const orderResponse = await orderModal.getOrder([{column_name:"id",value:order_id},{column_name:"user_id",value:userAccount.id},{column_name:"is_active",value:1}]);
        
        if(!orderResponse.status || !(Array.isArray(orderResponse.data) && orderResponse.data.length > 0))
        {
            res.status(404).json(responseStructure(false,"Order  Not Found"));
            return;
        }

        const  orderData   = (orderResponse.data   as  IOrderModal[])[0];

        if(['Delivered','Cancelled','Refunded','Failed','Returned'].includes(orderData.order_status) === false)
        {
            res.status(400).json(responseStructure(false,"You  Cannot add a comment at the moment"));
            return;
        }

        const commentModal =  new  CommentModal();

        const response   = await commentModal.createNewComment({order_id,product_id:product_id,user_id:userAccount.id,user_comment});

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something   Went  Wrong"));
            return;
        }

        res.status(201).json(responseStructure(true,"Comment  Added  Successfully"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const updateCommentForUser  = async (req:Request,res:Response):Promise<void> =>{
    try {
        const {comment_id,user_comment,is_active}  =  req.body;

        const  userAccount   = (req  as any).user as IUserModal;

        const commentModal   = new CommentModal();
        const response =  await commentModal.updateComment({user_comment,is_active},[{column_name:"id",value:comment_id},{column_name:"user_id",value:userAccount.id}]);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something Went Wrong"));
            return;
        }
        res.status(200).json(responseStructure(true,"Successfully Updated Comment"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const  getProductAllComments  =  async  (req:Request,res:Response):Promise<void> =>{
    try {
        const {product_id} =  req.body;
        
        const  commentModal =  new CommentModal();
        commentModal.select();
        commentModal.join("products",{first_table_column_name:"product_id",operand:"=",second_table_column_name:"id"});
        commentModal.join("orders",{first_table_column_name:"order_id",operand:"=",second_table_column_name:"id"});
        commentModal.join("users",{first_table_column_name:"user_id",operand:"=",second_table_column_name:"id"});
        commentModal.where([{column_name:"comments.product_id",value:product_id},{column_name:"comments.is_active",value:1},{column_name:"products.is_active",value:1}]);

        const response   = await commentModal.execute();

        if(!response.status || (!Array.isArray(response.data) &&  !(response.data.length > 0)))
        {
            res.status(404).json(responseStructure(false,"Comments  Not Found"));
            return;
        }

        const comments:IGetCommentsResponse[] = (response.data as   IGetCommentsResponse[]).map((obj) => {
            return   {
                id: obj.id,
                user_comment: obj.user_comment,
                is_active: obj.is_active,
                created_at: obj.created_at,
                product_name:obj.product_name,
                rating:  obj.rating,
                user_name:obj.user_name,
                user_photo:obj.user_photo,
            }
        });
        

        res.status(200).json(responseStructure(true,"Successfully  Fetch Comments",JSON.stringify({comments:comments})))

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getOrderAllCommentsForUser =  async (req:Request,res:Response):Promise<void> => {
    try {
        const  {order_id} = req.body;
        const  userAccont = (req as any).user as  IUserModal;

        const  commentModal =  new CommentModal();
        commentModal.select();
        commentModal.join("products",{first_table_column_name:"product_id",operand:"=",second_table_column_name:"id"});
        commentModal.join("orders",{first_table_column_name:"order_id",operand:"=",second_table_column_name:"id"});
        commentModal.join("users",{first_table_column_name:"user_id",operand:"=",second_table_column_name:"id"});
        commentModal.where([{column_name:"comments.user_id",value:userAccont.id},{column_name:"comments.order_id",value:order_id},{column_name:"comments.is_active",value:1},{column_name:"products.is_active",value:1}]);

        const response   = await commentModal.execute();

        if(!response.status || (!Array.isArray(response.data) &&  !(response.data.length > 0)))
        {
            res.status(404).json(responseStructure(false,"Comments  Not Found"));
            return;
        }

        const comments:IGetCommentsResponse[] = (response.data as   IGetCommentsResponse[]).map((obj) => {
            return   {
                id: obj.id,
                user_comment: obj.user_comment,
                is_active: obj.is_active,
                created_at: obj.created_at,
                product_name:obj.product_name,
                rating:  obj.rating,
                user_name:obj.user_name,
                user_photo:obj.user_photo,
            }
        });
        

        res.status(200).json(responseStructure(true,"Successfully  Fetch Comments",JSON.stringify({comments:comments})))
        
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getOrderAllComments =  async (req:Request,res:Response):Promise<void> => {
    try {
        const  {order_id} = req.body;

        const  commentModal =  new CommentModal();
        commentModal.select();
        commentModal.join("products",{first_table_column_name:"product_id",operand:"=",second_table_column_name:"id"});
        commentModal.join("orders",{first_table_column_name:"order_id",operand:"=",second_table_column_name:"id"});
        commentModal.join("users",{first_table_column_name:"user_id",operand:"=",second_table_column_name:"id"});
        commentModal.where([{column_name:"comments.order_id",value:order_id},{column_name:"comments.is_active",value:1},{column_name:"products.is_active",value:1}]);

        const response   = await commentModal.execute();

        if(!response.status || (!Array.isArray(response.data) &&  !(response.data.length > 0)))
        {
            res.status(404).json(responseStructure(false,"Comments  Not Found"));
            return;
        }

        const comments:IGetCommentsResponse[] = (response.data as   IGetCommentsResponse[]).map((obj) => {
            return   {
                id: obj.id,
                user_comment: obj.user_comment,
                is_active: obj.is_active,
                created_at: obj.created_at,
                product_name:obj.product_name,
                rating:  obj.rating,
                user_name:obj.user_name,
                user_photo:obj.user_photo,
            }
        });
        

        res.status(200).json(responseStructure(true,"Successfully  Fetch Comments",JSON.stringify({comments:comments})))
        
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getUserAllComments =  async (req:Request,res:Response):Promise<void> => {
    try {
        const  {user_id} = req.body;

        const  commentModal =  new CommentModal();
        commentModal.select();
        commentModal.join("products",{first_table_column_name:"product_id",operand:"=",second_table_column_name:"id"});
        commentModal.join("orders",{first_table_column_name:"order_id",operand:"=",second_table_column_name:"id"});
        commentModal.join("users",{first_table_column_name:"user_id",operand:"=",second_table_column_name:"id"});
        commentModal.where({column_name:"comments.user_id",value:user_id});

        const response   = await commentModal.execute();

        if(!response.status || (!Array.isArray(response.data) &&  !(response.data.length > 0)))
        {
            res.status(404).json(responseStructure(false,"Comments  Not Found"));
            return;
        }

        const comments:IGetCommentsResponse[] = (response.data as   IGetCommentsResponse[]).map((obj) => {
            return   {
                id: obj.id,
                user_comment: obj.user_comment,
                is_active: obj.is_active,
                created_at: obj.created_at,
                product_name:obj.product_name,
                rating:  obj.rating,
                user_name:obj.user_name,
                user_photo:obj.user_photo,
            }
        });
        

        res.status(200).json(responseStructure(true,"Successfully  Fetch Comments",JSON.stringify({comments:comments})))
        
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getAllCommentsForAdmin =  async (req:Request,res:Response):Promise<void> => {
    try {
        const  commentModal =  new CommentModal();
        commentModal.select();
        commentModal.join("products",{first_table_column_name:"product_id",operand:"=",second_table_column_name:"id"});
        commentModal.join("orders",{first_table_column_name:"order_id",operand:"=",second_table_column_name:"id"});
        commentModal.join("users",{first_table_column_name:"user_id",operand:"=",second_table_column_name:"id"});

        const response   = await commentModal.execute();

        if(!response.status || (!Array.isArray(response.data) &&  !(response.data.length > 0)))
        {
            res.status(404).json(responseStructure(false,"Comments  Not Found"));
            return;
        }

        const comments:IGetCommentsResponse[] = (response.data as   IGetCommentsResponse[]).map((obj) => {
            return   {
                id: obj.id,
                user_comment: obj.user_comment,
                is_active: obj.is_active,
                created_at: obj.created_at,
                product_name:obj.product_name,
                rating:  obj.rating,
                user_name:obj.user_name,
                user_photo:obj.user_photo,
            }
        });
        

        res.status(200).json(responseStructure(true,"Successfully  Fetch Comments",JSON.stringify({comments:comments})))
        
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const updateCommentForAdmin  = async  (req:Request,res:Response):Promise<void> =>{
    try {
        const {comment_id,product_id,order_id,user_id,user_comment,is_active}  =  req.body;

        const  commentModal   =   new  CommentModal();
        const response  = await commentModal.updateComment({product_id,order_id,user_id,user_comment,is_active},{column_name:"id",value:comment_id});

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something  Went Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Comment  Updated  Successfully"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}