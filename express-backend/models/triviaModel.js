"use strict";
const pool = require('./dbConnection');
const axios = require("axios");
const BASE_URL = "https://opentdb.com/api.php";


async function fetchQuestions({ amount, category, difficulty, type }) {

    try {

        let url = `${BASE_URL}?amount=${amount}`;

        if (category && category !== "any") {
            url += `&category=${category}`;
        }

        if (difficulty) {
            url += `&difficulty=${difficulty}`;
        }

        if (type) {
            url += `&type=${type}`;
        }

        const response = await axios.get(url);

        return response.data;

    } catch (error) {

        console.error("TriviaModel error:", error.message);
        throw error;

    }
}

async function saveQuestions(id, questions) {
    const queryText = "INSERT INTO trivia (id, questions) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET questions = EXCLUDED.questions";
    const values = [id, JSON.stringify(questions)];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function getQuestionsByKey(id) {
    const query = "SELECT questions FROM trivia WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) return null;

    return result.rows[0].questions;
}

async function saveScore({user_id, trivia_id, category, score, total}) {

    const query = "INSERT INTO scores (user_id, trivia_id, category, score, total_questions) VALUES ($1,$2,$3,$4,$5)";

    await pool.query(query, [user_id, trivia_id, category, score, total]);
}

async function getLeaderboard(category) {

    let query;
    let values = [];

    if (!category || category === "any") {

        query = `
            SELECT u.username, s.category, s.score
            FROM scores s
            JOIN users u ON s.user_id::int = u.id
            ORDER BY s.score DESC
            LIMIT 10
        `;

    } else {

        query = `
            SELECT u.username, s.category, s.score
            FROM scores s
            JOIN users u ON s.user_id::int = u.id
            WHERE s.category = $1
            ORDER BY s.score DESC
            LIMIT 10
        `;

        values = [category];

    }

    const result = await pool.query(query, values);

    return result.rows;
}

module.exports = {
    fetchQuestions,
    saveQuestions,
    getQuestionsByKey,
    saveScore,
    getLeaderboard
}