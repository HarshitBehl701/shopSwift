const express  = require('express');
const router =  express.Router();
const { registerController , loginController} = require("../controllers/userControllers/userAuthController");
const {registerSchema, loginSchema}  = require('../validations/userValidation');
const validate = require('../middlewares/validate');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.post('/register',validate(registerSchema),registerController);

router.post('/login',validate(loginSchema),loginController);

module.exports  =  router;