import axios from 'axios';

const USERS_API_BASE_URL = process.env.NEXT_PUBLIC_USER_API_URL;
const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

class UsersService {
  registerUser(user) {
    return axios.post(AUTH_API_BASE_URL + "/register", user);
  }

  loginUser(user) {
    return axios.post(AUTH_API_BASE_URL + "/login", user, { withCredentials: true });
  }

  logoutUser() {
    return axios.post(AUTH_API_BASE_URL + "/logout", {}, { withCredentials: true });
  }

  getUserById(userId) {
    return axios.get(USERS_API_BASE_URL + `/${userId}`);
  }
}

export default new UsersService();