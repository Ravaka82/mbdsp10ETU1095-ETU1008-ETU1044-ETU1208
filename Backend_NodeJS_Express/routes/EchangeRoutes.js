const express = require('express');
const router = express.Router();
const echangeController = require('../controllers/EchangeController');

router.post('/', echangeController.createEchange);
router.get('/lisesobjetsouhaites/:utilisateur_id' ,echangeController.getEchangesByUtilisateur);
router.delete('/:echange_id', echangeController.deleteEchange);
router.put('/:echange_id', echangeController.updateEchange);
router.get('/:echange_id', echangeController.getEchangeById);
router.post('/email/:echange_id', echangeController.sendEchangeEmail);
router.put('/statut/:echange_id', echangeController.updateEchangeStatut);
router.get('/EchangePropose/:utilisateur_id', echangeController.getEchangeEnAttente);
router.put('/echange/:echange_id/statut', echangeController.updateEchangeStatutEnValidatation);
router.get('/historique/:utilisateur_id', echangeController.getHistoriqueEchanges);

module.exports = router;