const express  = require('express');
const router =  express.Router();
const { registerController , loginController , getUserController,updateUserController ,uploadProfilePicController ,manageUserCartController,manageUserWhislistController} = require("../controllers/userControllers/userController");
const {registerSchema, loginSchema , updateUserSchema , profilePicSchema,manageCartSchema,manageWhislistSchema}  = require('../validations/userValidation');
const validate = require('../middlewares/validate');
const isLoggedIn = require('../middlewares/isLoggedIn');
const {upload,handleMulterErrors} =  require('../utils/multer');

router.post('/register',validate(registerSchema),registerController);

router.post('/login',validate(loginSchema),loginController);

router.post('/get-user',isLoggedIn,getUserController);

router.post('/manage-cart',isLoggedIn,validate(manageCartSchema),manageUserCartController);

router.post('/manage-wishlist',isLoggedIn,validate(manageWhislistSchema),manageUserWhislistController);

router.post('/update-user', isLoggedIn , validate(updateUserSchema) ,updateUserController);

router.post('/upload-photo',isLoggedIn,validate(profilePicSchema),upload.single('profilePic'),handleMulterErrors,uploadProfilePicController);

module.exports  =  router;