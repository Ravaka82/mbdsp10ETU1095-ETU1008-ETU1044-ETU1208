const Utilisateur = require('../models/utilisateurModel');

const getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.find();
        res.json(utilisateurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUtilisateur = async (req, res) => {
    res.json(res.utilisateur);
};

const createUtilisateur = async (req, res) => {
    const utilisateur = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        mot_de_passe: req.body.mot_de_passe,
        adresse: req.body.adresse,
        ville: req.body.ville,
        code_postal: req.body.code_postal
    });

    try {
        const newUtilisateur = await utilisateur.save();
        res.status(201).json(newUtilisateur);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const getUtilisateurById = async (req, res, next) => {
    try {
        const utilisateur = await Utilisateur.findById(req.params.id);
        if (utilisateur == null) {
            return res.status(404).json({ message: 'Utilisateur not found' });
        }
        res.utilisateur = utilisateur;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllUtilisateurs,
    getUtilisateur,
    createUtilisateur,
    getUtilisateurById
};
