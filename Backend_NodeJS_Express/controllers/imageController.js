const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const Image = require('../models/imageModel');
const Objet = require('../models/objetModel');

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

exports.uploadImage = async (req, res) => {
    try {
        const objet = await Objet.findById(req.body.objet_id);
        if (!objet) {
            return res.status(404).json({ message: 'Objet not found' });
        }

        const result = await streamUpload(req.file);

        const newImage = new Image({
            objet_id: req.body.objet_id,
            filename: req.file.originalname
        });

        await newImage.save();

        res.status(200).json(newImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
