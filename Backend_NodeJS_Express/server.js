const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser'); // Don't forget to require body-parser

require('dotenv').config();

const app = express();
const cors = require('cors');
const imageRoutes = require('./routes/imageRoutes');
const objetRoutes = require('./routes/objetRoutes');
let bodyParser = require('body-parser');
let user = require('./routes/user');
let middleware = require('./utils/tokenVerify');
mongoose.Promise = global.Promise;

const uri = 'mongodb+srv://ravaka:ravaka@cluster0.o8xl4n2.mongodb.net/transversale?retryWrites=true&w=majority&appName=Cluster0'; 

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(uri, options).then(() => {
    console.log('Connected to MongoDB');
    console.log("at URI = " + uri);
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use('/api/images', imageRoutes);
app.use('/api/objets', objetRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/categories', categorieRoutes);

const PORT = process.env.PORT || 3000;

const prefix = '/api';

app.route(prefix + '/auth/login')
  .post(user.login)
  
app.route(prefix + '/auth/register')
  .post(user.register)

app.route(prefix + '/auth/logout')
  .get(middleware.verifyToken, user.logout)

app.route(prefix + '/auth/me')
  .get(middleware.verifyToken, user.getUserConnected)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;