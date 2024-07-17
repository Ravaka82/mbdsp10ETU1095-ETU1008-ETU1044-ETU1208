const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

router.get('/', utilisateurController.getAllUtilisateurs);
router.post('/', utilisateurController.createUtilisateur);

module.exports = router;