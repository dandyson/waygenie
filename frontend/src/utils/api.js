import axios from 'axios';

export const makeAuthenticatedRequest = async (endpoint, method, token, data = null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    let response;
    if (method.toUpperCase() === 'GET') {
      response = await axios.get(endpoint, config);
    } else if (method.toUpperCase() === 'POST') {
      response = await axios.post(endpoint, data, config);
    }
    return response.data;
  } catch (error) {
     if (error.response) {
        // Server error
        throw new Error(error.response.data.error || 'Server error occurred');
      } else if (error.request) {
        // No response
        throw new Error('Unable to reach server');
      } else {
        // Other errors
        throw new Error(error.message || 'An unexpected error occurred');
      }
  }
};
