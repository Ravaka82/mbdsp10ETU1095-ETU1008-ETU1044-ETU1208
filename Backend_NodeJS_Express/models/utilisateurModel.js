const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mot_de_passe: {
        type: String,
        required: true
    },
    adresse: String,
    ville: String,
    code_postal: String,
    date_creation: {
        type: Date,
        default: Date.now
    },
    date_modification: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
