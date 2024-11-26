import fetchItinerary from "./fetchItinerary";
import { makeAuthenticatedRequest } from "../utils/api";

jest.mock("../utils/api");

describe("fetchItinerary", () => {
  const mockFormData = {
    location: "Paris",
    startDate: "2023-12-01",
    startTime: "09:00",
    endDate: "2023-12-02",
    endTime: "18:00",
    interests: ["art", "history"],
    travelStyle: "relaxed",
  };
  const mockToken = "mockAccessToken";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the final itinerary result when the job completes successfully", async () => {
    makeAuthenticatedRequest
      .mockResolvedValueOnce({ jobId: "12345" }) // Initial job response
      .mockResolvedValueOnce({
        status: "completed",
        result: {
          introduction: "Welcome to your trip!",
          events: [{ name: "Louvre Tour", time: "10:00 AM" }],
          travelMethods: "walking",
        },
      });

    const result = await fetchItinerary(mockFormData, mockToken);

    expect(result).toEqual({
      introduction: "Welcome to your trip!",
      events: [{ name: "Louvre Tour", time: "10:00 AM" }],
      travelMethods: "walking",
    });

    expect(makeAuthenticatedRequest).toHaveBeenCalledTimes(2);
    expect(makeAuthenticatedRequest).toHaveBeenNthCalledWith(
      1,
      "/api/itinerary",
      "POST",
      mockToken,
      { prompt: mockFormData },
    );
    expect(makeAuthenticatedRequest).toHaveBeenNthCalledWith(
      2,
      "/api/itinerary/status/12345",
      "GET",
      mockToken,
    );
  });

  it("should throw an error if the job fails", async () => {
    makeAuthenticatedRequest
      .mockResolvedValueOnce({ jobId: "12345" }) // Initial job response
      .mockResolvedValueOnce({
        status: "failed",
        error: "Failed to generate itinerary: Job type not recognized",
      }); // Add error message

    await expect(fetchItinerary(mockFormData, mockToken)).rejects.toThrow(
      "Failed to generate itinerary: Job type not recognized",
    );
  });

  it("should throw a timeout error if the polling exceeds the timeout period", async () => {
    makeAuthenticatedRequest
      .mockResolvedValueOnce({ jobId: "12345" }) // Initial job response
      .mockResolvedValue({ status: "in_progress" }); // Polling response (repeated)

    jest.useFakeTimers(); // Simulate polling timeout

    const fetchPromise = fetchItinerary(mockFormData, mockToken);

    jest.advanceTimersByTime(30000); // Simulate 30 seconds passing

    await expect(fetchPromise).rejects.toThrow(
      "Request timed out. Please try again later.",
    );

    jest.useRealTimers(); // Cleanup fake timers
  });
});
