const express  =  require('express');
const router =  express.Router();
const {sellerRegistration,sellerLogin} =  require('../controllers/sellerAuthController');

router.post('/register',sellerRegistration);
router.post('/login',sellerLogin);

module.exports  = router;