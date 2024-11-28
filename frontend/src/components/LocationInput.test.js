import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import LocationInput from "./LocationInput";

describe("LocationInput", () => {
  const mockNextStep = jest.fn();

  beforeEach(() => {
    mockNextStep.mockClear();
  });

  describe("initialization", () => {
    test("renders with initial value from formData", () => {
      render(
        <LocationInput
          formData={{ location: "London" }}
          nextStep={mockNextStep}
        />,
      );
      expect(screen.getByLabelText("London")).toBeChecked();
    });

    test("updates selected location when formData changes", () => {
      const { rerender } = render(
        <LocationInput
          formData={{ location: "London" }}
          nextStep={mockNextStep}
        />,
      );
      expect(screen.getByLabelText("London")).toBeChecked();

      rerender(
        <LocationInput
          formData={{ location: "Manchester" }}
          nextStep={mockNextStep}
        />,
      );
      expect(screen.getByLabelText("Manchester")).toBeChecked();
      expect(screen.getByLabelText("London")).not.toBeChecked();
    });
  });

  describe("desktop view", () => {
    test("renders popular cities as radio buttons", () => {
      render(
        <LocationInput formData={{ location: "" }} nextStep={mockNextStep} />,
      );
      expect(screen.getByLabelText("London")).toBeInTheDocument();
      expect(screen.getByLabelText("Edinburgh")).toBeInTheDocument();
      expect(screen.getByLabelText("Manchester")).toBeInTheDocument();
    });

    test("allows switching between popular cities", () => {
      render(
        <LocationInput formData={{ location: "" }} nextStep={mockNextStep} />,
      );

      const londonRadio = screen.getByLabelText("London");
      fireEvent.click(londonRadio);
      expect(londonRadio).toBeChecked();

      const manchesterRadio = screen.getByLabelText("Manchester");
      fireEvent.click(manchesterRadio);
      expect(manchesterRadio).toBeChecked();
      expect(londonRadio).not.toBeChecked();
    });

    test("shows dropdown only when 'Other Cities' is selected", () => {
      render(
        <LocationInput formData={{ location: "" }} nextStep={mockNextStep} />,
      );

      expect(screen.queryByTestId("desktop-dropdown")).not.toBeInTheDocument();
      fireEvent.click(screen.getByLabelText("Other Cities"));

      const dropdown = screen.getByTestId("desktop-dropdown");
      expect(dropdown).toBeInTheDocument();

      const options = within(dropdown).getAllByRole("option");
      expect(
        options.some((option) => option.textContent === "Bristol"),
      ).toBeTruthy();
    });

    test("submits selected city from desktop dropdown", () => {
      render(
        <LocationInput formData={{ location: "" }} nextStep={mockNextStep} />,
      );

      fireEvent.click(screen.getByLabelText("Other Cities"));
      const dropdown = screen.getByTestId("desktop-dropdown");
      fireEvent.change(dropdown, { target: { value: "Bristol" } });
      fireEvent.click(screen.getByText("Next"));

      expect(mockNextStep).toHaveBeenCalledWith({ location: "Bristol" });
    });
  });

  describe("mobile view", () => {
    test("shows single dropdown with all cities", () => {
      render(
        <LocationInput formData={{ location: "" }} nextStep={mockNextStep} />,
      );

      const mobileDropdown = screen.getByTestId("mobile-dropdown");
      expect(mobileDropdown).toBeInTheDocument();

      const options = within(mobileDropdown).getAllByRole("option");
      expect(options[0]).toHaveValue("");
      expect(options[0]).toHaveTextContent("Select a city...");
      expect(
        options.some((option) => option.textContent === "London"),
      ).toBeTruthy();
      expect(
        options.some((option) => option.textContent === "Bristol"),
      ).toBeTruthy();
      expect(
        options.some((option) => option.textContent === "Edinburgh"),
      ).toBeTruthy();
    });

    test("submits selected city from mobile dropdown", () => {
      render(
        <LocationInput formData={{ location: "" }} nextStep={mockNextStep} />,
      );

      const mobileDropdown = screen.getByTestId("mobile-dropdown");
      fireEvent.change(mobileDropdown, { target: { value: "Bristol" } });
      fireEvent.click(screen.getByText("Next"));

      expect(mockNextStep).toHaveBeenCalledWith({ location: "Bristol" });
    });
  });

  describe("form submission", () => {
    test("doesn't submit if no location selected", () => {
      render(
        <LocationInput formData={{ location: "" }} nextStep={mockNextStep} />,
      );
      fireEvent.click(screen.getByText("Next"));
      expect(mockNextStep).not.toHaveBeenCalled();
    });

    test("submits selected popular city", () => {
      render(
        <LocationInput formData={{ location: "" }} nextStep={mockNextStep} />,
      );

      fireEvent.click(screen.getByLabelText("London"));
      fireEvent.click(screen.getByText("Next"));

      expect(mockNextStep).toHaveBeenCalledWith({ location: "London" });
    });
  });
});
