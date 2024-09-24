import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";

// Mock axios to prevent real API requests
jest.mock("axios");

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders App and navigates through steps with successful API call", async () => {
    // Mock the successful API response
    axios.post.mockResolvedValueOnce({
      data: {
        introduction: "Welcome to your laid-back, coffee-inspired day trip in the bustling city of London. This itinerary is designed to provide you with a relaxing experience, immersing you in the rich coffee culture of the city. Enjoy your journey!",
        itinerary: "<ul className='m-8 max-w-screen-md'>",
        events: [
          { 
            title: "Visit to the British Museum", 
            time: "10:20 AM - 11:20 AM", 
            description: "Start your day with a visit to the British Museum. Explore the Enlightenment Gallery, which showcases the age of reason, science, and the power of collecting. Don't forget to grab a coffee at the museum's café." 
          },
          { 
            title: "Visit to Monmouth Coffee Company", 
            time: "11:40 AM - 12:10 PM", 
            description: "Enjoy a cup of coffee at Monmouth Coffee Company, a well-reviewed coffee shop known for its quality beans and brewing methods." 
          },
          { 
            title: "Lunch at The Espresso Room", 
            time: "12:30 PM - 1:30 PM", 
            description: "Have a laid-back lunch at The Espresso Room, a café that serves excellent coffee and light meals. Their avocado toast is a must-try." 
          }
        ],
        travelMethods: "This itinerary involves walking and the use of public transportation. The London Underground, also known as the Tube, is a convenient and efficient way to get around the city."
      },
    });

    render(<App />);

      // Step 1: LocationInput
    fireEvent.change(screen.getByPlaceholderText("Enter a location..."), {
      target: { value: "London" },
    });
    fireEvent.click(screen.getByText("Next"));

    // Step 2: DateTimeInput (same as before)
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

    // Step 3: InterestsInput (same as before)
    fireEvent.change(screen.getByPlaceholderText("Enter Interest..."), {
      target: { value: "History" },
    });
    fireEvent.click(screen.getByText("Next"));

    // Step 4: TravelStyleInput (same as before)
    const selectTravelStyle = screen.getByTestId("travel-style");
    fireEvent.change(selectTravelStyle, { target: { value: "laid-back" } });

    fireEvent.click(screen.getByText("Let's Go!"));

    // Step 5: Loading Spinner should appear while waiting for API response
    expect(screen.getByRole("status")).toBeInTheDocument();

    // Wait for the API response and final step to render
    await waitFor(() => {
      expect(screen.getByText("YOUR ITINERARY:")).toBeInTheDocument();
      expect(screen.getByText("Welcome to your laid-back, coffee-inspired day trip in the bustling city of London. This itinerary is designed to provide you with a relaxing experience, immersing you in the rich coffee culture of the city. Enjoy your journey!")).toBeInTheDocument();

      // Check for events
      expect(screen.getByText("Visit to the British Museum")).toBeInTheDocument();
      expect(screen.getByText("10:20 AM - 11:20 AM")).toBeInTheDocument();
      expect(screen.getByText("Start your day with a visit to the British Museum. Explore the Enlightenment Gallery, which showcases the age of reason, science, and the power of collecting. Don't forget to grab a coffee at the museum's café.")).toBeInTheDocument();

      // Check travel methods
      expect(screen.getByText(/This itinerary involves walking and the use of public transportation./)).toBeInTheDocument();
    });
  });

  test("handles API call failure gracefully", async () => {

    render(<App />);

    // Step 1: LocationInput
    fireEvent.change(screen.getByPlaceholderText("Enter a location..."), {
      target: { value: "London" },
    });
    fireEvent.click(screen.getByText("Next"));

    // Step 2: DateTimeInput (same as before)
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

    // Step 3: InterestsInput (same as before)
    fireEvent.change(screen.getByPlaceholderText("Enter Interest..."), {
      target: { value: "History" },
    });
    fireEvent.click(screen.getByText("Next"));

    // Step 4: TravelStyleInput (same as before)
    const selectTravelStyle = screen.getByTestId("travel-style");
    fireEvent.change(selectTravelStyle, { target: { value: "laid-back" } });

    fireEvent.click(screen.getByText("Let's Go!"));

    // Step 5: Loading Spinner should appear while waiting for API response
    expect(screen.getByRole("status")).toBeInTheDocument();
    
    // Mock the failed API response
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    // Wait for the API response and check for error handling
    await waitFor(() => {
      expect(screen.getByText("There was an error generating your itinerary - please try again.")).toBeInTheDocument();
    });
  });

  test("navigates back through steps", () => {
    render(<App />);

    // Step 1: LocationInput
    fireEvent.change(screen.getByPlaceholderText("Enter a location..."), {
      target: { value: "London" },
    });
    fireEvent.click(screen.getByText("Next"));

    // Step 2: DateTimeInput
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
    });;

    // Navigate back to Step 1
    fireEvent.click(screen.getByText("Back"));

    // Verify that we're back at Step 1
    expect(screen.getByPlaceholderText("Enter a location...")).toBeInTheDocument();
  });
});
