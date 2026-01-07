const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ message: 'You are not logged in. Please log in to get access.' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        // Check if user exists in Postgres
        const currentUser = await User.findByPk(decoded.id);

        if (!currentUser) {
            return res.status(401).json({ message: 'The user belonging to this token no longer does exist.' });
        }

        req.user = currentUser;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
