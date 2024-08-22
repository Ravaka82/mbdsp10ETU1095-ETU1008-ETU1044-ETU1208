const Echange = require('../models/echangeModel');
const Objet = require('../models/objetModel');
const Utilisateur = require('../models/utilisateurModel');
const nodemailer = require('nodemailer');

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
        const echanges = await Echange.find({ utilisateur_proposant_id: utilisateur_id,statut: 'en cours' })
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
const getEchangeEnAttente = async (req, res) => {
    const { utilisateur_id } = req.params; // Changer le nom du paramètre ici

    try {
        // Assurez-vous que la méthode find utilise un filtre correct
        const echanges = await Echange.find({ utilisateur_acceptant_id: utilisateur_id,statut: 'en attente' })
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


const sendEmail = async (from, to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: from.email,
            pass: from.password
        }
    });

    const mailOptions = {
        from: from.email,
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};

const sendEchangeEmail = async (req, res) => {
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

        const utilisateurProposant = await Utilisateur.findById(echange.utilisateur_proposant_id);
        const utilisateurAcceptant = await Utilisateur.findById(echange.utilisateur_acceptant_id);
        const objetPropose = await Objet.findById(echange.objet_proposant);
        const objetAcceptant = await Objet.findById(echange.objet_acceptant);

        if (!utilisateurProposant || !utilisateurAcceptant || !objetPropose || !objetAcceptant) {
            return res.status(404).json({ message: 'One or more related entities not found' });
        }

        const emailContent = `
            Bonjour ${utilisateurAcceptant.nom},

            Vous avez reçu une proposition d'échange :

            Objet proposé : ${objetPropose.nom}
            Objet acceptant : ${objetAcceptant.nom}

            Veuillez consulter les détails et répondre à la proposition.

            Cordialement,
            Votre Équipe
        `;

        await sendEmail(
            {
                email: utilisateurProposant.email,
                password: utilisateurProposant.emailPassword 
            },
            utilisateurAcceptant.email,
            'Proposition d\'échange',
            emailContent
        );
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

const updateEchangeStatut = async (req, res) => {
    const { echange_id } = req.params;
    const { statut } = req.body;

    try {
        if (statut !== 'en attente') {
            return res.status(400).json({ message: 'Le statut doit être "en attente"' });
        }

        const echange = await Echange.findById(echange_id);
        if (!echange) {
            return res.status(404).json({ message: 'Echange not found' });
        }

        echange.statut = statut;

        const updatedEchange = await echange.save();
        res.status(200).json(updatedEchange);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateEchangeStatutEnValidatation= async (req, res) => {
    const { echange_id } = req.params;
    const { statut } = req.body;

    try {
        const echange = await Echange.findById(echange_id);
        if (!echange) {
            return res.status(404).json({ message: 'Echange not found' });
        }
        
        // Update statut and date_acceptation
        echange.statut = statut;
        echange.date_acceptation = Date.now();

        const updatedEchange = await echange.save();
        res.status(200).json(updatedEchange);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getHistoriqueEchanges = async (req, res) => {
    const { utilisateur_id } = req.params;

    try {
        const echanges = await Echange.find({
            utilisateur_proposant_id: utilisateur_id,
            statut: { $in: ['accepter', 'refuser'] }
        })
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


const countEchangesAccepted = async (req, res) => {
    try {
        const count = await Echange.countDocuments({ statut: 'accepter' });
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const countEchangesRefused = async (req, res) => {
    try {
        const count = await Echange.countDocuments({ statut: 'refuser' });
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const countEchangesEnAttente = async (req, res) => {
    try {
        const count = await Echange.countDocuments({ statut: 'en attente' });
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const countEchangesEnCours = async (req, res) => {
    try {
        const count = await Echange.countDocuments({ statut: 'en cours' });
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllEchanges = async (req, res) => {
    try {
    
        const echanges = await Echange.find({})
            .populate('objet_proposant') 
            .populate('objet_acceptant') 
            .populate('utilisateur_proposant_id') 
            .populate('utilisateur_acceptant_id'); 

        if (echanges.length === 0) {
            return res.status(404).json({ message: 'Aucun échange trouvé' });
        }

        res.status(200).json(echanges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getStatistiquesEchanges = async (req, res) => {
    try {

        const exchanges = await Echange.find()
            .populate('utilisateur_proposant_id', 'nom') 
            .exec();

        const statistiques = exchanges.reduce((acc, exchange) => {
            const userId = exchange.utilisateur_proposant_id._id.toString();
            if (!acc[userId]) {
                acc[userId] = {
                    utilisateur_id: userId,
                    nom: exchange.utilisateur_proposant_id.nom,
                    echanges: {
                        accepte: 0,
                        refuse: 0,
                        en_cours: 0,
                        en_attente: 0
                    }
                };
            }
            switch (exchange.statut) {
                case 'accepter':
                    acc[userId].echanges.accepte += 1;
                    break;
                case 'refuser':
                    acc[userId].echanges.refuse += 1;
                    break;
                case 'en cours':
                    acc[userId].echanges.en_cours += 1;
                    break;
                case 'en attente':
                    acc[userId].echanges.en_attente += 1;
                    break;
            }
            return acc;
        }, {});

        // Convertir l'objet en tableau
        const result = Object.values(statistiques);

        res.json({ utilisateurs: result });
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};


module.exports = {
    createEchange,
    getEchangesByUtilisateur,
    deleteEchange,
    updateEchange,
    getEchangeById,
    sendEchangeEmail,
    updateEchangeStatut,
    getEchangeEnAttente,
    updateEchangeStatutEnValidatation,
    getHistoriqueEchanges,
    countEchangesAccepted,
    countEchangesRefused,
    countEchangesEnAttente,
    countEchangesEnCours,
    getAllEchanges,
    getStatistiquesEchanges

};
