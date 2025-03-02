import  {Request,Response} from "express";
import { getCustomCatchBlockResponseStructure, responseStructure } from "../utils/commonHelpers";
import { IOrderModal, OrderModal } from "../modals/OrderModal";
import { IProductModal, ProductModal } from "../modals/ProductModal";
import { IUserModal, UserModal } from "../modals/UserModel";
import { ISellerModal } from "../modals/SellerModal";
import { IGetAllProductsOrdersResponse } from "../interfaces/queriesInterfaces";

export const placeNewOrder = async (req:Request,res:Response):Promise<void> => {
    try {
        const {product_id,price,quantity} =  req.body;
        const   userAccount =  (req  as any).user  as IUserModal;
        const productModal  = new ProductModal();

        if(userAccount.address == null ||  userAccount.address  ==  '')
        {
            res.status(400).json(responseStructure(false,"Delivery Address  Not Found"));
            return;
        }

        const productResponse  = await productModal.getProduct([{column_name:"id",value:product_id},{column_name:"is_active",value:1}]);

        if(!productResponse.status ||  (!Array.isArray(productResponse.data) && !(productResponse.data.length  > 0)))
        {
            res.status(404).json(responseStructure(false,"Product Not  Found"));
            return;
        }

        const  userCart:string[] = userAccount.user_cart ? userAccount.user_cart.split(',') : [];

        if(userCart.includes(product_id.toString()))
        {
            const newUserCart  =  userCart.filter((cart) =>  cart !==   product_id.toString());

            const userModal =  new  UserModal();
            const response = await userModal.updateUserAccountDetails({user_cart:newUserCart.join(",")},{column_name:"id",value:userAccount.id});
        }

        const orderModal =  new OrderModal();

        const response = await orderModal.createNewOrder({
            product_id,
            price,
            user_id:  userAccount.id,
            quantity:  quantity ?? 1
        });

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something  Went  Wrong"));
            return;
        }
        
        res.status(201).json(responseStructure(true,"Order Placed  Successfully"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const cancelOrderForUser = async   (req:Request,res:Response):Promise<void>  =>{
    try {
        const {order_id} =  req.body;
        const userAccount  = (req as any).user as  IUserModal;
        const orderModal  = new  OrderModal();
        
        const response =   await  orderModal.updateOrder({order_status:"Cancelled"},[{column_name:"id",value:order_id},{column_name:"user_id",value:userAccount.id},{column_name:"is_active",value:1}]);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something Went  Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Successfully Cancelled  The  Order"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const manageOrderRatingForUser = async   (req:Request,res:Response):Promise<void>  =>{
    try {
        const {order_id,rating} =  req.body;
        const userAccount  = (req as any).user as  IUserModal;
        const orderModal  = new  OrderModal();
        
        const  orderResponse   =   await orderModal.getOrder({column_name:"id",value:order_id});

        if(!orderResponse.status  &&  !(Array.isArray(orderResponse.data) && orderResponse.data.length  >  0))
        {
            res.status(404).json(responseStructure(false,"Order  Not Found"));
            return;
        }

        const  order = (orderResponse.data  as IOrderModal[])[0];

        const productModal   =  new  ProductModal();  

        const    productResponse  = await  productModal.getProduct({column_name:"id",value:order.product_id});

        if(!productResponse.status  &&  !(Array.isArray(productResponse.data) && productResponse.data.length  >  0))
        {
            res.status(404).json(responseStructure(false,"Product  Not Found"));
            return;
        }

        const  product = (productResponse.data  as IProductModal[])[0];

        const updateData:Record<string,any> =  {};

        if(order.rating)
        {
            updateData.sum_rating = product.sum_rating - order.rating + rating;
            updateData.number_of_customer_rate = product.number_of_customer_rate;
        }   
        else
        {
            updateData.sum_rating  = product.sum_rating + rating;
            updateData.number_of_customer_rate = product.number_of_customer_rate + 1;
        }

        updateData.average_rating = updateData.sum_rating  / updateData.number_of_customer_rate;

        const  updateProductRatingResponse =  await  productModal.updateProduct(updateData,{column_name:"id",value:product.id});

        const response =   await  orderModal.updateOrder({rating: rating},[{column_name:"id",value:order_id},{column_name:"user_id",value:userAccount.id},{column_name:"is_active",value:1}]);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something Went  Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Successfully Cancelled  The  Order"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const updateOrderForSeller  = async  (req:Request,res:Response):Promise<void> =>  {
    try {
        const {order_id,price,cancel_reason,order_status,is_active}  = req.body;
        const sellerAccount = (req  as  any).seller  as  ISellerModal;
        const orderModal  = new  OrderModal();

        const orderResponse  = await orderModal.getOrder([{column_name:"id",value:order_id}]);
        
        if(!orderResponse.status ||  (!Array.isArray(orderResponse.data) && !(orderResponse.data.length  > 0)))
        {
            res.status(404).json(responseStructure(false,"Order  Not Found"));
            return;
        }

        const allowedUpdateRequest  =  {price,cancel_reason,order_status,is_active};

        const  updateRequestFields = Object.fromEntries(Object.entries(allowedUpdateRequest).filter(([key,value]) => value !==  undefined));

        const orderDetails =  (orderResponse.data as  IOrderModal[])[0];

        const  productModal  = new ProductModal();

        const productResponse  = await productModal.getProduct([{column_name:"id",value:orderDetails.product_id},{column_name:"seller_id",value:sellerAccount.id}]);

        if(!productResponse.status ||  (!Array.isArray(productResponse.data) && !(productResponse.data.length  > 0)))
        {
            res.status(400).json(responseStructure(false,"Access Denied"));
            return;
        }

        const  productDetails  = (productResponse.data as IProductModal[])[0];

        const  response  = await orderModal.updateOrder(updateRequestFields,[{column_name:"id",value:order_id},{column_name:"product_id",value:productDetails.id}]);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something Went   Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Successfully  Updated Order"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const updateOrderForAdmin  = async  (req:Request,res:Response):Promise<void> =>  {
    try {
        const {order_id,product_id,user_id,price,order_status,is_active}  = req.body;

        const orderModal  = new  OrderModal();

        const orderResponse  = await orderModal.getOrder([{column_name:"id",value:order_id}]);
        
        if(!orderResponse.status ||  (!Array.isArray(orderResponse.data) && !(orderResponse.data.length  > 0)))
        {
            res.status(404).json(responseStructure(false,"Order  Not Found"));
            return;
        }

        const  response  = await orderModal.updateOrder({user_id,price,order_status,is_active},[{column_name:"id",value:order_id},{column_name:"product_id",value:product_id}]);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something Went   Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Successfully  Updated Order"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const getAllOrdersOfProductForSeller = async (req:Request,res:Response):Promise<void> => {
    try {
        const {product_id} = req.body;
        const productModal =  new  ProductModal();
        const sellerAccount  = (req  as any).seller   as ISellerModal;
        const productResponse =  await  productModal.getProduct([{column_name:"id",value:product_id},{column_name:"seller_id",value:sellerAccount.id}]);

        if(!productResponse.status || !(Array.isArray(productResponse.data)  && productResponse.data.length  >  0))
        {
            res.status(404).json(responseStructure(false,"Product Not Found"));
            return;
        }

        const orderModal = new OrderModal();
        orderModal.select(['orders.id','orders.price','orders.order_status','orders.cancel_reason','orders.rating','orders.is_active','orders.quantity','orders.created_at','orders.updated_at','orders.product_id','products.product_name','products.images','users.user_name','users.user_photo','users.address']);
        orderModal.join("products",{first_table_column_name:"product_id",second_table_column_name:"id",operand:"="});
        orderModal.join("users",{first_table_column_name:"user_id",second_table_column_name:"id",operand:"="});
        orderModal.where([{column_name:"orders.product_id",value:product_id},{column_name:"orders.is_active",value:1}])

        const orderResponse =  await orderModal.execute();

        if(!orderResponse.status || (!Array.isArray(orderResponse.data) && !(orderResponse.data.length  > 0)))
        {
            res.status(404).json(responseStructure(false,"Order  Not Found"));
            return;
        }

        const response:IGetAllProductsOrdersResponse[] = (orderResponse.data as  IGetAllProductsOrdersResponse[]).map((obj) => {
            return {
                id:obj.id,
                price:obj.price,
                order_status:obj.order_status,
                cancel_reason:obj.cancel_reason,
                rating:obj.rating,
                is_active:obj.is_active,
                quantity:obj.quantity,
                created_at:obj.created_at,
                updated_at:obj.updated_at,
                product_id:obj.product_id,
                product_name:obj.product_name,
                images:obj.images,
                user_name:obj.user_name,
                user_photo:obj.user_photo,
                address:obj.address,
            }
        })
        
        res.status(200).json(responseStructure(true,"Order Found Successfully",JSON.stringify({orders:response})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const getAllOrdersOfProductForAdmin = async (req:Request,res:Response):Promise<void> => {
    try {
        const {product_id} = req.body;
        const productModal =  new  ProductModal();

        const productResponse =  await  productModal.getProduct([{column_name:"id",value:product_id}]);

        if(!productResponse.status || (!Array.isArray(productResponse.data)  && !(productResponse.data.length  >  0)))
        {
            res.status(400).json(responseStructure(false,"Product Not Found"));
            return;
        }

        const orderModal = new OrderModal();
        orderModal.select(['orders.id','orders.price','orders.order_status','orders.cancel_reason','orders.rating','orders.is_active','orders.quantity','orders.created_at','orders.updated_at','orders.product_id','products.product_name','products.images','users.user_name','users.user_photo','users.address']);
        orderModal.join("products",{first_table_column_name:"product_id",second_table_column_name:"id",operand:"="});
        orderModal.join("users",{first_table_column_name:"user_id",second_table_column_name:"id",operand:"="});
        orderModal.where([{column_name:"product_id",value:product_id}])

        const orderResponse =  await orderModal.execute();

        if(!orderResponse.status || (!Array.isArray(orderResponse.data) && !(orderResponse.data.length  > 0)))
        {
            res.status(404).json(responseStructure(false,"Order  Not Found"));
            return;
        }

        const response:IGetAllProductsOrdersResponse[] = (orderResponse.data as  IGetAllProductsOrdersResponse[]).map((obj) => {
            return {
                id:obj.id,
                price:obj.price,
                order_status:obj.order_status,
                cancel_reason:obj.cancel_reason,
                rating:obj.rating,
                is_active:obj.is_active,
                quantity:obj.quantity,
                created_at:obj.created_at,
                updated_at:obj.updated_at,
                product_id:obj.product_id,
                product_name:obj.product_name,
                images:obj.images,
                user_name:obj.user_name,
                user_photo:obj.user_photo,
                address:obj.address,
            }
        })
        
        res.status(200).json(responseStructure(true,"Order Found Successfully",JSON.stringify({orders:response})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getAllOrdersOfUserForUser =  async (req:Request,res:Response):Promise<void>=>{
    try {
        const  userAccount = (req  as  any).user as IUserModal;
        const  orderModal  =   new   OrderModal();
        orderModal.select(['orders.id','orders.price','orders.order_status','orders.cancel_reason','orders.rating','orders.is_active','orders.quantity','orders.created_at','orders.updated_at','orders.product_id','products.product_name','products.images','users.user_name','users.user_photo','users.address']);
        orderModal.join("products",{first_table_column_name:"product_id",second_table_column_name:"id",operand:"="});
        orderModal.join("users",{first_table_column_name:"user_id",second_table_column_name:"id",operand:"="});
        orderModal.where([{column_name:"orders.user_id",value:userAccount.id},{column_name:"orders.is_active",value:1}])

        const orderResponse =  await orderModal.execute();

        if(!orderResponse.status || (!Array.isArray(orderResponse.data) && !(orderResponse.data.length  > 0)))
        {
            res.status(404).json(responseStructure(false,"Order  Not Found"));
            return;
        }

        const response:IGetAllProductsOrdersResponse[] = (orderResponse.data as  IGetAllProductsOrdersResponse[]).map((obj) => {
            return {
                id:obj.id,
                price:obj.price,
                order_status:obj.order_status,
                cancel_reason:obj.cancel_reason,
                rating:obj.rating,
                is_active:obj.is_active,
                quantity:obj.quantity,
                created_at:obj.created_at,
                updated_at:obj.updated_at,
                product_id:obj.product_id,
                product_name:obj.product_name,
                images:obj.images,
                user_name:obj.user_name,
                user_photo:obj.user_photo,
                address:obj.address,
            }
        })
        
        res.status(200).json(responseStructure(true,"Order Found Successfully",JSON.stringify({orders:response})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getAllOrdersOfUserForAdmin =  async (req:Request,res:Response):Promise<void>=>{
    try {
        const {user_id} = req.body;

        const  orderModal  =   new   OrderModal();
        orderModal.select(['orders.id','orders.price','orders.order_status','orders.cancel_reason','orders.rating','orders.is_active','orders.quantity','orders.created_at','orders.updated_at','orders.product_id','products.product_name','products.images','users.user_name','users.user_photo','users.address']);
        orderModal.join("products",{first_table_column_name:"product_id",second_table_column_name:"id",operand:"="});
        orderModal.join("users",{first_table_column_name:"user_id",second_table_column_name:"id",operand:"="});
        orderModal.where([{column_name:"orders.user_id",value:user_id}])

        const orderResponse =  await orderModal.execute();

        if(!orderResponse.status || (!Array.isArray(orderResponse.data) && !(orderResponse.data.length  > 0)))
        {
            res.status(404).json(responseStructure(false,"Order  Not Found"));
            return;
        }

        const response:IGetAllProductsOrdersResponse[] = (orderResponse.data as  IGetAllProductsOrdersResponse[]).map((obj) => {
            return {
                id:obj.id,
                price:obj.price,
                order_status:obj.order_status,
                cancel_reason:obj.cancel_reason,
                rating:obj.rating,
                is_active:obj.is_active,
                quantity:obj.quantity,
                created_at:obj.created_at,
                updated_at:obj.updated_at,
                product_id:obj.product_id,
                product_name:obj.product_name,
                images:obj.images,
                user_name:obj.user_name,
                user_photo:obj.user_photo,
                address:obj.address,
            }
        })
        
        res.status(200).json(responseStructure(true,"Order Found Successfully",JSON.stringify({orders:response})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getAllOrders =  async (req:Request,res:Response):Promise<void>=>{
    try {
        const  orderModal  =   new   OrderModal();
        orderModal.select(['orders.id','orders.price','orders.order_status','orders.cancel_reason','orders.rating','orders.is_active','orders.quantity','orders.created_at','orders.updated_at','orders.product_id','products.product_name','products.images','users.user_name','users.user_photo','users.address']);
        orderModal.join("products",{first_table_column_name:"product_id",second_table_column_name:"id",operand:"="});
        orderModal.join("users",{first_table_column_name:"user_id",second_table_column_name:"id",operand:"="});

        const orderResponse =  await orderModal.execute();
        
        if(!orderResponse.status || (!Array.isArray(orderResponse.data) && !(orderResponse.data.length  > 0)))
        {
            res.status(404).json(responseStructure(false,"Order  Not Found"));
            return;
        }

        const response:IGetAllProductsOrdersResponse[] = (orderResponse.data as  IGetAllProductsOrdersResponse[]).map((obj) => {
            return {
                id:obj.id,
                price:obj.price,
                order_status:obj.order_status,
                cancel_reason:obj.cancel_reason,
                rating:obj.rating,
                is_active:obj.is_active,
                quantity:obj.quantity,
                created_at:obj.created_at,
                updated_at:obj.updated_at,
                product_id:obj.product_id,
                product_name:obj.product_name,
                images:obj.images,
                user_name:obj.user_name,
                user_photo:obj.user_photo,
                address:obj.address,
            }
        })
        
        res.status(200).json(responseStructure(true,"Order Found Successfully",JSON.stringify({orders:response})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getAllOrdersForSeller =  async (req:Request,res:Response):Promise<void>=>{
    try {
        const sellerAccount  = (req as  any).seller as  ISellerModal;

        const  orderModal  =   new   OrderModal();
        orderModal.select(['orders.id','orders.price','orders.order_status','orders.cancel_reason','orders.rating','orders.is_active','orders.quantity','orders.created_at','orders.updated_at','orders.product_id','products.product_name','products.images','users.user_name','users.user_photo','users.address']);
        orderModal.join("products",{first_table_column_name:"product_id",second_table_column_name:"id",operand:"="});
        orderModal.join("users",{first_table_column_name:"user_id",second_table_column_name:"id",operand:"="});
        orderModal.where([{column_name:"products.seller_id",value:sellerAccount.id},{column_name:"orders.is_active",value:1}])

        const orderResponse =  await orderModal.execute();

        if(!orderResponse.status || (!Array.isArray(orderResponse.data) && !(orderResponse.data.length  > 0)))
        {
            res.status(404).json(responseStructure(false,"Order  Not Found"));
            return;
        }

        const response:IGetAllProductsOrdersResponse[] = (orderResponse.data as  IGetAllProductsOrdersResponse[]).map((obj) => {
            return {
                id:obj.id,
                price:obj.price,
                order_status:obj.order_status,
                cancel_reason:obj.cancel_reason,
                rating:obj.rating,
                is_active:obj.is_active,
                quantity:obj.quantity,
                created_at:obj.created_at,
                updated_at:obj.updated_at,
                product_id:obj.product_id,
                product_name:obj.product_name,
                images:obj.images,
                user_name:obj.user_name,
                user_photo:obj.user_photo,
                address:obj.address,
            }
        })
        
        res.status(200).json(responseStructure(true,"Order Found Successfully",JSON.stringify({orders:response})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}