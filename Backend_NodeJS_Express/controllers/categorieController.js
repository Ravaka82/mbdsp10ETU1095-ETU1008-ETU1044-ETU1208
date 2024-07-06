const Categorie = require('../models/categorieModel');


const getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getCategorie = async (req, res) => {
    res.json(res.categorie);
};

const getCategorieById = async (req, res, next) => {
    try {
        const categorie = await Categorie.findById(req.params.id);
        if (categorie == null) {
            return res.status(404).json({ message: 'Categorie not found' });
        }
        res.categorie = categorie;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const createCategorie = async (req, res) => {
    const categorie = new Categorie({
        nom: req.body.nom
    });

    try {
        const newCategorie = await categorie.save();
        res.status(201).json(newCategorie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllCategories,
    getCategorie,
    getCategorieById,
    createCategorie
};
