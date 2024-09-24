import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InterestsInput from "./InterestsInput";

describe("InterestsInput component", () => {
  const mockNextStep = jest.fn();
  const mockBackStep = jest.fn();
  const formData = { interests: [] };

  describe("initial rendering", () => {
    beforeEach(() => {
      render(
        <InterestsInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={formData}
        />,
      );
    });

    test("renders with default empty interest", () => {
      const initialInterestInput =
        screen.getByPlaceholderText("Enter Interest...");
      expect(initialInterestInput.value).toBe("");
    });
  });

  describe("adding new interests", () => {
    beforeEach(() => {
      render(
        <InterestsInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={formData}
        />,
      );
      fireEvent.click(screen.getByText("Add Interest"));
    });

    test("renders new interest input", () => {
      const newInterestInput =
        screen.getAllByPlaceholderText("Enter Interest...")[1];
      expect(newInterestInput).toBeInTheDocument();
    });

    test("updates new interest input value", () => {
      const newInterestInput =
        screen.getAllByPlaceholderText("Enter Interest...")[1];
      fireEvent.change(newInterestInput, { target: { value: "History" } });
      expect(newInterestInput.value).toBe("History");
    });
  });

  describe("filling out existing interest input", () => {
    beforeEach(() => {
      render(
        <InterestsInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={formData}
        />,
      );
    });

    test("updates existing interest input value", () => {
      const initialInterestInput =
        screen.getByPlaceholderText("Enter Interest...");
      fireEvent.change(initialInterestInput, { target: { value: "Coffee" } });
      expect(initialInterestInput.value).toBe("Coffee");
    });
  });

  describe("removing interests", () => {
    test("removes input element when remove button is clicked", async () => {
      render(
        <InterestsInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={formData}
        />,
      );

      // Initially, there should be only one interest input and no remove button -
      // The first input will not have a remove button, just any manually added ones
      const initialInterestInputs =
        screen.getAllByPlaceholderText("Enter Interest...");
      expect(initialInterestInputs.length).toBe(1);
      expect(screen.queryByText("Remove")).not.toBeInTheDocument();

      // Add two more interests
      fireEvent.click(screen.getByText("Add Interest"));
      fireEvent.click(screen.getByText("Add Interest"));

      // Fill out the interests
      const interestInputs =
        screen.getAllByPlaceholderText("Enter Interest...");
      fireEvent.change(interestInputs[0], { target: { value: "Hiking" } });
      fireEvent.change(interestInputs[1], { target: { value: "Coffee" } });
      fireEvent.change(interestInputs[2], { target: { value: "Tea" } });

      // There should now be 3 interests and 2 remove buttons
      expect(interestInputs.length).toBe(3);
      const removeButtons = screen.getAllByText("Remove");
      expect(removeButtons.length).toBe(2);

      // Remove the second interest ('Coffee')
      fireEvent.click(removeButtons[0]);

      // Wait for the 'Coffee' input to be removed from the document
      await waitFor(() => {
        expect(screen.queryByDisplayValue("Coffee")).not.toBeInTheDocument();
      });

      // Ensure that the remaining interests ('Hiking' and 'Tea') are still present
      expect(screen.getByDisplayValue("Hiking")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Tea")).toBeInTheDocument();

      // Verify that the number of remove buttons has been reduced to 1 after removal
      const updatedRemoveButtons = screen.getAllByText("Remove");
      expect(updatedRemoveButtons.length).toBe(1);
    });
  });

  describe("submitting the form", () => {
    beforeEach(() => {
      render(
        <InterestsInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={formData}
        />,
      );
      const remainingInterestInputs =
        screen.getAllByPlaceholderText("Enter Interest...");
      fireEvent.change(remainingInterestInputs[0], {
        target: { value: "Parks" },
      });
    });

    test("calls nextStep with updated interests", () => {
      const nextButton = screen.getByText("Next");
      fireEvent.click(nextButton);
      expect(mockNextStep).toHaveBeenCalledWith({ interests: ["Parks"] });
    });
  });

  describe("back button", () => {
    beforeEach(() => {
      render(
        <InterestsInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={formData}
        />,
      );
    });

    test("calls backStep", () => {
      const backButton = screen.getByText("Back");
      fireEvent.click(backButton);
      expect(mockBackStep).toHaveBeenCalled();
    });
  });
});
