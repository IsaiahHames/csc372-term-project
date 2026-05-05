import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

class UsersService {
  registerUser(user) {
    return axios.post(`${API}/auth/register`, user);
  }

  loginUser(user) {
    return axios.post(`${API}/auth/login`, user, {
      withCredentials: true
    });
  }

  logoutUser() {
    return axios.post(`${API}/auth/logout`, {}, {
      withCredentials: true
    });
  }

  getUserById(userId) {
    return axios.get(`${API}/users/${userId}`, {
      withCredentials: true
    });
  }
}

export default new UsersService();