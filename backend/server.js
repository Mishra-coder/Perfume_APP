const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Aroma Luxe API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
