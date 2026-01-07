const { connectPostgres } = require('./config/dbPostgres');
const connectMongo = require('./config/dbMongo');

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Databases and Start Server
const startServer = async () => {
    try {
        await connectPostgres();
        await connectMongo();

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 API accessible at: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
};

startServer();

// Security Middleware
app.use(helmet());
app.use(require('cookie-parser')());
app.use(cors({
    origin: ['http://localhost', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000, // Increased for development and multiple-row loading
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

app.use(hpp());

app.use(morgan('common'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


console.log('Registering routes...');
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
console.log('Routes registered!');

app.get('/', (req, res) => {
    res.json({ message: 'Secure Streaming API (Postgres + Mongo) is running' });
});

app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});


