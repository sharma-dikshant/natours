/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts.mjs';
const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
      data: {
        name,
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'data updated successfully!');
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export { updateData };
