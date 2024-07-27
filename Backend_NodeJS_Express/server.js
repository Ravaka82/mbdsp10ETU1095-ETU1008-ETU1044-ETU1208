const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser'); // Don't forget to require body-parser

require('dotenv').config();

const app = express();
const cors = require('cors');
const imageRoutes = require('./routes/imageRoutes');
const objetRoutes = require('./routes/objetRoutes');

let middleware = require('./utils/tokenVerify');
mongoose.Promise = global.Promise;
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const categorieRoutes = require('./routes/categorieRoutes');


const uri = 'mongodb+srv://nandrianinaomega:OXhB6mZhekyTqMvJ@tpt-mbds-p10.xb170xn.mongodb.net/?retryWrites=true&w=majority&appName=tpt-mbds-p10'

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


// Use the cors middleware
app.use(cors({
    origin: '*', // Replace '*' with your frontend URL for better security
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use('/api/images', imageRoutes);
app.use('/api/objets', objetRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/categories', categorieRoutes);

const PORT = process.env.PORT || 3000;

const prefix = '/api';

app.use(prefix + '/auth',user);
  


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;