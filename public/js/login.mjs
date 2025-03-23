/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.mjs';

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    console.error('Login error:', err);
    showAlert('error', err.response.data.message);
  }
};

// Export login function so `index.mjs` can use it
export { login };
