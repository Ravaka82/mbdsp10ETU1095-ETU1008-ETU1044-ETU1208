const express = require('express');
const router = express.Router();
const objetController = require('../controllers/objetController');

router.get('/', objetController.getAllObjets);
router.post('/', objetController.createObjet);
router.put('/:id', objetController.updateObjet);
router.delete('/:id', objetController.deleteObjet);

module.exports = router;
