const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: String,
    cloudinary_id: String,
});

module.exports = mongoose.model('Image', imageSchema);
