const { Pool } = require('pg');

// Configure the database connection pool
const pool = new Pool({
    user: 'postgres',        // Replace with your database user
    host: 'localhost',           // Replace with your database host
    database: 'pocketmart',    // Replace with your database name
    password: '12345678',// Replace with your database password
    port: 5432,     
            // Replace with your database port
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;
