const express =  require('express');
const router = express.Router();
const  isLoggedIn = require('../middlewares/isLoggedIn');
const {createProductValidation,updateStatusProductValidation} = require('../validations/productValidation');
const {createProduct , getAllProducts , getSellerProducts,updateStatusProductController,getProductDetails} = require('../controllers/productControllers/productController');
const validate  =  require('../middlewares/validate');
const {upload,handleMulterErrors}  = require('../utils/multer');

router.post('/get_products',getAllProducts);

router.post('/get_product/:productId',getProductDetails);

router.post('/get_seller_products/:type',isLoggedIn,getSellerProducts);

router.post('/create-product',isLoggedIn,upload.array("files"),handleMulterErrors ,validate(createProductValidation),createProduct)

router.post("/change-status-product",isLoggedIn,validate(updateStatusProductValidation),updateStatusProductController);

module.exports = router;