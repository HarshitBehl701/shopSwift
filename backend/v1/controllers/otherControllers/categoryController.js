const categoryModal =  require('../../models/categoryModal');
const subCategoryModal =  require('../../models/subCategoryModal');

module.exports.createCategoryController = async  (req,res) => {
    try{
        const   {categoryname}   = req.body;

        if (!req.files || req.files.length === 0)
            return res
              .status(400)
              .send({ message: "Category  Image  Not  Found", status: false });

        const categoryExists  = await categoryModal.findOne({name:categoryname});

        if(categoryExists)  return res.status(400).send({message: "Category  Already  Exists",status:false});

        const category  = await  categoryModal.create({
            name: categoryname,
            image: req.storedFileName[0]
        })

        return res.status(201).send({message:  "Category Created  Successfully",status: true});

    }catch(error){
        return res.status(500).send({message: "Internal Server  Error",status: false});
    }
}

module.exports.updateCategoryStatusController  = async (req,res)  => {
    try{

        const  {categoryname,currentStatus} = req.body;

        const category  = await categoryModal.findOne({name:categoryname,is_active: currentStatus});

        if(!category) return res.status(400).send({message: "Category  Not Found",status:false});

        category.is_active  = (currentStatus   == 1)  ? 0 : 1;
        await category.save();

        return res.status(200).send({message: "Category Status  Updated Successfully",status: true});

    }catch(error){  
        return res.status(200).send({message: "Internal Server Error",status:false});
    }
}

module.exports.getCategoriesController =  async (req,res) => {
    try{
        const  categories  = await categoryModal.find({is_active:1}).populate({
            path: 'subCategory',
            select: 'name'
          });

        if(!categories)   return res.status(404).send({message: "Resource  Not Found",status:false});

        return res.status(200).send({message: "Resource   found",status:true,data:categories});

    }catch(error){
        return res.status(500).send({message: "Internal Server  Error",status:false});  
    }
}