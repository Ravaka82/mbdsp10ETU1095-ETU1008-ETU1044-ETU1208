const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

let middleware = require('../utils/tokenVerify');

router.get('/', utilisateurController.getAllUtilisateurs);
router.post('/', utilisateurController.createUtilisateur);
router.post('/login',utilisateurController.login);
router.post('/register',utilisateurController.inscription);
router.post('/logout').get(middleware.verifyToken,utilisateurController.logout);
router.get('/me', middleware.verifyToken, utilisateurController.getUserConnected);
router.delete('/:id', utilisateurController.deleteUser);
module.exports = router;