import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
}

export default new UserService();
