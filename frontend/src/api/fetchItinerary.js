import { makeAuthenticatedRequest } from '../utils/api';

const fetchItinerary = async (formData, token) => {
  try {
    if (!formData.location) {
      return {
        introduction: "",
        events: [],
        error: "Failed to generate itinerary",
        travelMethods: ""
      };
    }

    const response = await makeAuthenticatedRequest(
      '/api/itinerary',
      'POST',
      token,
      { prompt: formData }
    );

    return response;
  } catch (error) {
    return {
      introduction: "",
      events: [],
      error: "Failed to generate itinerary",
      travelMethods: ""
    };
  }
};

export default fetchItinerary;
