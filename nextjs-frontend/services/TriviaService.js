import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

class TriviaService {
  getTrivia(params) {
    return axios.get(`${API}/api/trivia`, { params });
  }

  addQuestions({ id, questions }) {
    return axios.post(`${API}/api/trivia/saveQuestions`, { id, questions }, {
      withCredentials: true
    });
  }

  getSavedQuestions(id) {
    return axios.get(`${API}/api/trivia/${id}`, {
      withCredentials: true
    });
  }

  saveScore({ user_id, trivia_id, category, score, total }) {
    return axios.post(`${API}/api/trivia/saveScore`, {
      user_id,
      trivia_id,
      category,
      score,
      total
    }, {
      withCredentials: true
    });
  }

  getLeaderboard(category) {
    return axios.get(`${API}/api/trivia/leaderboard`, {
      params: { category }
    });
  }
}

export default new TriviaService();