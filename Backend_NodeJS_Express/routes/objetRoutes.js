const express = require('express');
const router = express.Router();
const objetController = require('../controllers/objetController');

router.get('/', objetController.getAllObjets);
router.post('/', objetController.createObjet);
router.put('/:id', objetController.updateObjet);
router.delete('/:id', objetController.deleteObjet);
router.get('/DetailsObjet/:id', objetController.findObjetById);
router.get('/FindObjetParCategorie/:nomCategorie', objetController.getObjetParCategorie);

module.exports = router;
