const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    nom: {
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
});

module.exports = mongoose.model('Admin', AdminSchema);
