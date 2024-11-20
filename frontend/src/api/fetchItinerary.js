import { makeAuthenticatedRequest } from "../utils/api";

const POLLING_INTERVAL = 2000;
const POLLING_TIMEOUT = 30000;

const fetchItinerary = async (formData, token) => {
  const startTime = Date.now();

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
      throw new Error("Job failed to complete.");
    }

    await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
  }

  throw new Error("Request timed out. Please try again later.");
};

export default fetchItinerary;
