"use strict";
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const session = require("express-session");
const passport = require("passport");


require("./auth/passport.js");

const app = express();

app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require('./routes/userRoutes');
const triviaRoutes = require('./routes/triviaRoutes');
const authRoutes = require('./auth/authRoute');

app.use('/api/auth',authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trivia', triviaRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});