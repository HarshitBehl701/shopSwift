const express  = require('express');
const router =  express.Router();
const { registerController , loginController} = require("../controllers/userAuthController");
const {registerSchema, loginSchema}  = require('../validations/userValidation');
const validate = require('../middlewares/validate');

router.post('/register',validate(registerSchema),registerController);

router.post('/login',validate(loginSchema),loginController);

module.exports  =  router;