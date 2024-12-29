const express  =  require('express');
const router =  express.Router();
const {sellerRegistration,sellerLogin,getSellerController,updateSellerController,uploadProfilePicController} =  require('../controllers/sellerControllers/sellerController');
const {registerSellerSchema,loginSellerSchema,updateSellerSchema,profilePicSchema} = require('../validations/sellerValidation');
const validate = require('../middlewares/validate');
const  isLoggedIn = require('../middlewares/isLoggedIn');
const {upload} =  require('../utils/multer');

router.post('/register',validate(registerSellerSchema),sellerRegistration);
router.post('/login',validate(loginSellerSchema),sellerLogin);
router.post('/get-user',isLoggedIn,getSellerController);
router.post('/update-user', isLoggedIn , validate(updateSellerSchema) ,updateSellerController);
router.post('/upload-photo',isLoggedIn,validate(profilePicSchema),upload.single('profilePic'),uploadProfilePicController);

module.exports  = router;