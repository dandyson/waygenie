import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InterestsInput from "./InterestsInput";
import { TripFormData } from "../types/api";

describe("InterestsInput component", () => {
  const mockNextStep = jest.fn().mockResolvedValue(undefined);
  const mockBackStep = jest.fn();
  const mockFormData: TripFormData = {
    location: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    interests: [],
    travelStyle: "",
  };

  describe("initial rendering", () => {
    beforeEach(() => {
      render(
        <InterestsInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={mockFormData}
        />,
      );
    });

    test("renders with default empty interest", () => {
      const initialInterestInput = screen.getByPlaceholderText(
        "Enter Interest...",
      ) as HTMLInputElement;
      expect(initialInterestInput.value).toBe("");
    });
  });

  describe("adding new interests", () => {
    beforeEach(() => {
      render(
        <InterestsInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={mockFormData}
        />,
      );
      fireEvent.click(screen.getByText("Add Interest"));
    });

    test("renders new interest input", () => {
      const newInterestInput = screen.getAllByPlaceholderText(
        "Enter Interest...",
      )[1] as HTMLInputElement;
      expect(newInterestInput).toBeInTheDocument();
    });

    test("updates new interest input value", () => {
      const newInterestInput = screen.getAllByPlaceholderText(
        "Enter Interest...",
      )[1] as HTMLInputElement;
      fireEvent.change(newInterestInput, { target: { value: "History" } });
      expect(newInterestInput.value).toBe("History");
    });

    test("submits form with multiple interests", async () => {
      const inputs = screen.getAllByPlaceholderText(
        "Enter Interest...",
      ) as HTMLInputElement[];
      
      // Fill in both interest inputs
      fireEvent.change(inputs[0], { target: { value: "Art" } });
      fireEvent.change(inputs[1], { target: { value: "History" } });

      // Submit the form
      fireEvent.click(screen.getByText("Next"));

      // Wait for the next step to be called
      await waitFor(() => {
        expect(mockNextStep).toHaveBeenCalledWith({
          interests: ["Art", "History"]
        });
      });
    });

    test("removes interest field when remove button is clicked", () => {
      // Add an interest
      const inputs = screen.getAllByPlaceholderText(
        "Enter Interest...",
      ) as HTMLInputElement[];
      fireEvent.change(inputs[1], { target: { value: "History" } });

      // Click remove button for the second interest
      const removeButton = screen.getByRole('button', { name: /Remove/i });
      fireEvent.click(removeButton);

      // Verify the second interest input is removed
      const remainingInputs = screen.getAllByPlaceholderText("Enter Interest...");
      expect(remainingInputs).toHaveLength(1);
    });
  });

  test("calls backStep when back button is clicked", () => {
    render(
      <InterestsInput
        nextStep={mockNextStep}
        backStep={mockBackStep}
        formData={mockFormData}
      />,
    );
    fireEvent.click(screen.getByText("Back"));
    expect(mockBackStep).toHaveBeenCalled();
  });
});
