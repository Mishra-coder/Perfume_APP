const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fs = require('fs');
const path = require('path');

const USER_DB = path.join(__dirname, '../data/users.json');

router.get('/me', auth, (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(USER_DB));
        const user = users.find(u => u.id === req.user.id);
        if (!user) return res.status(404).json({ error: 'Not found' });

        const { password, ...safeData } = user;
        res.json(safeData);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
