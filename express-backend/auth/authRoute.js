const express = require('express');
const passport = require('passport');
const userModel = require('../models/userModel');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    try {
        const newUser = await userModel.createNewUser(username, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login user
router.post('/login', passport.authenticate('local', { failureMessage: true }), (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
});

// Logout user
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.json({ message: 'Logout successful' });
    });
});

module.exports = router;