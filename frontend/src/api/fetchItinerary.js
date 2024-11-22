import { makeAuthenticatedRequest } from "../utils/api";

const POLLING_INTERVAL = 2000;
const POLLING_TIMEOUT = 30000;

const fetchItinerary = async (formData, token) => {
  const startTime = Date.now();

  try {
    // Step 1: Add the job to the queue
    const initialResponse = await makeAuthenticatedRequest(
      "/api/itinerary",
      "POST",
      token,
      { prompt: formData },
    );

    const jobId = initialResponse.jobId;

    // Step 2: Poll for status
    while (Date.now() - startTime < POLLING_TIMEOUT) {
      const statusResponse = await makeAuthenticatedRequest(
        `/api/itinerary/status/${jobId}`,
        "GET",
        token,
      );

      if (statusResponse.status === "completed") {
        return statusResponse.result;
      } else if (statusResponse.status === "failed") {
        throw new Error(statusResponse.error || "Failed to generate itinerary");
      }

      // Only wait if the job is still processing
      if (statusResponse.status === "in-progress") {
        await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
      } else {
        throw new Error("Invalid job status");
      }
    }

    throw new Error("Request timed out. Please try again later.");
  } catch (error) {
    throw new Error(
      error.message ||
        "There was an error generating your itinerary - please try again.",
    );
  }
};

export default fetchItinerary;
