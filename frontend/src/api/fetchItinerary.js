import axios from "axios";

const POLLING_INTERVAL = 2000;
const POLLING_TIMEOUT = 30000;

const fetchItinerary = async (formData, token) => {
  const startTime = Date.now();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // Step 1: Add the job to the queue
    const initialResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}/chat`,
      { prompt: formData },
      config,
    );

    const jobId = initialResponse.data.jobId;

    // Step 2: Poll for status
    while (Date.now() - startTime < POLLING_TIMEOUT) {
      const statusResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/chat/status/${jobId}`,
        config,
      );

      if (statusResponse.data.status === "completed") {
        return statusResponse.data.result;
      } else if (statusResponse.data.status === "failed") {
        throw new Error("Job failed to complete.");
      }

      await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
    }

    throw new Error("Request timed out. Please try again later.");
  } catch (error) {
    console.error(error);
    return {
      introduction: "",
      events: [],
      travelMethods: "",
      error: "Failed to generate itinerary",
    };
  }
};

export default fetchItinerary;
