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
        const objetAcceptant= await Objet.findById(objet_acceptant);
        if (!objetAcceptant) {
            return res.status(404).json({ message: 'Objet acceptant not found' });
        }
        const utilisateur_acceptant_id=objetAcceptant.utilisateur_id;
        
        // Créez un nouvel échange
        const echange = new Echange({
            utilisateur_proposant_id,
            utilisateur_acceptant_id:utilisateur_acceptant_id,
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
const getEchangesByUtilisateur = async (req, res) => {
    const { utilisateur_id } = req.params; // Changer le nom du paramètre ici

    try {
        // Assurez-vous que la méthode find utilise un filtre correct
        const echanges = await Echange.find({ utilisateur_proposant_id: utilisateur_id })
        .populate('objet_proposant')
        .populate('objet_acceptant')
        .populate('utilisateur_proposant_id')
        .populate('utilisateur_acceptant_id');

        if (echanges.length === 0) {
            return res.status(404).json({ message: 'Aucun échange trouvé pour cet utilisateur' });
        }

        res.status(200).json(echanges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteEchange = async (req, res) => {
    const { echange_id } = req.params;

    try {
        const echange = await Echange.findByIdAndDelete(echange_id);

        if (!echange) {
            return res.status(404).json({ message: 'Echange not found' });
        }

        res.status(200).json({ message: 'Echange deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateEchange = async (req, res) => {
    const { echange_id } = req.params;
    const { utilisateur_proposant_id, utilisateur_acceptant_id, objet_proposant, objet_acceptant, statut, date_acceptation } = req.body;

    try {
        const echange = await Echange.findById(echange_id);
        if (!echange) {
            return res.status(404).json({ message: 'Echange not found' });
        }

        if (objet_proposant) {
            const objetPropose = await Objet.findById(objet_proposant);
            if (!objetPropose) {
                return res.status(404).json({ message: 'Objet proposé not found' });
            }
        }

        if (objet_acceptant) {
            const objetAcceptant = await Objet.findById(objet_acceptant);
            if (!objetAcceptant) {
                return res.status(404).json({ message: 'Objet acceptant not found' });
            }
        }

        if (utilisateur_proposant_id) echange.utilisateur_proposant_id = utilisateur_proposant_id;
        if (utilisateur_acceptant_id) echange.utilisateur_acceptant_id = utilisateur_acceptant_id;
        if (objet_proposant) echange.objet_proposant = objet_proposant;
        if (objet_acceptant) echange.objet_acceptant = objet_acceptant;
        if (statut) echange.statut = statut;
        if (date_acceptation) echange.date_acceptation = new Date(date_acceptation);

        const updatedEchange = await echange.save();
        res.status(200).json(updatedEchange);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getEchangeById = async (req, res) => {
    const { echange_id } = req.params;

    try {
        const echange = await Echange.findById(echange_id)
            .populate('objet_proposant')
            .populate('objet_acceptant')
            .populate('utilisateur_proposant_id')
            .populate('utilisateur_acceptant_id');

        if (!echange) {
            return res.status(404).json({ message: 'Echange not found' });
        }

        res.status(200).json(echange);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    createEchange,
    getEchangesByUtilisateur,
    deleteEchange,
    updateEchange,
    getEchangeById
};
