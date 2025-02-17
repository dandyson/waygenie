import axios from "axios";

export const makeAuthenticatedRequest = async <T = any>(
  endpoint: string,
  method: string,
  token: string,
  data: any = null,
): Promise<T> => {
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
    } else {
      throw new Error(`Unsupported method: ${method}`);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || error.message || "Request failed",
      );
    }
    throw error;
  }
}; 