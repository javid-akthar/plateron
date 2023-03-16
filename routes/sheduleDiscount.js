const express = require('express');
const router = express.Router();
const sheduleDiscount = require('../controllers/sheduleDiscountController.js');


// calling sheduleDiscount controller
router.post('/', sheduleDiscount.sheduleDiscount);


module.exports = router;