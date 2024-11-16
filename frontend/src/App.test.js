import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";

jest.mock("axios");
jest.useFakeTimers();

describe("App Component with Queued Job", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("submits form data, queues job, and fetches AI response", async () => {
    // Mock the initial job queue response
    axios.post.mockResolvedValueOnce({
      data: { message: "Job queued", jobId: "mockJobId123" },
    });

    // Mock two "in-progress" responses before completing
    axios.get.mockResolvedValueOnce({ data: { status: "in-progress" } });
    axios.get.mockResolvedValueOnce({ data: { status: "in-progress" } });
    axios.get.mockResolvedValueOnce({
      data: {
        status: "completed",
        result: {
          introduction: "Welcome to your laid-back day in the city.",
          itinerary: "<ul>",
          events: [
            {
              title: "Museum Visit",
              time: "10:00 - 11:00 AM",
              description: "Start your day with a visit to the museum.",
            },
          ],
          travelMethods: "Walking and public transit.",
        },
      },
    });

    render(<App />);

    // Simulate form input and progression through steps
    fireEvent.change(screen.getByPlaceholderText("Enter a location..."), {
      target: { value: "London" },
    });
    fireEvent.click(screen.getByText("Next"));

    fireEvent.change(screen.getByLabelText("Start Date:"), {
      target: { value: "2024-09-01" },
    });
    fireEvent.change(screen.getByLabelText("Start Time:"), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText("End Date:"), {
      target: { value: "2024-09-02" },
    });
    fireEvent.change(screen.getByLabelText("End Time:"), {
      target: { value: "15:00" },
    });
    fireEvent.click(screen.getByText("Next"));

    fireEvent.change(screen.getByPlaceholderText("Enter Interest..."), {
      target: { value: "History" },
    });
    fireEvent.click(screen.getByText("Next"));

    const selectTravelStyle = screen.getByTestId("travel-style");
    fireEvent.change(selectTravelStyle, { target: { value: "laid-back" } });
    fireEvent.click(screen.getByText("Let's Go!"));

    // Confirm job queue API call
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/chat"),
        expect.any(Object)
      )
    );

    // Check for "Generating Itinerary..." spinner text
    expect(screen.getByText("Generating Itinerary...")).toBeInTheDocument();

    // Simulate the first poll
    jest.advanceTimersByTime(3000); // Adjust this time to match your polling interval
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Simulate the second poll
    jest.advanceTimersByTime(3000); // Match polling interval
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));

    // Simulate the final poll where the status is "completed"
    jest.advanceTimersByTime(3000);
    await waitFor(() =>
      expect(screen.queryByText("Generating Itinerary...")).not.toBeInTheDocument()
    );

    // Check final content
    await screen.findByText("Welcome to your laid-back day in the city.");
  });
});
