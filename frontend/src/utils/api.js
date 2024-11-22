import axios from "axios";

export const makeAuthenticatedRequest = async (
  endpoint,
  method,
  token,
  data = null,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    let response;
    if (method.toUpperCase() === "GET") {
      response = await axios.get(
        process.env.REACT_APP_API_URL + endpoint,
        config,
      );
    } else if (method.toUpperCase() === "POST") {
      response = await axios.post(
        process.env.REACT_APP_API_URL + endpoint,
        data,
        config,
      );
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || error.message || "Request failed",
    );
  }
};
