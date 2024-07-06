require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const imageRoutes = require('./routes/imageRoutes');
const objetRoutes = require('./routes/objetRoutes');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

app.use(express.json());


app.use('/api/images', imageRoutes);
app.use('/api/objets', objetRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
