import React from "react";
import { render, screen } from "@testing-library/react";
import Itinerary from "./Itinerary";
import { AIResponse, ItineraryData, Event } from "../types/api";

describe("Itinerary Component", () => {
  const mockResetStep = jest.fn();

  test("displays loading spinner when generating", () => {
    render(<Itinerary aiResponse={null} resetStep={mockResetStep} error={null} />);

    // Check if the loading spinner is shown when the AI response is being generated
    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("renders Itinerary component with AI response", () => {
    const mockEvents: Event[] = [
      {
        time: "09:00 AM",
        title: "Breakfast title",
        description: "Breakfast description",
      },
      {
        time: "12:00 PM",
        title: "Lunch title",
        description: "Lunch description.",
      },
    ];

    const mockItineraryData: ItineraryData = {
      introduction: "Welcome to your itinerary.",
      itinerary: "Day plan overview",
      events: mockEvents,
      travelMethods: "Travel by bus and taxi.",
    };

    const mockAiResponse: AIResponse = {
      status: "completed",
      jobId: "test-job-id",
      result: mockItineraryData
    };

    render(<Itinerary aiResponse={mockAiResponse} resetStep={mockResetStep} error={null} />);

    // Check if the heading is in the document
    const headingElement = screen.getByText(/YOUR ITINERARY:/i);
    expect(headingElement).toBeInTheDocument();

    // Check if the introduction is rendered
    const introductionElement = screen.getByText(/Welcome to your itinerary./i);
    expect(introductionElement).toBeInTheDocument();

    // Check if the events are rendered
    const breakfastElement = screen.getByText(/Breakfast title/i);
    const lunchElement = screen.getByText(/Lunch title/i);
    expect(breakfastElement).toBeInTheDocument();
    expect(lunchElement).toBeInTheDocument();

    // Check if the travel methods are rendered
    const travelElement = screen.getByText(/Travel by bus and taxi./i);
    expect(travelElement).toBeInTheDocument();
  });

  test("renders error state when error prop is provided", () => {
    const errorMessage = "An error occurred";

    render(<Itinerary aiResponse={null} resetStep={mockResetStep} error={errorMessage} />);

    // Check if error message is displayed
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();

    // Check if try again button is present
    const tryAgainButton = screen.getByText("Try Again");
    expect(tryAgainButton).toBeInTheDocument();
  });

  test("handles no AI response gracefully", () => {
    render(<Itinerary aiResponse={null} resetStep={mockResetStep} error={null} />);

    // Expect the spinner to be shown since the AI response is null
    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("handles empty AI response", () => {
    const emptyAiResponse: AIResponse = {
      status: "completed",
      jobId: "test-job-id",
      result: {
        introduction: "",
        itinerary: "",
        events: [],
        travelMethods: "",
      }
    };
    render(<Itinerary aiResponse={emptyAiResponse} resetStep={mockResetStep} error={null} />);

    // Ensure that the component renders with empty data
    const startOverButton = screen.getByText("Start Over");
    expect(startOverButton).toBeInTheDocument();
  });
});
