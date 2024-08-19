const mongoose = require('mongoose');

const echangeSchema = new mongoose.Schema({
    utilisateur_proposant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
    utilisateur_acceptant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'utilisateur'
    },
    objet_proposant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'objet',
        required: true
    },
    objet_acceptant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'objet',
        required: true
    },
    date_proposition:{
        type: Date
    },
    date_acceptation: {
        type: Date
    },
    statut: {
        type: String
    },
    
});
const Echange = mongoose.model('Echange', echangeSchema);
module.exports = Echange;