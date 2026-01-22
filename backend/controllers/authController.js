const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const DATA_FILE = path.join(__dirname, '../data/users.json');

const getUsers = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const users = getUsers();
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now(), name, email, password: hashedPassword };

        users.push(newUser);
        saveUsers(users);

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = getUsers();
        const user = users.find(u => u.email === email);
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ token, user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
