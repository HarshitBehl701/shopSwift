const express =  require('express');
const router = express.Router();
const  isLoggedIn = require('../middlewares/isLoggedIn');
const {createProductValidation} = require('../validations/productValidation');
const {createProduct , getAllProducts , getProduct} = require('../controllers/productControllers/productController');
const validate  =  require('../middlewares/validate');

router.post('/products',getAllProducts);

router.post('/product',getProduct);

router.post('/create-product',isLoggedIn ,validate(createProductValidation),createProduct)


module.exports = router;