const express  =  require('express');
const router =  express.Router();
const {sellerRegistration,sellerLogin} =  require('../controllers/sellerControllers/sellerAuthController');
const {registerSellerSchema,loginSellerSchema} = require('../validations/sellerValidation');
const validate = require('../middlewares/validate');

router.post('/register',validate(registerSellerSchema),sellerRegistration);
router.post('/login',validate(loginSellerSchema),sellerLogin);

module.exports  = router;