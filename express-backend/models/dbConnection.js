require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Create users table on startup if it doesn't exist
const createUsersTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            hashedpassword VARCHAR(255) NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log("Users table created or already exists");
    } catch (error) {
        console.error("Error creating users table:", error);
    }
};

// Run table creation on module load
createUsersTable();

module.exports = pool;