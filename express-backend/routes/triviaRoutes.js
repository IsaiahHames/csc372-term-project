"use strict";
const triviaController = require('../controllers/triviaController');
const express = require("express");
const router = express.Router();

router.get("/", triviaController.getQuestions);
router.post("/saveQuestions", triviaController.saveQuestions);
router.post("/saveScore", triviaController.saveScore);
router.get("/leaderboard", triviaController.leaderboard);
router.get("/:id", triviaController.getSavedQuestions);
module.exports = router;