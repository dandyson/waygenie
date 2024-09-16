import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders App and navigates through steps", () => {
  render(<App />);

  // Step 1: LocationInput
  expect(screen.getByText("Where are you going?")).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText("Enter a location..."), {
    target: { value: "London" },
  });
  fireEvent.click(screen.getByText("Next"));

  // Step 2: DateTimeInput
  expect(screen.getByLabelText("Start Date:")).toBeInTheDocument();
  expect(screen.getByLabelText("Start Time:")).toBeInTheDocument();
  expect(screen.getByLabelText("End Date:")).toBeInTheDocument();
  expect(screen.getByLabelText("End Time:")).toBeInTheDocument();

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

  // Step 3: InterestsInput
  expect(screen.getByPlaceholderText("Enter Interest...")).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText("Enter Interest..."), {
    target: { value: "History" },
  });
  fireEvent.click(screen.getByText("Next"));

  // Step 4: TravelStyleInput
  const selectTravelStyle = screen.getByTestId("travel-style");
  expect(selectTravelStyle).toBeInTheDocument();
  fireEvent.change(selectTravelStyle, { target: { value: "laid-back" } });
  expect(selectTravelStyle.value).toBe("laid-back");

  // test change of value
  fireEvent.change(selectTravelStyle, { target: { value: "everything" } });
  expect(selectTravelStyle.value).toBe("everything");

  fireEvent.click(screen.getByText("Let's Go!"));

  // Final Step
  expect(screen.getByText("YOUR ITINERARY:")).toBeInTheDocument();
});
