"use strict";
const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


const userRoutes = require('./routes/userRoutes');
const triviaRoutes = require('./routes/triviaRoutes');

app.use('/api/users', userRoutes);
app.use('/api/trivia', triviaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});