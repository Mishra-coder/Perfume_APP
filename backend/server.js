const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aromaluxe';

app.use(cors({
    origin: (origin, callback) => {
        if (!origin ||
            origin.includes('localhost') ||
            origin.includes('127.0.0.1') ||
            origin.endsWith('.vercel.app') ||
            /https:\/\/aroma-luxe-.*\.vercel\.app/.test(origin)
        ) {
            callback(null, true);
        } else {
            console.log('[CORS Blocked] Origin:', origin);
            callback(null, false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
    }
};

connectDB();

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/api', (req, res) => res.json({ status: 'Aroma Luxe API Active' }));

app.get('*', (req, res) => {
    if (req.path.includes('.')) {
        return res.status(404).end();
    }
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const startServer = () => {
    app.listen(PORT, '0.0.0.0', () => console.log(`Server live on http://10.254.205.98:${PORT}`));
};

if (require.main === module) {
    startServer();
}

module.exports = app;
// trigger vercel deployment
