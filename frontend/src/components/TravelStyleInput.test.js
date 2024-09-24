import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TravelStyleInput from "./TravelStyleInput";

describe("TravelStyleInput", () => {
  const mockNextStep = jest.fn();
  const mockBackStep = jest.fn();

  beforeEach(() => {
    mockNextStep.mockReset();
    mockBackStep.mockReset();
  });

  const renderTravelStyleInput = (formData) => {
    render(
      <TravelStyleInput
        nextStep={mockNextStep}
        backStep={mockBackStep}
        formData={formData}
      />,
    );
  };

  describe("initial rendering", () => {
    it("renders with correct initial value and that options are rendered correctly", () => {
      const formData = { travelStyle: "laid-back" };
      renderTravelStyleInput(formData);

      const selectElement = screen.getByTestId("travel-style");
      expect(selectElement.value).toBe("laid-back");

      expect(screen.getByText("Laid Back")).toBeInTheDocument();
      expect(screen.getByText("See as much as possible")).toBeInTheDocument();
      expect(screen.getByText("I Don't Mind")).toBeInTheDocument();
    });

    it("renders with empty formData object", () => {
      const formData = {};
      renderTravelStyleInput(formData);

      const selectElement = screen.getByTestId("travel-style");
      expect(selectElement.value).toBe("laid-back");
    });

    it("renders with invalid value in formData object", () => {
      const formData = { travelStyle: " invalid-value" };
      renderTravelStyleInput(formData);

      const selectElement = screen.getByTestId("travel-style");
      expect(selectElement.value).toBe("laid-back");
    });
  });

  describe("user interaction", () => {
    it("calls nextStep function with correct value when user selects different option", () => {
      const formData = { travelStyle: "laid-back" };
      renderTravelStyleInput(formData);

      const selectElement = screen.getByTestId("travel-style");
      fireEvent.change(selectElement, { target: { value: "everything" } });
      expect(selectElement.value).toBe("everything");

      const nextButton = screen.getByText("Let's Go!");
      fireEvent.click(nextButton);
      expect(mockNextStep).toHaveBeenCalledTimes(1);
      expect(mockNextStep).toHaveBeenCalledWith({"travelStyle": "everything"});
    });

    it("calls backStep function when user clicks back button", () => {
      const formData = { travelStyle: "laid-back" };
      renderTravelStyleInput(formData);

      const backButton = screen.getByText("Back");
      fireEvent.click(backButton);
      expect(mockBackStep).toHaveBeenCalledTimes(1);
    });
  });
});
