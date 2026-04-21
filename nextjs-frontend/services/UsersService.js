import axios from 'axios';

const USERS_API_BASE_URL = process.env.NEXT_PUBLIC_USER_API_URL;

class UsersService {
  createUser(user) {
    return axios.post(USERS_API_BASE_URL + "/signup", user);
  }

  loginUser(user) {
    return axios.post(USERS_API_BASE_URL + "/login", user);
  }

  getUserById(userId) {
    return axios.get(USERS_API_BASE_URL + `/${userId}`);
  }
}

export default new UsersService();