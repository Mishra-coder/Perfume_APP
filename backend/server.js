const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aromaluxe';

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.json({ status: 'Aroma Luxe API Active' }));

const startServer = () => {
    app.listen(PORT, '0.0.0.0', () => console.log(`Server live on http://10.254.205.98:${PORT}`));
};

if (require.main === module) {
    startServer();
}

module.exports = app;
