const express = require('express');
const router = express.Router();
const sheduleDiscount = require('../controllers/sheduleDiscountController.js');


// router for signup page
router.post('/', sheduleDiscount.sheduleDiscount);


module.exports = router;