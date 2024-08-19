const express = require('express');
const router = express.Router();
const echangeController = require('../controllers/EchangeController');

router.post('/', echangeController.createEchange);
router.get('/lisesobjetsouhaites/:utilisateur_id' ,echangeController.getEchangesByUtilisateur);
module.exports = router;