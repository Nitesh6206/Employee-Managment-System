const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Signup Controller
exports.signup = async (req, res) => {
    const { username, password,email } = req.body;
    try {
        const user = new User({ username, password,email });
        await user.save();
        res.status(201).json({ success: true, token: generateToken(user._id) });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await user.matchPassword(password))) {
            res.json({ success: true, token: generateToken(user._id),username: user.username, });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
