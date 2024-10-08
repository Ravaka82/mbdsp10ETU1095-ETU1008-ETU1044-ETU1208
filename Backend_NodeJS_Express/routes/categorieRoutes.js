const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

router.get('/', categorieController.getAllCategories);
router.post('/', categorieController.createCategorie);

module.exports = router;