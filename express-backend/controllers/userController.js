"use strict";
const model = require('../models/userModel');
async function fetchAllUsers(req, res) {
    try {
        const users = await model.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }   
}

async function fetchUserById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const user = await model.getOneUserById(id);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }   
}

async function removeUser(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deleteUser(id);    
            if (deletedCount > 0) {
                res.send(`User with id ${id} deleted successfully.`);
            } else {
                res.status(404).send("User not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function createUser(req, res) {
    const { username, password } = req.body;
    if (username && password) {
        try {
            const newUser = await model.addUser(username, password);
            res.status(201).json(newUser);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required user fields!");
    }
}

module.exports = {
    fetchAllUsers,
    fetchUserById,
    removeUser,
    createUser
};