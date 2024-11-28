import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LocationInput from "./LocationInput";

describe("LocationInput", () => {
  const formData = { location: "London" };
  const mockNextStep = jest.fn();

  describe("initial rendering", () => {
    test("renders with initial value from formData", () => {
      render(<LocationInput formData={formData} nextStep={mockNextStep} />);
      const londonRadio = screen.getByLabelText("London");
      expect(londonRadio).toBeChecked();
    });
  });

  describe("user interaction", () => {
    test("allows selecting a city via radio buttons and submits form", () => {
      render(<LocationInput formData={{ location: "" }} nextStep={mockNextStep} />);
      
      // Get and click London radio button
      const londonRadio = screen.getByLabelText("London");
      fireEvent.click(londonRadio);
      
      // Check if London is selected
      expect(londonRadio).toBeChecked();
      
      // Submit form and verify
      const nextButton = screen.getByText("Next");
      fireEvent.click(nextButton);
      expect(mockNextStep).toHaveBeenCalledWith({ location: "London" });
    });
  
    test("shows dropdown when 'Other Cities' is selected", () => {
      render(<LocationInput formData={{ location: "" }} nextStep={mockNextStep} />);
      
      // Initially, dropdown should not be visible
      expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
      
      // Click 'Other Cities' radio
      const otherRadio = screen.getByLabelText("Other Cities");
      fireEvent.click(otherRadio);
      
      // Check if Other Cities is selected
      expect(otherRadio).toBeChecked();
      
      // Check if dropdown appeared
      const dropdown = screen.getByRole("combobox");
      expect(dropdown).toBeInTheDocument();
      
      // Verify some cities are in the dropdown
      const options = screen.getAllByRole("option");
      expect(options.some(option => option.textContent === "Bristol")).toBeTruthy();
      expect(options.some(option => option.textContent === "Glasgow")).toBeTruthy();
    });
  
    test("selecting a city from dropdown works correctly", () => {
      render(<LocationInput formData={{ location: "" }} nextStep={mockNextStep} />);
      
      // Click 'Other Cities' radio to show dropdown
      fireEvent.click(screen.getByLabelText("Other Cities"));
      
      // Select a city from dropdown
      const dropdown = screen.getByRole("combobox");
      fireEvent.change(dropdown, { target: { value: "Bristol" } });
      
      // Submit form and verify
      const nextButton = screen.getByText("Next");
      fireEvent.click(nextButton);
      expect(mockNextStep).toHaveBeenCalledWith({ location: "Bristol" });
    });
  
    test("radio selection changes when different cities are clicked", () => {
      render(<LocationInput formData={{ location: "" }} nextStep={mockNextStep} />);
      
      // Click London
      const londonRadio = screen.getByLabelText("London");
      fireEvent.click(londonRadio);
      expect(londonRadio).toBeChecked();
      
      // Click Manchester
      const manchesterRadio = screen.getByLabelText("Manchester");
      fireEvent.click(manchesterRadio);
      expect(manchesterRadio).toBeChecked();
      expect(londonRadio).not.toBeChecked();
    });

    test("does not call nextStep if no location is selected", () => {
      render(<LocationInput formData={{ location: "" }} nextStep={mockNextStep} />);
      const nextButton = screen.getByText("Next");
      fireEvent.click(nextButton);
      expect(mockNextStep).not.toHaveBeenCalled();
    });

    test("updates selected location when formData changes", () => {
      const { rerender } = render(
        <LocationInput formData={{ location: "London" }} nextStep={mockNextStep} />
      );
      
      // Initial London radio should be checked
      expect(screen.getByLabelText("London")).toBeChecked();
      
      // Update formData to Manchester
      rerender(
        <LocationInput formData={{ location: "Manchester" }} nextStep={mockNextStep} />
      );
      
      // Manchester radio should now be checked
      expect(screen.getByLabelText("Manchester")).toBeChecked();
      expect(screen.getByLabelText("London")).not.toBeChecked();
    });
  });
});
