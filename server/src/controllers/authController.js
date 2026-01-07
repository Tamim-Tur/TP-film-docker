const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User'); // Postgres Model

const signToken = (id) => {
    return jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
    });
}

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('Registration attempt:', { username, email, password: password ? 'provided' : 'missing' });

        if (!username || !email || !password) {
            console.log('Registration failed: missing fields');
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log('Registration failed: user already exists', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user in Postgres
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = signToken(newUser.id);

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + config.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email
                }
            }
        });

    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ status: 'error', message: err.message || 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Find user in Postgres
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const token = signToken(user.id);

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + config.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            }
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ status: 'error', message: err.message || 'Internal Server Error' });
    }
};

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};
