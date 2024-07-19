var mongoose = require('mongoose');  
let Schema = mongoose.Schema;
var UserSchema = Schema({  
  nom: String,
  email: String,
  password: String,
  role : Number
});

module.exports = UserSchema;