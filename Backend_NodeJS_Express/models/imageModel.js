const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    objet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Objet'
    },
    filename: String,
    date_ajout: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Image', imageSchema);
