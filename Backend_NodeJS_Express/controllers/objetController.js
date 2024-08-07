const Objet = require('../models/objetModel');
const Utilisateur = require('../models/utilisateurModel');
const Categorie = require('../models/categorieModel');
const Image = require('../models/imageModel');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;


const getAllObjets = async (req, res) => {
    try {
        const objets = await Objet.find();
        res.json(objets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllImageObject = async (req, res)=> {
    try{
        const images = await Image.find();
        res.json(images);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const streamUpload = (file) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

const createObjet = async (req, res) => {
    const { utilisateur_id, categorie_id, titre, description, statut, etat, valeur_estimee } = req.body;

    if (!utilisateur_id || !categorie_id || !titre || valeur_estimee === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const utilisateur = await Utilisateur.findById(utilisateur_id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur not found' });
        }

        const categorie = await Categorie.findById(categorie_id);
        if (!categorie) {
            return res.status(404).json({ message: 'Categorie not found' });
        }

        let image_url = '';
        if (req.file) {
            try {
                const result = await streamUpload(req.file);
                image_url = result.secure_url;
            } catch (uploadError) {
                return res.status(500).json({ message: 'Error uploading image' });
            }
        }

        const objet = new Objet({
            utilisateur_id,
            categorie_id,
            titre,
            description,
            statut,
            etat,
            valeur_estimee,
            image_url,
        });

        const newObjet = await objet.save();
        res.status(201).json(newObjet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const updateObjet = async (req, res) => {
    try {
        const { utilisateur_id, categorie_id, titre, description, statut, etat, valeur_estimee } = req.body;

        let updateData = {
            utilisateur_id,
            categorie_id,
            titre,
            description,
            statut,
            etat,
            valeur_estimee,
            date_modification: Date.now(),
        };

        if (req.file) {
            const result = await streamUpload(req.file);
            updateData.image_url = result.secure_url;
        }

        const updatedObjet = await Objet.findByIdAndUpdate(
            req.params.id, 
            updateData,    
            { new: true, runValidators: true } 
        );

        if (!updatedObjet) {
            return res.status(404).json({ message: 'Objet not found' });
        }

        res.status(200).json(updatedObjet);
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
const findObjetById = async (req, res) => {
    try {
        const objet = await Objet.findById(req.params.id)
            .populate('categorie_id', 'nom'); 

        if (!objet) {
            return res.status(404).json({ message: 'Objet non trouvé' });
        }

        res.json(objet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//recherche par categorie
const getObjetParCategorie = async (req, res) => {
    try {
        const { nomCategorie } = req.params;

        const categorie = await Categorie.findOne({ nom: nomCategorie });

        if (!categorie) {
            return res.status(404).json({ message: 'Catégorie non trouvée' });
        }
        const objets = await Objet.find({ categorie_id: categorie._id }).populate('categorie_id', 'nom');

        if (objets.length === 0) {
            return res.status(404).json({ message: 'Aucun objet trouvé pour cette catégorie' });
        }

        res.json(objets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Recherche simple
const RechercheObjetsParTitre = async (req, res) => {
    try {
        const { nom } = req.query;

        if (!nom) {
            return res.status(400).json({ message: 'Nom de l\'objet requis' });
        }

        const regex = new RegExp(nom, 'i');

        const objets = await Objet.find({ titre: regex }).populate('categorie_id', 'nom');

        if (objets.length === 0) {
            return res.status(404).json({ message: 'Aucun objet trouvé' });
        }

        res.json(objets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//Recherche avance
const rechercheAvanceObjets = async (req, res) => {
    try {
        const { nomCategorie, titre, statut } = req.body;
        let query = {};

        if (nomCategorie) {
            const categorie = await Categorie.findOne({ nom: nomCategorie });
            if (categorie) {
                query.categorie_id = categorie._id;
            } else {
                return res.status(404).json({ message: 'Catégorie non trouvée' });
            }
        }

        if (titre) {
            query.titre = new RegExp(titre, 'i');
        }

        if (statut) {
            query.statut = statut;
        }

        const objets = await Objet.find(query).populate('categorie_id', 'nom');

        if (objets.length === 0) {
            return res.status(404).json({ message: 'Aucun objet trouvé pour les critères donnés' });
        }

        res.json(objets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllObjets,
    createObjet,
    updateObjet,
    deleteObjet,
    findObjetById,
    getObjetParCategorie,
    RechercheObjetsParTitre,
    rechercheAvanceObjets,
    getAllImageObject
};
