const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: 'Not found' });

        res.json(user);
    } catch (err) {
        console.error('Fetch user error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
