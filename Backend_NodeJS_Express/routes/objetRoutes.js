const express = require('express');
const router = express.Router();
const objetController = require('../controllers/objetController');
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/', objetController.getAllObjets);
router.post('/', upload.single('image'), objetController.createObjet);
router.put('/:id', objetController.updateObjet);
router.delete('/:id', objetController.deleteObjet);
router.get('/DetailsObjet/:id', objetController.findObjetById);
router.get('/FindObjetParCategorie/:nomCategorie', objetController.getObjetParCategorie);
router.get('/RechercheSimple', objetController.RechercheObjetsParTitre);
router.post('/rechercheAvance', objetController.rechercheAvanceObjets);
router.get('/FindAllImageObject', objetController.getAllImageObject );
module.exports = router;
