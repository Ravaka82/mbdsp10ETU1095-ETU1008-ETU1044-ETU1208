const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.post('/createAdmin', AdminController.createAdmin);
router.post('/loginAdmin', AdminController.loginAdmin);
module.exports = router;