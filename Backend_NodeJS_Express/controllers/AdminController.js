const Admin = require('../models/AdminModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


const createAdmin = async (req, res) => {
    const { nom, email, mot_de_passe } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const newAdmin = new Admin({
            nom,
            email,
            mot_de_passe: hashedPassword
        });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
const loginAdmin = async (req, res) => {
    const { email, mot_de_passe } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }

        const isPasswordValid = await bcrypt.compare(mot_de_passe, admin.mot_de_passe);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, config.secret, {
            expiresIn: 86400 
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                nom: admin.nom,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
module.exports = {
    createAdmin,
    loginAdmin
};
