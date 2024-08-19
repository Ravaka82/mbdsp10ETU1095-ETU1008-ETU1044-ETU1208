const Echange = require('../models/echangeModel');
const Objet = require('../models/objetModel');
const Utilisateur = require('../models/utilisateurModel');

const createEchange = async (req, res) => {
    const { utilisateur_proposant_id, objet_proposant, objet_acceptant } = req.body;

    try {
        // Vérifiez que l'utilisateur proposé existe
        const utilisateur = await Utilisateur.findById(utilisateur_proposant_id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur not found' });
        }

        // Vérifiez que l'objet proposé existe
        const objetPropose = await Objet.findById(objet_proposant);
        if (!objetPropose) {
            return res.status(404).json({ message: 'Objet proposé not found' });
        }

        // Créez un nouvel échange
        const echange = new Echange({
            utilisateur_proposant_id,
            objet_proposant,
            objet_acceptant,
            date_proposition: new Date(),
            statut: 'en cours'
        });

        // Sauvegardez l'échange et envoyez la réponse
        const savedEchange = await echange.save();
        res.status(201).json(savedEchange);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createEchange
};
