const express =  require('express');
const router  =  express.Router();
const  {createOrderSchema} = require('../validations/orderValidation');
const isLoggedIn  =  require('../middlewares/isLoggedIn');
const  validate  = require('../middlewares/validate');
const  {createUserOrderController,getUserAllOrdersController,getUserOrderDetailController} =  require('../controllers/orderControllers/orderController');


router.post('/create-order',isLoggedIn,validate(createOrderSchema),createUserOrderController);

router.post('/user-orders',isLoggedIn,getUserAllOrdersController);

router.post('/user-order/:orderId',isLoggedIn,getUserOrderDetailController);

module.exports  =  router;