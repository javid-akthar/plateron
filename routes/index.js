const express = require('express');
const router = express.Router();

console.log('router loaded');


// router for user page
router.use('/sheduleDiscount',require('./sheduleDiscount.js'));

// router for student page
router.use('/categories',require('./categories.js'));

module.exports = router;