import {Request,Response} from "express";
import { getCustomCatchBlockResponseStructure, removeFiles, responseStructure } from "../utils/commonHelpers";
import { CategoryModal, ICategoryModal } from "../modals/CategoryModal";
import { ISubCategoryModal, SubCategoryModal } from "../modals/SubCategoryModal";
import { ICreateNewCategoryParam, ICreateNewSubCategoryParam, IGetCategoriesAndSubCategoriesResponse, IGetCategoriesAndSubCategoriesResponseFromJoinQueryResponse, IUpdateCategoryParam, IUpdateSubCategoryParam } from "../interfaces/queriesInterfaces";
import { ContactModal, IContactModal } from "../modals/ContactModal";

export  const contactUs = async (req:Request,res:Response):Promise<void> => {
    try {
        const  {name,email,message} = req.body;

        const  contactModal  = new  ContactModal();

        const response    = await contactModal.createNewComment({
            name,
            email,
            message,
        })

        if(!response.status)
        {
            res.status(400).json(responseStructure(true,"Something   Went Wrong"));
            return;
        }

        res.status(201).json(responseStructure(true,"Successfully Submitted Contact Form"));
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const getContactRows = async (req:Request,res:Response):Promise<void> => {
    try {

        const  contactModal  = new  ContactModal();

        const response = await contactModal.getAllContactRows();

        if(!response.status && !(Array.isArray(response.data) && response.data.length > 0))
        {
            res.status(400).json(responseStructure(true,"Something   Went Wrong"));
            return;
        }

        const responseData =   (response.data as IContactModal[]);

        res.status(201).json(responseStructure(true,"Successfully Submitted Contact Form",JSON.stringify({data:responseData})));
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const createCategory = async (req:Request,res:Response):Promise<void> =>{
    try {
        const {name} = req.body;

        const  categoryModal = new CategoryModal();

        const isCategoryExistsWithSameName  = await categoryModal.getCategory([{column_name:"category_name",value:name},{column_name:"is_active",value:1}]);

        if(isCategoryExistsWithSameName.status &&  Array.isArray(isCategoryExistsWithSameName.data) &&  isCategoryExistsWithSameName.data.length > 0)
        {
            res.status(400).json(responseStructure(false,"Category   Already   Exists  With  Same  Name"));
            return;
        }

        const  createNewCategoryObj:ICreateNewCategoryParam = {name:name};

        const  uploadImage:string[] = (req as any).filesName;

        if(uploadImage.length  >  0)
            createNewCategoryObj.category_image = uploadImage[0];

        const response  = await  categoryModal.createNewCategorySingleHelper(createNewCategoryObj);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something  Went Wrong"))
            return;
        }

        res.status(201).json(responseStructure(true,"Successfully Created New Category"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const updateCategory = async  (req:Request,res:Response):Promise<void> =>{
    try {
        const {category_id,name,is_active}  = req.body;
        const categoryModal =  new  CategoryModal();

        const  categoryResponse = await  categoryModal.getCategory([{column_name:"id",value:parseInt(category_id)}]);

        if(!categoryResponse.status || !(Array.isArray(categoryResponse.data) && categoryResponse.data.length >   0))
        {
            res.status(404).json(responseStructure(false,"Category  Not  Found"));
            return;
        }

        const  category = (categoryResponse.data as ICategoryModal[])[0];

        if(name && category.category_name.toLowerCase()  !==  name.toLowerCase())
        {
            const isCategoryExistsWithSameName  = await categoryModal.getCategory([{column_name:"category_name",value:name},{column_name:"id",value:parseInt(category_id),operand:"!="}]);

            if(isCategoryExistsWithSameName.status)
            {
                res.status(400).json(responseStructure(false,"Category Already Exists With Same Name"));
                return;
            }
        }

        const  udpateCategoryObj:IUpdateCategoryParam = {};

        if(name)
        {
            udpateCategoryObj.category_name  =  name;
        }

        const  uploadImage:string[] = (req as any).filesName;

        if(uploadImage.length  >  0)
        {
            udpateCategoryObj.category_image = uploadImage[0];
            if(category.category_image)
                removeFiles([category.category_image],'main');
        }

        if(is_active)
            udpateCategoryObj.is_active = parseInt(is_active);
        
        const  response = await categoryModal.updateCategory(udpateCategoryObj,{column_name:"id",value:parseInt(category_id)});

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something  Went  Wrong"));
            return;
        }
        res.status(200).json(responseStructure(true,"Successfully Updated Category"));
        
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const createSubCategory = async (req:Request,res:Response):Promise<void> =>{
    try {
        const {category_id,sub_category_name} = req.body;

        const  categoryModal = new CategoryModal();

        const isCategoryExists  = await categoryModal.getCategory({column_name:'id',value:category_id});
        
        if(!isCategoryExists.status)
        {
            res.status(404).json(responseStructure(false,"Category  Not Exists"));
            return;
        }

        const subCategoryModal  = new SubCategoryModal();

        const isSubCategoryExists  = await  subCategoryModal.getSubCategory([{column_name:"sub_category_name",value:sub_category_name},{column_name:"category_id",value:category_id}]);

        if(isSubCategoryExists.status)
        {
            res.status(400).json(responseStructure(false,"Sub  Category  Already Exists"));
            return;
        }

        const  createNewSubCategory:ICreateNewSubCategoryParam = {category_id:category_id,sub_category_name:sub_category_name};

        const  uploadImage:string[] = (req as any).filesName;

        if(uploadImage.length  >  0)
        {
            createNewSubCategory.sub_category_image = uploadImage[0];
        }

        const response  = await  subCategoryModal.createNewSubCategory(createNewSubCategory);

        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something  Went Wrong"))
            return;
        }

        res.status(201).json(responseStructure(true,"Successfully Created New Category"));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export const updateSubCategory = async  (req:Request,res:Response):Promise<void> =>{
    try {
        const {category_id,sub_category_id,sub_category_name,is_active}  = req.body;
        
        const  subCategoryModal  = new SubCategoryModal();

        const subCategoryResponse = await  subCategoryModal.getSubCategory({column_name:"sub_category_id",value:parseInt(sub_category_id)});

        if(!subCategoryResponse.status)
        {
            res.status(404).json(responseStructure(false,"Sub  Category Not  Found"));
            return;
        }

        const subCategory = (subCategoryResponse.data as ISubCategoryModal[])[0];

        if(sub_category_name && subCategory.sub_category_name.toLowerCase()   !==  sub_category_name.toLowerCase())
        {
            const  isSubCategoryExistsWithSameName = await subCategoryModal.getSubCategory([{column_name:"sub_category_name",value:sub_category_name},{column_name:"category_id",value:parseInt(category_id)},{column_name:"sub_category_id",value:parseInt(sub_category_id),operand:"!="}]);

            if(isSubCategoryExistsWithSameName.status)
            {
                res.status(400).json(responseStructure(false,"Sub Category Already Exists With Same Name"));
                return;    
            }
        }

        const  updateSubCategoryObj:IUpdateSubCategoryParam = {category_id:parseInt(category_id)};

        const  uploadImage:string[] = (req as any).filesName;

        if(sub_category_name)
        {
            updateSubCategoryObj.sub_category_name = sub_category_name;
        }

        if(uploadImage.length  >  0)
        {
            updateSubCategoryObj.sub_category_image = uploadImage[0];
            if(subCategory.sub_category_image)
                removeFiles([subCategory.sub_category_image],'main');
        }

        if(is_active)
        {
            updateSubCategoryObj.is_active = parseInt(is_active);
        }

        const  response = await subCategoryModal.updateSubCategory(updateSubCategoryObj,[{column_name:"sub_category_id",value:parseInt(sub_category_id)}]);
        
        if(!response.status)
        {
            res.status(400).json(responseStructure(false,"Something  Went  Wrong"));
            return;
        }
        res.status(200).json(responseStructure(true,"Successfully Updated  Sub Category"));
        
    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
}

export  const  getAllActiveCategoriesAndSubCategories = async (req:Request,res:Response):Promise<void> =>{
    try {
        
        const   categoryModal = new CategoryModal();
        categoryModal.select();
        categoryModal.join("sub_categories",{first_table_column_name:"id",operand:"=",second_table_column_name:"category_id"});
        categoryModal.where([{column_name:"categories.is_active",value:1},{column_name:"sub_categories.sub_category_is_active",value:1}]);

        const response =  await categoryModal.execute();

        if(!response.status ||  !(Array.isArray(response.data) && response.data.length > 0))
        {
            res.status(404).json(responseStructure(false,"Resource Not Found"));   
            return;
        }

        const tempVariable:number[] = [];
        const responseData:Record<number,IGetCategoriesAndSubCategoriesResponse> = {};

        (response.data as IGetCategoriesAndSubCategoriesResponseFromJoinQueryResponse[]).forEach(obj  => {
            const  key = obj.id;
            if(tempVariable.includes(key))
            {
                responseData[key].sub_categories.push({
                    sub_category_id: obj.sub_category_id,
                    sub_category_name: obj.sub_category_name,
                    sub_category_image: obj.sub_category_image,
                    sub_category_is_active: obj.sub_category_is_active,
                    sub_category_updated_at: obj.sub_category_updated_at,
                    sub_category_created_at: obj.sub_category_created_at,
                })
            }else{
                tempVariable.push(key);
                responseData[key] = {
                    category_id: obj.id,
                    category_name: obj.category_name,
                    category_image: obj.category_image,
                    category_is_active: obj.is_active,
                    category_created_at: obj.created_at,
                    category_updated_at:  obj.updated_at,
                    sub_categories:[
                        {
                            sub_category_id: obj.sub_category_id,
                            sub_category_name: obj.sub_category_name,
                            sub_category_image: obj.sub_category_image,
                            sub_category_is_active: obj.sub_category_is_active,
                            sub_category_updated_at: obj.sub_category_updated_at,
                            sub_category_created_at: obj.sub_category_created_at,
                        }
                    ]
                }
            }

        });

        const data =  Object.values(responseData);
        
        res.status(200).json(responseStructure(true,"Successfully Fetch Categories",JSON.stringify({data:data})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
} 

export  const  getAllCategoriesAndSubCategories = async (req:Request,res:Response):Promise<void> =>{
    try {
        
        const   categoryModal = new CategoryModal();
        categoryModal.select();
        categoryModal.join("sub_categories",{first_table_column_name:"id",operand:"=",second_table_column_name:"category_id"},"LEFT JOIN");
        categoryModal.union();
        categoryModal.select();
        categoryModal.join("sub_categories",{first_table_column_name:"id",operand:"=",second_table_column_name:"category_id"},"RIGHT JOIN");

        const response =  await categoryModal.execute();
        if(!response.status ||  !(Array.isArray(response.data) && response.data.length > 0))
        {
            res.status(404).json(responseStructure(false,"Resource Not Found"));   
            return;
        }

        const tempVariable:number[] = [];
        const responseData:Record<number,IGetCategoriesAndSubCategoriesResponse> = {};

        (response.data as IGetCategoriesAndSubCategoriesResponseFromJoinQueryResponse[]).forEach(obj  => {
            const  key = obj.id;
            if(tempVariable.includes(key))
            {
                if(obj.sub_category_id)
                {
                    responseData[key].sub_categories.push({
                        sub_category_id: obj.sub_category_id,
                        sub_category_name: obj.sub_category_name,
                        sub_category_image:obj.sub_category_image,
                        sub_category_is_active: obj.sub_category_is_active,
                        sub_category_updated_at: obj.sub_category_updated_at,
                        sub_category_created_at: obj.sub_category_created_at,
                    })
                }
            }else{
                tempVariable.push(key);
                responseData[key] = {
                    category_id: obj.id,
                    category_name: obj.category_name,
                    category_image:obj.category_image,
                    category_is_active: obj.is_active,
                    category_created_at: obj.created_at,
                    category_updated_at:  obj.updated_at,
                    sub_categories: (obj.sub_category_id) ? [
                        {
                            sub_category_id: obj.sub_category_id,
                            sub_category_name: obj.sub_category_name,
                            sub_category_image:obj.sub_category_image,
                            sub_category_is_active: obj.sub_category_is_active,
                            sub_category_updated_at: obj.sub_category_updated_at,
                            sub_category_created_at: obj.sub_category_created_at,
                        }
                    ] : []
                }
            }

        });

        const data =  Object.values(responseData);

        res.status(200).json(responseStructure(true,"Successfully Fetch Categories",JSON.stringify({data:data})));

    } catch (error) {
        res.status(500).json(getCustomCatchBlockResponseStructure(error));
    }
} 