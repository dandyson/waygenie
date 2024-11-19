import { useAuth0 } from "@auth0/auth0-react";

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async (endpoint, options = {}) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${endpoint}`,
        {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  return { callApi };
};
