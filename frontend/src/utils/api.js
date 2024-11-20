import axios from "axios";

export const makeAuthenticatedRequest = async (
  endpoint,
  method,
  token,
  data = null,
) => {
  console.log("Making request to:", process.env.REACT_APP_API_URL + endpoint);

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
    console.log("Request failed:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: error.config,
    });
    throw error;
  }
};
