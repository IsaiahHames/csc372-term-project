const pool = require('./dbConnection');
const bcrypt = require('bcrypt');

async function getAllUsers() {
    const queryText = "SELECT * FROM users";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOneUserById(id) {
    const queryText = "SELECT * FROM users where id= $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getOneUserByUsername(username) {
    const queryText = "SELECT * FROM users where username= $1";
    const values = [username];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function deleteUser(id) {
    let queryText = "DELETE FROM users WHERE id =$1; ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function createNewUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const queryText = "INSERT INTO users (username, hashedpassword) VALUES ($1, $2) RETURNING *";
    const values = [username, hashedPassword];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}


module.exports = {
    getAllUsers,
    getOneUserById,
    deleteUser,
    createNewUser,
    getOneUserByUsername
};