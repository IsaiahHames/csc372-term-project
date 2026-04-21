import axios from 'axios';

const USERS_API_BASE_URL = process.env.NEXT_PUBLIC_TRIVIA_API_URL;

class TriviaService {
    getTrivia(params) {
        return axios.get(USERS_API_BASE_URL, { params });
    }

    addQuestions({ id, questions }) {
        return axios.post(USERS_API_BASE_URL + "/saveQuestions", { id, questions });
    }

    getSavedQuestions(id) {
        return axios.get(USERS_API_BASE_URL + `/${id}`);
    }

    saveScore({ user_id, trivia_id, category, score, total }) {
        return axios.post(USERS_API_BASE_URL + "/saveScore", { user_id, trivia_id, category, score, total });
    }

    getLeaderboard(category) {
        return axios.get(USERS_API_BASE_URL + "/leaderboard", { params: { category } });
    }
}

export default new TriviaService();