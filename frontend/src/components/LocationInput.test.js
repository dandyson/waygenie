import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LocationInput from "./LocationInput";

describe("LocationInput", () => {
  const formData = { location: "London" };
  const mockNextStep = jest.fn();

  describe("initial rendering", () => {
    test("renders with initial value from formData", () => {
      render(<LocationInput formData={formData} nextStep={mockNextStep} />);
      const input = screen.getByPlaceholderText("Enter a location...");
      expect(input.value).toBe("London");
    });
  });

  describe("user interaction", () => {
    test("updates input value and calls nextStep on submit", () => {
      render(
        <LocationInput formData={{ location: "" }} nextStep={mockNextStep} />,
      );
      const input = screen.getByPlaceholderText("Enter a location...");
      fireEvent.change(input, { target: { value: "Paris" } });
      expect(input.value).toBe("Paris");
      const nextButton = screen.getByText("Next");
      fireEvent.click(nextButton);
      expect(mockNextStep).toHaveBeenCalledWith("Paris");
    });

    test("does not call nextStep if input is empty", () => {
      render(
        <LocationInput formData={{ location: "" }} nextStep={mockNextStep} />,
      );
      const nextButton = screen.getByText("Next");
      fireEvent.click(nextButton);
      expect(mockNextStep).not.toHaveBeenCalled();
    });

    test("updates input value when formData changes", () => {
      const { rerender } = render(
        <LocationInput formData={formData} nextStep={mockNextStep} />,
      );
      const input = screen.getByPlaceholderText("Enter a location...");
      expect(input.value).toBe("London");
      const updatedFormData = { location: "New York" };
      rerender(
        <LocationInput formData={updatedFormData} nextStep={mockNextStep} />,
      );
      expect(input.value).toBe("New York");
    });
  });
});
