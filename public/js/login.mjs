/* eslint-disable */
import axios from 'axios';

const login = async (email, password) => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:3000/api/v1/users/login',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data);

    if (res.data.status === 'success') {
      alert('Logged in successfully!');
      setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    console.error('Login error:', err);
    alert(err.response?.data?.message || 'Login failed!');
  }
};

// Export login function so `index.mjs` can use it
export { login };
