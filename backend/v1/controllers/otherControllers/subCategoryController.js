const subCategoryModal  = require('../../models/subCategoryModal');
const categoryModal  = require('../../models/categoryModal');

module.exports.createSubCategoryController = async  (req,res)  =>  {
    try{
        const {categoryId,subCategoryname} = req.body;

        const category =   await categoryModal.findOne({_id: categoryId});

        if(!category) return res.status(400).send({message: "Invalid  Request",status: false});

        const subCategoryExists  =  await subCategoryModal.findOne({category:  category._id,name: subCategoryname});

        if(subCategoryExists) return res.status(400).send({message: "Invalid  Request",status: false});

        const subCategory  = await subCategoryModal.create({
            name:  subCategoryname,
            category:  categoryId
        })

        return res.status(201).send({message: "Sub-Category  Created Successfully",status: true});

    }catch(error){
        return  res.status(500).send({message: "Internal Server   Error",status:false});
    }   
}

module.exports.updateSubCategoryStatusController  = async (req,res)  => {
    try{

        const  {categoryId,subCategoryname,currentStatus} = req.body;

        const subCategory  = await subCategoryModal.findOne({name:subCategoryname,is_active: currentStatus});

        if(!subCategory) return res.status(400).send({message: "Sub Category  Not Found",status:false});

        const category  = await categoryModal.findOne({_id: categoryId});

        if(!category) return res.status(400).send({message: "Category  Not Exists",status:false});


        subCategory.is_active  = (currentStatus  == 1)  ? 0 : 1;
        await subCategory.save();

        if(subCategory.is_active   == 1){
            category.subCategory.push(subCategory._id);
           await category.save();
        }else if(subCategory.is_active == 0){
            category.subCategory = category.subCategory.filter((id) =>  id.toString() != subCategory._id.toString());
            await category.save();
        }

        return res.status(200).send({message: "Sub Category Status  Updated Successfully",status: true});

    }catch(error){  
        return res.status(200).send({message: "Internal Server Error",status:false});
    }
}