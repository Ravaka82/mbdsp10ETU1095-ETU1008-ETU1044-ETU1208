const express = require('express');
const router = express.Router();
const echangeController = require('../controllers/EchangeController');

router.post('/', echangeController.createEchange);
router.get('/lisesobjetsouhaites/:utilisateur_id' ,echangeController.getEchangesByUtilisateur);
router.delete('/:echange_id', echangeController.deleteEchange);
router.put('/:echange_id', echangeController.updateEchange);
module.exports = router;