const Utilisateur = require('../models/utilisateurModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

const getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.find();
        res.json(utilisateurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUtilisateur = async (req, res) => {
    res.json(res.utilisateur);
};

const createUtilisateur = async (req, res) => {
    const utilisateur = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        mot_de_passe: req.body.mot_de_passe,
        adresse: req.body.adresse,
        ville: req.body.ville,
        code_postal: req.body.code_postal
    });

    try {
        const newUtilisateur = await utilisateur.save();
        res.status(201).json(newUtilisateur);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const getUtilisateurById = async (req, res, next) => {
    try {
        const utilisateur = await Utilisateur.findById(req.params.id);
        if (utilisateur == null) {
            return res.status(404).json({ message: 'Utilisateur not found' });
        }
        res.utilisateur = utilisateur;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
async function inscription(req, res) {
  try {

      if (!req.body.nom || !req.body.prenom || !req.body.email || !req.body.mot_de_passe) {
          return res.status(400).send("All fields are required.");
      }

  
      const { latitude, longitude } = req.body;
      if (latitude === undefined || longitude === undefined) {
          return res.status(400).send("Latitude and longitude are required.");
      }

    
      const hashedPassword = await bcrypt.hash(req.body.mot_de_passe, 8);

     
      const user = await Utilisateur.create({
          nom: req.body.nom,
          prenom: req.body.prenom,
          email: req.body.email,
          mot_de_passe: hashedPassword,
          position: {
              type: 'Point',
              coordinates: [longitude, latitude] // [longitude, latitude]
          }
      });

     
      const token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // 24 heures
      });

   
      res.status(200).send({ auth: true, token: token });
  } catch (err) {
      console.error(err);
      res.status(500).send("There was a problem registering the user.");
  }
}

  async function getUserConnected(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
      }
  
      const token = authHeader.split(' ')[1];
  
      if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
      }
  
      const decoded = jwt.verify(token, config.secret);
  
      const user = await Utilisateur.findById(decoded.id, { mot_de_passe: 0 }); // Exclude password from the result
  
      if (!user) {
        return res.status(404).send("No user found.");
      }
  
      res.status(200).send(user);
    } catch (err) {
      console.error(err);
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      res.status(500).send("There was a problem finding the user.");
    }
  }
  async function login(req, res) {
    try {
      // Find user by email
      const user = await Utilisateur.findOne({ email: req.body.email });
  
      // Check if user exists
      if (!user) {
        return res.status(404).send('No user found.');
      }
  
      // Validate password
      const passwordIsValid = await bcrypt.compare(req.body.mot_de_passe, user.mot_de_passe);
      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
      }
  
      // Create token
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
  
      // Send response
      res.status(200).send({ auth: true, token: token });
    } catch (err) {
      // Handle errors
      console.error(err);
      res.status(500).send('Error on the server.');
    }
  }
  const logout= async (req, res) => {
    res.status(200).send({ auth: false, token: null });
}
const deleteUser = async (req, res) => {
  try {
      const utilisateur = await Utilisateur.findByIdAndDelete(req.params.id);
      if (!utilisateur) {
          return res.status(404).json({ message: 'Utilisateur not found' });
      }
      res.status(200).json({ message: 'Utilisateur deleted successfully' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
const countUtilisateurs = async (req, res) => {
  try {
      const count = await Utilisateur.countDocuments();
      res.status(200).json({ count });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
module.exports = {
    getAllUtilisateurs,
    getUtilisateur,
    createUtilisateur,
    getUtilisateurById,
    getUserConnected,inscription,login,logout,
    deleteUser,
    countUtilisateurs
};
