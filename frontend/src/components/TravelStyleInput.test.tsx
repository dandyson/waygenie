import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TravelStyleInput from "./TravelStyleInput";
import { TripFormData } from "../types/api";

describe("TravelStyleInput", () => {
  const mockNextStep = jest.fn().mockResolvedValue(undefined);
  const mockBackStep = jest.fn();

  beforeEach(() => {
    mockNextStep.mockReset();
    mockBackStep.mockReset();
  });

  const renderTravelStyleInput = (formData: Partial<TripFormData>) => {
    const defaultFormData: TripFormData = {
      location: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      interests: [],
      travelStyle: "laid-back",
    };

    render(
      <TravelStyleInput
        nextStep={mockNextStep}
        backStep={mockBackStep}
        formData={{ ...defaultFormData, ...formData }}
      />,
    );
  };

  describe("initial rendering", () => {
    it("renders with correct initial value and that options are rendered correctly", () => {
      const formData = { travelStyle: "laid-back" };
      renderTravelStyleInput(formData);

      const selectElement = screen.getByTestId("travel-style") as HTMLSelectElement;
      expect(selectElement.value).toBe("laid-back");

      expect(screen.getByText("Laid Back")).toBeInTheDocument();
      expect(screen.getByText("See as much as possible")).toBeInTheDocument();
      expect(screen.getByText("I Don't Mind")).toBeInTheDocument();
    });

    it("renders with empty formData object", () => {
      const formData = {};
      renderTravelStyleInput(formData);

      const selectElement = screen.getByTestId("travel-style") as HTMLSelectElement;
      expect(selectElement.value).toBe("laid-back");
    });

    it("renders with invalid value in formData object", () => {
      const formData = { travelStyle: " invalid-value" };
      renderTravelStyleInput(formData);

      const selectElement = screen.getByTestId("travel-style") as HTMLSelectElement;
      expect(selectElement.value).toBe("laid-back");
    });
  });

  describe("user interaction", () => {
    it("handles travel style selection and form submission", () => {
      const formData = { travelStyle: "laid-back" };
      renderTravelStyleInput(formData);

      const selectElement = screen.getByTestId("travel-style") as HTMLSelectElement;
      fireEvent.change(selectElement, { target: { value: "everything" } });
      fireEvent.click(screen.getByText("Let's Go!"));

      expect(mockNextStep).toHaveBeenCalledWith({
        ...formData,
        travelStyle: "everything",
      });
    });

    it("calls backStep when back button is clicked", () => {
      const formData = { travelStyle: "laid-back" };
      renderTravelStyleInput(formData);

      fireEvent.click(screen.getByText("Back"));
      expect(mockBackStep).toHaveBeenCalled();
    });
  });
});
