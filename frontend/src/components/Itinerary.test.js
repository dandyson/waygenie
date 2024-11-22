import React from "react";
import { render, screen } from "@testing-library/react";
import Itinerary from "./Itinerary";

describe("Itinerary Component", () => {
  test("displays loading spinner when generating", () => {
    render(<Itinerary aiResponse={null} resetStep={jest.fn()} />);

    // Check if the loading spinner is shown when the AI response is being generated
    const spinnerElement = screen.getByRole("status"); // Assuming the spinner has a role="status"
    expect(spinnerElement).toBeInTheDocument();
  });

  test("renders Itinerary component with AI response", () => {
    const mockAiResponse = {
      introduction: "Welcome to your itinerary.",
      events: [
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
      ],
      travelMethods: "Travel by bus and taxi.",
    };
    const mockResetStep = jest.fn();

    render(<Itinerary aiResponse={mockAiResponse} resetStep={mockResetStep} />);

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

  test("handles error in AI response", () => {
    render(
      <Itinerary
        aiResponse={null}
        resetStep={jest.fn()}
        error="There was an error generating your itinerary - please try again."
      />,
    );

    // Check if the error message is rendered
    const errorMessage = screen.getByText(
      /There was an error generating your itinerary - please try again./i,
    );
    expect(errorMessage).toBeInTheDocument();

    // Verify error icon (SVG) is present
    const errorIcon = document.querySelector("svg"); // Or use getByRole if you add role="img" to the SVG
    expect(errorIcon).toBeInTheDocument();

    // Verify try again button is present
    const tryAgainButton = screen.getByRole("button", { name: /Try Again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  test("handles no AI response gracefully", () => {
    // Test the case when AI fails to generate an itinerary (e.g., null response or error)
    render(<Itinerary aiResponse={null} resetStep={jest.fn()} />);

    // Expect the spinner to be shown since the AI response is null
    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("handles empty AI response", () => {
    const emptyAiResponse = {
      introduction: "",
      events: [],
      travelMethods: "",
    };
    render(<Itinerary aiResponse={emptyAiResponse} resetStep={jest.fn()} />);

    // Ensure that no events or travel methods are displayed
    const itineraryHeading = screen.getByText(/YOUR ITINERARY:/i);
    expect(itineraryHeading).toBeInTheDocument();

    // Check that the empty AI response does not break the component
    const noEventsMessage = screen.queryByText(/No events available/i);
    expect(noEventsMessage).toBeNull(); // No placeholder message exists, component should handle this gracefully
  });
});
