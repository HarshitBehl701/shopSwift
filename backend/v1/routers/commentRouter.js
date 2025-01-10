const express = require('express');
const  router =  express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const validate =  require('../middlewares/validate');
const {createCommentValidation,updateCommentStatusValidation} = require('../validations/commentValidation')
const {createCommentController,changeCommentStatusController} = require('../controllers/commentControllers/commentController');

router.post('/create-comment/:productId/:orderId',isLoggedIn,validate(createCommentValidation),createCommentController);

router.post('/comment-status-update/:productId/:orderId',isLoggedIn,validate(updateCommentStatusValidation),changeCommentStatusController);

module.exports = router;