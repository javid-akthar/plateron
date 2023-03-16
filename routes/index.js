const express = require('express');
const router = express.Router();

console.log('router loaded');


// router for sheduleDiscount page
router.use('/sheduleDiscount',require('./sheduleDiscount.js'));

// router for categories page
router.use('/categories',require('./categories.js'));

module.exports = router;