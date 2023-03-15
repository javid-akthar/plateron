const express = require('express');
const router = express.Router();
const catergories = require('../controllers/catergoriesController.js');


// router for signup page
router.get('/:categoryid', catergories.categoriesList);


module.exports = router;