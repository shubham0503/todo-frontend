import axios from 'axios';

const API_URL = 'http://demoapitodo-env.eba-7dmrpzak.ap-south-1.elasticbeanstalk.com/api/auth/';

class AuthService {
  async login(user) {
    
    try {
      const loginResponse = await axios.post(API_URL + 'signin', {
        email: user.email,
        password: user.password
      });
      await localStorage.setItem('loggedInUser', JSON.stringify(loginResponse.data));

      return loginResponse.data;
    } catch(err) {
      return err.response.data;
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
  }

  async register(user) {
    try {
      const registerResponse = await axios.post(API_URL + 'signup', {
        name: user.name,
        email: user.email,
        password: user.password
      });
      return registerResponse.data;
    } catch(err) {
      return err.response.data;
    }
  }
}

export default new AuthService();
