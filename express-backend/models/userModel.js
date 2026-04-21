const pool = require('./dbConnection');
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

async function deleteUser(id) {
    let queryText = "DELETE FROM users WHERE id =$1; ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addUser(username, password) {
    let queryText = "INSERT INTO users ( username, password) VALUES ($1, $2) RETURNING *";
    let values = [username, password];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getUserByUsername(username) {
    const queryText = "SELECT * FROM users where username= $1";
    const values = [username];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}


module.exports = {
    getAllUsers,
    getOneUserById,
    deleteUser,
    addUser,
    getUserByUsername
};