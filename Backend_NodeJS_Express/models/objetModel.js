const mongoose = require('mongoose');

const objetSchema = new mongoose.Schema({
    utilisateur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
    categorie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    titre: {
        type: String,
        required: true
    },
    description: String,
    date_creation: {
        type: Date,
        default: Date.now
    },
    date_modification: {
        type: Date,
        default: Date.now
    },
    statut: {
        type: String,
        enum: ['disponible', 'réservé', 'échangé'],
        default: 'disponible'
    },
    image_url: {
        type: String
    }
});

module.exports = mongoose.model('Objet', objetSchema);
