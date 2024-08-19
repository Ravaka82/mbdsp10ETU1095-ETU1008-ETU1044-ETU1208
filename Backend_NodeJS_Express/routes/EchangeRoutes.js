const express = require('express');
const router = express.Router();
const echangeController = require('../controllers/EchangeController');

router.post('/', echangeController.createEchange);

module.exports = router;