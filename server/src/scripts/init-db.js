require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: 'postgres', // Connect to default DB
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

async function createDatabase() {
    try {
        await client.connect();
        console.log('Connected to default postgres database...');

        const dbName = process.env.POSTGRES_DB;

        // Check if database exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);
        if (res.rowCount === 0) {
            console.log(`Database ${dbName} not found. Creating...`);
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database ${dbName} created successfully!`);
        } else {
            console.log(`Database ${dbName} already exists.`);
        }
    } catch (err) {
        console.error('Error creating database:', err.message);
    } finally {
        await client.end();
    }
}

createDatabase();
