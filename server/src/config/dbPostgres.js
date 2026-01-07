require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        logging: false, // Set to console.log to see SQL queries
    }
);

module.exports.sequelize = sequelize;

const connectPostgres = async (retries = 5) => {
    while (retries) {
        try {
            await sequelize.authenticate();
            console.log('PostgreSQL connected successfully.');

            const User = require('../models/User');
            const Favorite = require('../models/Favorite');

            await sequelize.sync({ alter: true });
            console.log('PostgreSQL models synchronized.');
            break;
        } catch (error) {
            console.error(`PostgreSQL connection failed. Retries left: ${retries - 1}`, error.message);
            retries -= 1;
            if (retries === 0) {
                console.error('Could not connect to PostgreSQL after multiple attempts.');
                process.exit(1);
            }
            await new Promise(res => setTimeout(res, 3000));
        }
    }
};

module.exports.connectPostgres = connectPostgres;
