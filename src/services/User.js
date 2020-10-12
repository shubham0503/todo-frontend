import axios from 'axios';
import authHeader from './AuthHeader';
import config from 'config';

const API_URL = 'http://demoapitodo-env.eba-7dmrpzak.ap-south-1.elasticbeanstalk.com/api/user/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
}

export default new UserService();
