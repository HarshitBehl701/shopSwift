const express  = require('express');
const router =  express.Router();
const { registerController , loginController , getUserController,updateUserController ,uploadProfilePicController} = require("../controllers/userControllers/userController");
const {registerSchema, loginSchema , updateUserSchema , profilePicSchema}  = require('../validations/userValidation');
const validate = require('../middlewares/validate');
const isLoggedIn = require('../middlewares/isLoggedIn');
const {upload,handleMulterErrors} =  require('../utils/multer');

router.post('/register',validate(registerSchema),registerController);

router.post('/login',validate(loginSchema),loginController);

router.post('/get-user',isLoggedIn,getUserController);

router.post('/update-user', isLoggedIn , validate(updateUserSchema) ,updateUserController);

router.post('/upload-photo',isLoggedIn,validate(profilePicSchema),upload.single('profilePic'),handleMulterErrors,uploadProfilePicController);

module.exports  =  router;