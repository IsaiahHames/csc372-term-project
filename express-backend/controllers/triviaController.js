const model = require("../models/triviaModel");

async function getQuestions(req, res) {

    const { amount, category, difficulty, type } = req.query;

    try {

        const data = await model.fetchQuestions({
            amount,
            category,
            difficulty,
            type
        });

        if (data.response_code === 0) {
            return res.json({
                success: true,
                questions: data.results
            });
        }

        if(data.response_code === 5) {
            return res.json({
                success: false,
                message: "Slow down!"
            });
        }

        if (data.response_code === 1) {
            return res.json({
                success: false,
                message: "Not enough questions for selected filters"
            });
        }

        return res.status(500).send("Unexpected API response");

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }

}

async function saveQuestions(req, res) {
    const { id, questions } = req.body;

    try {
        await model.saveQuestions(id, questions);
        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
}

async function getSavedQuestions(req, res) {
    const { id } = req.params;

    try {
        const data = await model.getQuestionsByKey(id);

        return res.json({
            success: true,
            questions: data
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
}

async function saveScore(req, res) {

    const { user_id, trivia_id, category, score, total } = req.body;

    try {

        await model.saveScore({
            user_id,
            trivia_id,
            category,
            score,
            total
        });

        return res.json({ success: true });

    } catch (err) {

        console.error(err);

        return res.status(500).send("Server error");

    }
}

async function leaderboard(req, res) {

    const { category } = req.query;

    try {

        const scores = await model.getLeaderboard(category);

        return res.json({
            success: true,
            scores
        });

    } catch (err) {

        console.error("LEADERBOARD ERROR:", err);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
}

module.exports = { 
    getQuestions,
    saveQuestions,
    getSavedQuestions,
    saveScore,
    leaderboard
};