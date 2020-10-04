import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('loggedInUser', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('loggedInUser');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      name: user.name,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
