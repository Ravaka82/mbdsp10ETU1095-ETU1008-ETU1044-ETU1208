const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

require('dotenv').config();

const app = express();
const imageRoutes = require('./routes/imageRoutes');
const objetRoutes = require('./routes/objetRoutes');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const categorieRoutes = require('./routes/categorieRoutes');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

app.use(express.json());


app.use(cors());

app.use('/api/images', imageRoutes);
app.use('/api/objets', objetRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/categories', categorieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
