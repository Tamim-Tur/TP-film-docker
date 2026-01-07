require('dotenv').config();
const mongoose = require('mongoose');

const connectMongo = async (retries = 5) => {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/film_content_db';
    while (retries) {
        try {
            await mongoose.connect(uri);
            console.log('MongoDB connected successfully.');
            break;
        } catch (error) {
            console.error(`MongoDB connection failed. Retries left: ${retries - 1}`, error.message);
            retries -= 1;
            if (retries === 0) {
                console.error('Could not connect to MongoDB after multiple attempts.');
                process.exit(1);
            }
            await new Promise(res => setTimeout(res, 3000));
        }
    }
};

module.exports = connectMongo;
