import  {Request,Response}  from  "express";
import { getCustomCatchBlockResponseStructure, removeFiles, responseStructure } from "../utils/commonHelpers";
import { IProductModal, ProductModal } from "../modals/ProductModal";
import { IUserModal, UserModal } from "../modals/UserModel";
import { ISellerModal, SellerModal } from "../modals/SellerModal";
import { CategoryModal } from "../modals/CategoryModal";
import { SubCategoryModal } from "../modals/SubCategoryModal";
import { IGetAllProductsResponse, ICreateNewProductParam } from "../interfaces/queriesInterfaces";

export  const getAllLiveProducts = async (req:Request,res:Response):Promise<void> =>{
    try {
        const productModal  = new ProductModal();

        productModal.select(['products.id','products.product_name','products.description','products.images','products.views','products.number_of_customer_rate','products.average_rating','products.sum_rating','products.price','products.discount','products.created_at','categories.category_name','sub_categories.sub_category_name','products.status','sellers.brand_name','sellers.brand_logo']);
        productModal.join("categories",{first_table_column_name:"category",second_table_column_name:"id",operand:"="});
        productModal.join("sub_categories",{first_table_column_name:"sub_category",second_table_column_name:"sub_category_id",operand:"="});
        productModal.join("sellers",{first_table_column_name:"seller_id",second_table_column_name:"id",operand:"="});
        productModal.where([{column_name:"products.status",value:1},{column_name:"products.is_active",value:1},{column_name:"categories.is_active",value:1},{column_name:"sub_categories.sub_category_is_active",value:1}]);

        const  productsResponse =  await productModal.execute();

        if(!productsResponse.status || !(Array.isArray(productsResponse.data)  && productsResponse.data.length  > 0))
        {
            res.status(404).json(responseStructure(false,"Resource Not Found"));
            return;
        }

        const products   = (productsResponse.data  as  IGetAllProductsResponse[]).map((obj) => {
            return {
                id:  obj.id,
                product_name:  obj.product_name,
                description:  obj.description,
                images:  obj.images,
                views:  obj.views,
                number_of_customer_rate:  obj.number_of_customer_rate,
                average_rating:  obj.average_rating,
                sum_rating:  obj.sum_rating,
                price:  obj.price,
                discount:  obj.discount,
                created_at:  obj.created_at,
                category_name:  obj.category_name,
                status:  obj.status,
                sub_category_name:  obj.sub_category_name,
                brand_name:  obj.brand_name,
                brand_logo:  obj.brand_logo
            }
        })

        res.status(200).json(responseStructure(true,"Products Found Successfully",JSON.stringify({products:products})))

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const createNewProduct  = async (req:Request,res:Response):Promise<void> =>{
    try {

        const sellerAccount = (req as  any).seller  as ISellerModal;

        const  filesName:string[] =  (req as any).filesName;

        const  {product_name,description,category,sub_category,price,discount}  = req.body;

        const allowedFieldsForCreation = {product_name,description,category,sub_category,price,discount};

        const createRequestGivenFields = Object.fromEntries(Object.entries(allowedFieldsForCreation).filter(([key,value]) => value !== undefined)) as  ICreateNewProductParam;

        if(category)
        {
            const  categoryModal  = new CategoryModal();
            const categoryResponse = await categoryModal.getCategory([{column_name:"id",value:parseInt(category)},{column_name:"is_active",value:1}]);
            if(!categoryResponse.status  || (!Array.isArray(categoryResponse.data) &&  !(categoryResponse.data.length > 0)))
            {
                res.status(404).json(responseStructure(false,"Category  is invalid"));
                return;
            }else
                createRequestGivenFields.category  = parseInt(category);
        }

        if(sub_category)
        {
            const  subCategoryModal = new  SubCategoryModal();
            const subCategoryResponse = await subCategoryModal.getSubCategory([{column_name:"sub_category_id",value:parseInt(sub_category)},{column_name:"sub_category_is_active",value:1},{column_name:"category_id",value:category}]);
            if(!subCategoryResponse.status  || (!Array.isArray(subCategoryResponse.data) &&  !(subCategoryResponse.data.length > 0)))
            {
                res.status(404).json(responseStructure(false,"Sub Category  is invalid"));
                return;
            }else
            createRequestGivenFields.sub_category  =   parseInt(sub_category)
        }

        if(price)
            createRequestGivenFields.price  =   parseInt(price);
        
        if(discount)
            createRequestGivenFields.discount  =  parseInt(discount);


        if(filesName.length  > 0)
            createRequestGivenFields.images = filesName.join(",");

        createRequestGivenFields.seller_id = sellerAccount.id;

        const productModal =  new ProductModal();

        const productsResponse   =  await productModal.createNewProduct(createRequestGivenFields);


        if(!productsResponse.status)
        {
            res.status(400).json(responseStructure(false,'Something Went  Wrong'));
            return;
        }

        res.status(201).json(responseStructure(true,"Product Created Successfully"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const updateProductForSeller  = async (req:Request,res:Response):Promise<void> =>{
    try {  
        const sellerAccount  = (req as any).seller   as  ISellerModal;      
        const {product_name,description,deleteImages,category,sub_category,price,discount,status,is_active,product_id}  =  req.body;
        
        const productModal   = new  ProductModal(); 

        const isProductExists  = await productModal.getProduct([{column_name:"id",value:parseInt(product_id)},{column_name:"is_active",value:1}]);

        if(!isProductExists.status || !(Array.isArray(isProductExists.data) && isProductExists.data.length  >  0))
        {
            res.status(404).json(responseStructure(false,"Product  Not  Found"));
            return;
        }
        
        const  allowedFieldsForUpdation  =  {product_name,description,category,sub_category,price,discount,status,is_active};

        const updateRequestFields  = Object.fromEntries(Object.entries(allowedFieldsForUpdation).filter(([key,value]) => value !== undefined));

        const product =  (isProductExists.data as IProductModal[])[0];

        
        if(category  && product.category !== category)
        {
            const categoryModal = new  CategoryModal();
            const isCategoryExists =  await  categoryModal.getCategory([{column_name:"id",value:category},{column_name:"is_active",value:1}]);
            if(!isCategoryExists.status || !(Array.isArray(isCategoryExists.data) &&  isCategoryExists.data.length >0))
            {
                res.status(404).json(responseStructure(false,"Category   Not  Found"));
                return;
            }
        }

        
        if(sub_category && product.sub_category !== sub_category)
        {
            const  subCategoryModal = new  SubCategoryModal();
            const isSubCategoryExists =  await  subCategoryModal.getSubCategory([{column_name:"sub_category_id",value:sub_category},{column_name:"sub_category_is_active",value:1},{column_name:"category_id",value:category}]);
            if(!isSubCategoryExists.status || !(Array.isArray(isSubCategoryExists.data) &&  isSubCategoryExists.data.length >0))
            {
                res.status(404).json(responseStructure(false,"Sub Category   Not  Found"));
                return;
            }
        }

        const  filesName:string[] =  (req as any).filesName;   //uploaded files if  any

        //images deletion logic goes  here
        if(deleteImages)
        {
            const previousImages:string[] = deleteImages.split(",");
            if(previousImages.length > 0)
                removeFiles(previousImages,'product');
        }


        if(filesName.length   >  0  ||  deleteImages)
        {
            const allPreviousImages = product.images.split(",");
            const  deleteImagesArr = (deleteImages) ? deleteImages.split(",") :  [];
            const  newImages:string[]  =  allPreviousImages.filter((prevImage) => !deleteImagesArr.includes(prevImage));
            if(filesName.length > 0)
                newImages.push(...filesName);
            updateRequestFields.images = [...(new  Set(newImages))].join(",");
        }

        if(status)
        {
            if(status === 1)
            {
                if((product.description === '' &&  !description) || (product.category  === null &&  !category) || (product.sub_category   ===  null)  || (product.images ===  null &&  filesName.length === 0))
                {
                    res.status(400).json(responseStructure(false,"Product Details Are Incomplete"));
                    return;
                }
            }
        }

        if(is_active && is_active  == 0)
            updateRequestFields.status  =  0;

        const response = await productModal.updateProduct(updateRequestFields,[{column_name:"id",value:parseInt(product_id)},{column_name:"seller_id",value:sellerAccount.id},{column_name:"is_active",value:1}]);

        if(!response.status)
        {
            if(filesName.length  > 0)
            {
                removeFiles(filesName,'product');
            }
            res.status(400).json(responseStructure(false,"Something Went  Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Successfully Updated Product Details"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getAllProductsForSeller = async  (req:Request,res:Response):Promise<void> =>{
    try {
        const sellerAccount  = (req as any).seller  as ISellerModal;
        const  productModal  = new   ProductModal();
        productModal.select(['products.id','products.product_name','products.description','products.images','products.views','products.number_of_customer_rate','products.average_rating','products.sum_rating','products.price','products.discount','products.created_at','categories.category_name','sub_categories.sub_category_name','products.status','sellers.brand_name','sellers.brand_logo']);
        productModal.join("categories",{first_table_column_name:"category",second_table_column_name:"id",operand:"="});
        productModal.join("sub_categories",{first_table_column_name:"sub_category",second_table_column_name:"sub_category_id",operand:"="});
        productModal.join("sellers",{first_table_column_name:"seller_id",second_table_column_name:"id",operand:"="});
        productModal.where([{column_name:"products.seller_id",value:sellerAccount.id},{column_name:"products.is_active",value:1},{column_name:"categories.is_active",value:1},{column_name:"sub_categories.sub_category_is_active",value:1}]);

        const response  = await productModal.execute();

        if(!response.status || !(Array.isArray(response.data)  && response.data.length  > 0))
        {
            res.status(404).json(responseStructure(false,"Resource Not Found"));
            return;
        }

        const products   = (response.data  as  IGetAllProductsResponse[]).map((obj) => {
            return {
                id:  obj.id,
                product_name:  obj.product_name,
                description:  obj.description,
                images:  obj.images,
                views:  obj.views,
                number_of_customer_rate:  obj.number_of_customer_rate,
                average_rating:  obj.average_rating,
                sum_rating:  obj.sum_rating,
                price:  obj.price,
                discount:  obj.discount,
                created_at:  obj.created_at,
                category_name:  obj.category_name,
                sub_category_name:  obj.sub_category_name,
                status:  obj.status,
                brand_name:  obj.brand_name,
                brand_logo:  obj.brand_logo
            }
        })

        res.status(200).json(responseStructure(true,"Products  Fetch  Successfully",JSON.stringify({products:products})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getSellerAllProductsForAdmin = async  (req:Request,res:Response):Promise<void> =>{
    try {            
        const {seller_id}  =  req.body;
        const  productModal  = new   ProductModal();

        productModal.select(['products.id','products.product_name','products.description','products.images','products.views','products.number_of_customer_rate','products.average_rating','products.sum_rating','products.price','products.discount','products.created_at','categories.category_name','sub_categories.sub_category_name','products.status','sellers.brand_name','sellers.brand_logo','products.is_active']);
        productModal.join("categories",{first_table_column_name:"category",second_table_column_name:"id",operand:"="});
        productModal.join("sub_categories",{first_table_column_name:"sub_category",second_table_column_name:"sub_category_id",operand:"="});
        productModal.join("sellers",{first_table_column_name:"seller_id",second_table_column_name:"id",operand:"="});
        productModal.where([{column_name:"products.seller_id",value:seller_id},{column_name:"products.is_active",value:1},{column_name:"categories.is_active",value:1},{column_name:"sub_categories.sub_category_is_active",value:1}]);

        const response  = await productModal.execute();
        
        if(!response.status || !(Array.isArray(response.data)  && response.data.length  > 0))
        {
            res.status(404).json(responseStructure(false,"Resource Not Found"));
            return;
        }

        const products   = (response.data  as  IGetAllProductsResponse[]).map((obj) => {
            return {
                id:  obj.id,
                product_name:  obj.product_name,
                description:  obj.description,
                images:  obj.images,
                views:  obj.views,
                number_of_customer_rate:  obj.number_of_customer_rate,
                average_rating:  obj.average_rating,
                sum_rating:  obj.sum_rating,
                price:  obj.price,
                discount:  obj.discount,
                created_at:  obj.created_at,
                category_name:  obj.category_name,
                status:  obj.status,
                is_active:obj.is_active,
                sub_category_name:  obj.sub_category_name,
                brand_name:  obj.brand_name,
                brand_logo:  obj.brand_logo
            }
        })

        res.status(200).json(responseStructure(true,"Products  Fetch  Successfully",JSON.stringify({products:products})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const manageUserCart = async  (req:Request,res:Response):Promise<void>  =>{
    try {
        
        const  userModal = new UserModal();

        const userAccount = (req  as  any).user as IUserModal;

        
        if(userAccount.is_verified == 0)
        {
            res.status(400).json(responseStructure(false,"Account  is not verified yet"));
            return;
        }

        const {product_id,action}   = req.body;

        const productModal   = new ProductModal();

        const  productResponse = await productModal.getProduct([{column_name:"id",value:product_id},{column_name:"is_active",value:1},{column_name:"status",value:1}]);

        if(!productResponse.status  || (!Array.isArray(productResponse.data)  && !(productResponse.data.length  >  0)))
        {
            res.status(404).json(responseStructure(false,"Product  Not  Found"));
            return;
        }

        const userCart = userAccount.user_cart ? userAccount.user_cart.split(",") : [];

        if(action  == 'add')
        {
            userCart.push(product_id);
        }else if(action == 'remove')
        {
            const index  = userCart.indexOf(product_id);
            userCart.splice(index,1);
        }

        const  response = await  userModal.updateUserAccountDetails({user_cart:userCart.join(",")},[{column_name:"id",value:userAccount.id},{column_name:"is_active",value:1}]);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something   Went Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,'Successfully Updated User Cart'));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const manageUserWhislist = async  (req:Request,res:Response):Promise<void>  =>{
    try {
        
        const  userModal = new UserModal();

        const userAccount  = (req  as any).user as IUserModal;
        
        if(userAccount.is_verified ===  0)
        {
            res.status(400).json(responseStructure(false,"Account  is not verified yet"));
            return;
        }

        const {product_id,action}   = req.body;

        const productModal   = new ProductModal();

        const  productResponse = await productModal.getProduct([{column_name:"id",value:product_id},{column_name:"is_active",value:1},{column_name:"status",value:1}]);

        if(!productResponse.status  || (!Array.isArray(productResponse.data)  && !(productResponse.data.length  >  0)))
        {
            res.status(404).json(responseStructure(false,"Product  Not  Found"));
            return;
        }

        const userWhislist =   userAccount.user_whislist  ? userAccount.user_whislist.split(",") : [];

        if(action  == 'add')
        {
            userWhislist.push(product_id);
        }else if(action == 'remove')
        {
            const index  = userWhislist.indexOf(product_id);
            userWhislist.splice(index,1);
        }

        const  response = await  userModal.updateUserAccountDetails({user_whislist:userWhislist.join(",")},[{column_name:"id",value:userAccount.id},{column_name:"is_active",value:1}]);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something   Went Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,'Successfully Updated User Whislist'));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const getAllProductsForAdmin  = async (req:Request,res:Response):Promise<void> =>{
    try {            
        const  productModal  = new   ProductModal();

        productModal.select(['products.id','products.product_name','products.description','products.images','products.views','products.number_of_customer_rate','products.average_rating','products.sum_rating','products.price','products.discount','products.created_at','categories.category_name','sub_categories.sub_category_name','products.status','sellers.brand_name','sellers.brand_logo','products.is_active']);
        productModal.join("categories",{first_table_column_name:"category",second_table_column_name:"id",operand:"="});
        productModal.join("sub_categories",{first_table_column_name:"sub_category",second_table_column_name:"sub_category_id",operand:"="});
        productModal.join("sellers",{first_table_column_name:"seller_id",second_table_column_name:"id",operand:"="});

        const response  = await productModal.execute();
        
        if(!response.status || !(Array.isArray(response.data)  && response.data.length  > 0))
        {
            res.status(404).json(responseStructure(false,"Resource Not  found"));
            return;
        }

        const products   = (response.data  as  IGetAllProductsResponse[]).map((obj) => {
            return {
                id:  obj.id,
                product_name:  obj.product_name,
                description:  obj.description,
                images:  obj.images,
                views:  obj.views,
                number_of_customer_rate:  obj.number_of_customer_rate,
                average_rating:  obj.average_rating,
                sum_rating:  obj.sum_rating,
                price:  obj.price,
                discount:  obj.discount,
                created_at:  obj.created_at,
                category_name:  obj.category_name,
                sub_category_name:  obj.sub_category_name,
                status:  obj.status,
                is_active:obj.is_active,
                brand_name:  obj.brand_name,
                brand_logo:  obj.brand_logo
            }
        })

        res.status(200).json(responseStructure(true,"Products  Fetch  Successfully",JSON.stringify({products:products})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const updateProductForAdmin  = async  (req:Request,res:Response):Promise<void> =>{
    try {        
        const {product_name,description,deleteImages,category,sub_category,price,discount,status,is_active,product_id,seller_id,views,number_of_customer_rate,average_rating,sum_rating}  =  req.body;

        const  allowedFieldsForUpdation = {product_name,description,category,sub_category,price,discount,status,is_active,views,number_of_customer_rate,average_rating,sum_rating};

        const updateRequestFields  = Object.fromEntries(Object.entries(allowedFieldsForUpdation).filter(([key,value]) => value !== undefined));
        
        const productModal   = new  ProductModal(); 
        
        const isProductExists  = await productModal.getProduct({column_name:"id",value:product_id});

        if(!isProductExists.status || !(Array.isArray(isProductExists.data) && isProductExists.data.length  >  0))
        {
            res.status(404).json(responseStructure(false,"Product  Not  Found"));
            return;
        }

        const product =  (isProductExists.data as IProductModal[])[0];

        if(seller_id  && product.seller_id  !== seller_id)
        {
            const sellerModal =  new  SellerModal();
            const isSellerExists   = await sellerModal.getSeller([{column_name:"id",value:seller_id},{column_name:"is_active",value:1}]);

            if(!isSellerExists.status || !(Array.isArray(isSellerExists.data) && isSellerExists.data.length  >  0))
            {
                res.status(404).json(responseStructure(false,"Seller  Not  Found"));
                return;
            }else
                updateRequestFields.seller_id = seller_id;
        }

        const  filesName:string[] =  (req as any).filesName;   //uploaded files if  any

        //images deletion logic goes  here
        if(deleteImages)
        {
            const previousImages:string[] = deleteImages.split(",");
            if(previousImages.length > 0)
                removeFiles(previousImages,'product');
        }


        if(filesName.length   >  0  ||  deleteImages)
        {
            const allPreviousImages = product.images.split(",");
            const  deleteImagesArr = (deleteImages) ? deleteImages.split(",") :  [];
            const  newImages:string[]  =  allPreviousImages.filter((prevImage) => !deleteImagesArr.includes(prevImage));
            if(filesName.length > 0)
                newImages.push(...filesName);
            updateRequestFields.images = [...(new  Set(newImages))].join(",");
        }

        
        if(category && product.category !== category)
        {
            const categoryModal = new  CategoryModal();
            const isCategoryExists =  await  categoryModal.getCategory([{column_name:"id",value:category},{column_name:"is_active",value:1}]);
            if(!isCategoryExists.status || !(Array.isArray(isCategoryExists.data) &&  isCategoryExists.data.length >0))
            {
                res.status(404).json(responseStructure(false,"Category   Not  Found"));
                return;
            }
        }

        
        if(sub_category && product.sub_category !== sub_category)
        {
            const  subCategoryModal = new  SubCategoryModal();
            const isSubCategoryExists =  await  subCategoryModal.getSubCategory([{column_name:"sub_category_id",value:sub_category},{column_name:"sub_category_is_active",value:1},{column_name:"category_id",value:category}]);
            if(!isSubCategoryExists.status || !(Array.isArray(isSubCategoryExists.data) &&  isSubCategoryExists.data.length >0))
            {
                res.status(404).json(responseStructure(false,"Sub Category   Not  Found"));
                return;
            }
        }


        if(status)
        {
            if(status === 1)
            {
                if((product.description === '' &&  !description) || (product.category  === null &&  !category) || (product.sub_category   ===  null)  || (product.images ===  null &&  filesName.length === 0))
                {
                    res.status(400).json(responseStructure(false,"Product Details Are Incomplete"));
                    return;
                }
            }
        }

        if(is_active && is_active  == 0)
            updateRequestFields.status  =  0;


        const response = await productModal.updateProduct(updateRequestFields,[{column_name:"id",value:product_id}]);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something Went  Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,"Successfully Updated Product Details"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const manageUserCartForAdmin = async  (req:Request,res:Response):Promise<void>  =>{
    try {
        const {user_id,product_id,action}   = req.body;

        const   userModal  =  new UserModal();

        const userResponse = await  userModal.getUser([{column_name:'id',value:user_id}]);

        if(!userResponse.status)
        {
            res.status(404).json(responseStructure(false,'User Not  Found'));
            return;
        }

        const productModal   = new ProductModal();

        const  productResponse = await productModal.getProduct([{column_name:"id",value:product_id}]);

        if(!productResponse.status  || (!Array.isArray(productResponse.data)  && !(productResponse.data.length  >  0)))
        {
            res.status(404).json(responseStructure(false,"Product  Not  Found"));
            return;
        }

        const  userAccount  = (userResponse.data  as  IUserModal[])[0];
        const userCart = userAccount.user_cart.split(",");
        const product = (productResponse.data as IProductModal[])[0];

        if(action  == 'add')
        {
            if(product.is_active  !== 1 || product.status !== 1)
            {
                res.status(400).json(responseStructure(false,"Product  Is Not Active  Or  Deleted"));
                return;   
            }
            userCart.push(product_id);
        }else if(action == 'remove')
        {
            const index  = userCart.indexOf(product_id);
            userCart.splice(index,1);
        }

        const  response = await  userModal.updateUserAccountDetails({user_cart:userCart.join(",")},[{column_name:"id",value:userAccount.id},{column_name:"is_active",value:1}]);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something   Went Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,'Successfully Updated User Cart'));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const manageUserWhislistForAdmin = async  (req:Request,res:Response):Promise<void>  =>{
    try {
        const {user_id,product_id,action}   = req.body;

        const   userModal  =  new UserModal();

        const userResponse = await  userModal.getUser([{column_name:'id',value:user_id}]);

        if(!userResponse.status)
        {
            res.status(404).json(responseStructure(false,'User Not  Found'));
            return;
        }

        const productModal   = new ProductModal();

        const  productResponse = await productModal.getProduct([{column_name:"id",value:product_id}]);

        if(!productResponse.status  || (!Array.isArray(productResponse.data)  && !(productResponse.data.length  >  0)))
        {
            res.status(404).json(responseStructure(false,"Product  Not  Found"));
            return;
        }

        const  userAccount  = (userResponse.data  as  IUserModal[])[0];
        const userWhislist = userAccount.user_whislist.split(",");
        const product = (productResponse.data as IProductModal[])[0];

        if(action  == 'add')
        {
            if(product.is_active  !== 1 || product.status !== 1)
            {
                res.status(400).json(responseStructure(false,"Product  Is Not Active  Or  Deleted"));
                return;   
            }
            userWhislist.push(product_id);
        }else if(action == 'remove')
        {
            const index  = userWhislist.indexOf(product_id);
            userWhislist.splice(index,1);
        }

        const  response = await  userModal.updateUserAccountDetails({user_whislist:userWhislist.join(",")},[{column_name:"id",value:userAccount.id},{column_name:"is_active",value:1}]);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something   Went Wrong"));
            return;
        }

        res.status(200).json(responseStructure(true,'Successfully Updated User Whislist'));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}