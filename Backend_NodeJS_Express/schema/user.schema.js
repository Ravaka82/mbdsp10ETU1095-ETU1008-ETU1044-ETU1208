var mongoose = require('mongoose');  
let Schema = mongoose.Schema;
var UserSchema = Schema({  
  nom: String,
  prenom: String,
  email: String,
  mot_de_passe: String
});

module.exports = UserSchema;