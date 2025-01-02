const  express  = require('express');
const router = express.Router();
const {createCategoryController,updateCategoryStatusController,getCategoriesController} = require('../controllers/otherControllers/categoryController')
const {createSubCategoryController,updateSubCategoryStatusController} = require('../controllers/otherControllers/subCategoryController')
const validate  = require('../middlewares/validate');
const {createCategoryValidation,createSubCategoryValidation,updateCategoryStatusValidation,updateSubCategoryStatusValidation} = require('../validations/indexValidation');
const {upload,handleMulterErrors} =  require('../utils/multer');

router.post("/create_category",upload.single('categoryImage'),handleMulterErrors,validate(createCategoryValidation),createCategoryController)

router.post("/create_sub_category",validate(createSubCategoryValidation),createSubCategoryController)

router.post("/manage_category",validate(updateCategoryStatusValidation),updateCategoryStatusController)

router.post("/manage_sub_category",validate(updateSubCategoryStatusValidation),updateSubCategoryStatusController)

router.post("/get_category",getCategoriesController);

module.exports = router;