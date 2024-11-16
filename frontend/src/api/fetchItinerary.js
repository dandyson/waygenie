import axios from "axios";

const POLLING_INTERVAL = 2000; // Poll every 2 seconds
const POLLING_TIMEOUT = 30000; // Timeout after 30 seconds

const fetchItinerary = async (formData) => {
  const startTime = Date.now();

  try {
    // Step 1: Add the job to the queue via /chat endpoint (only called once)
    const initialResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}/chat`,
      { prompt: formData },
    );

    const jobId = initialResponse.data.jobId;

    // Step 2: Poll for the status of the job
    while (Date.now() - startTime < POLLING_TIMEOUT) {
      const statusResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/chat/status/${jobId}`,
      );

      if (statusResponse.data.status === "completed") {
        return statusResponse.data.result; // Return the result when the job is complete
      } else if (statusResponse.data.status === "failed") {
        throw new Error("Job failed to complete.");
      }

      await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL)); // Wait for the next poll
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
