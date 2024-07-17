const Objet = require('../models/objetModel');
const Utilisateur = require('../models/utilisateurModel');
const Categorie = require('../models/categorieModel');


const getAllObjets = async (req, res) => {
    try {
        const objets = await Objet.find();
        res.json(objets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const createObjet = async (req, res) => {
    const { utilisateur_id, categorie_id, titre, description, statut } = req.body;

    try {
        const utilisateur = await Utilisateur.findById(utilisateur_id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur not found' });nen
        }


        const categorie = await Categorie.findById(categorie_id);
        if (!categorie) {
            return res.status(404).json({ message: 'Categorie not found' });
        }

        const objet = new Objet({
            utilisateur_id,
            categorie_id,
            titre,
            description,
            statut
        });

        const newObjet = await objet.save();
        res.status(201).json(newObjet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const updateObjet = async (req, res) => {
    try {
        const objet = await Objet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!objet) {
            return res.status(404).json({ message: 'Objet not found' });
        }
        res.json(objet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteObjet = async (req, res) => {
    try {
        const objet = await Objet.findByIdAndDelete(req.params.id);
        if (!objet) {
            return res.status(404).json({ message: 'Objet not found' });
        }
        res.json({ message: 'Objet deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getAllObjets,
    createObjet,
    updateObjet,
    deleteObjet,
};
