const express =  require('express');
const router  =  express.Router();
const  {createOrderSchema,updateOrderStatusSchema,updateRatingSchema} = require('../validations/orderValidation');
const isLoggedIn  =  require('../middlewares/isLoggedIn');
const  validate  = require('../middlewares/validate');
const  {createUserOrderController,getUserAllOrdersController,getUserOrderDetailController,updateOrderStatusBySeller,updateRatingController} =  require('../controllers/orderControllers/orderController');


router.post('/create-order',isLoggedIn,validate(createOrderSchema),createUserOrderController);

router.post('/user-orders',isLoggedIn,getUserAllOrdersController);

router.post('/user-order/:orderId',isLoggedIn,getUserOrderDetailController);

router.post('/update-rating/:productId/:orderId',isLoggedIn,validate(updateRatingSchema),updateRatingController);

router.post('/seller-update-order-status/:orderId',isLoggedIn,validate(updateOrderStatusSchema),updateOrderStatusBySeller);

module.exports  =  router;