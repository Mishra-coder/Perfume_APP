const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const USER_DB = path.join(__dirname, '../data/users.json');

const loadUsers = () => {
    try {
        return JSON.parse(fs.readFileSync(USER_DB));
    } catch {
        return [];
    }
};

const saveUsers = (data) => fs.writeFileSync(USER_DB, JSON.stringify(data, null, 2));

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const users = loadUsers();
        if (users.find(u => u.email === email)) return res.status(400).json({ error: 'User exists' });

        const hash = await bcrypt.hash(password, 10);
        const user = { id: Date.now(), name, email, password: hash };

        users.push(user);
        saveUsers(users);
        res.status(201).json({ message: 'Success' });
    } catch (err) {
        res.status(500).json({ error: 'Signup failed' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = loadUsers();
        const user = users.find(u => u.email === email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token, user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
};
