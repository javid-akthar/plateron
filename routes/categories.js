const express = require('express');
const router = express.Router();
const catergories = require('../controllers/catergoriesController.js');


// router for category page page
router.get('/:categoryid', catergories.categoriesList);


module.exports = router;