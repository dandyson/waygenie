import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateTimeInput from "./DateTimeInput";

describe("DateTimeInput", () => {
  // Mock values for formData
  let formData = {
    location: "ewf",
    startDate: "2024-09-05",
    startTime: "12:06",
    endDate: "2024-09-05",
    endTime: "13:06",
    interests: [],
    travelStyle: "",
  };

  describe("initial rendering", () => {
    test("renders DateTimeInput with default values", () => {
      render(
        <DateTimeInput
          nextStep={(data) => {
            return data;
          }}
          backStep={(data) => {
            return data;
          }}
          formData={formData}
        />,
      );
      const startDateInput = screen.getByLabelText("Start Date:");
      const startTimeInput = screen.getByLabelText("Start Time:");
      const endDateInput = screen.getByLabelText("End Date:");
      const endTimeInput = screen.getByLabelText("End Time:");
      expect(startDateInput.value).toBe(formData.startDate);
      expect(startTimeInput.value).toBe(formData.startTime);
      expect(endDateInput.value).toBe(formData.endDate);
      expect(endTimeInput.value).toBe(formData.endTime);
    });
  });

  describe("user interaction", () => {
    test("handles date and time changes and form submission", () => {
      const mockNextStep = jest.fn();
      const mockBackStep = jest.fn();
      render(
        <DateTimeInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={formData}
        />,
      );
      const startDateInput = screen.getByLabelText("Start Date:");
      const startTimeInput = screen.getByLabelText("Start Time:");
      const endDateInput = screen.getByLabelText("End Date:");
      const endTimeInput = screen.getByLabelText("End Time:");
      fireEvent.change(startDateInput, { target: { value: "2024-09-01" } });
      fireEvent.change(startTimeInput, { target: { value: "10:00" } });
      fireEvent.change(endDateInput, { target: { value: "2024-09-02" } });
      fireEvent.change(endTimeInput, { target: { value: "15:00" } });
      fireEvent.click(screen.getByText("Next"));
      expect(mockNextStep).toHaveBeenCalledWith({
        startDate: "2024-09-01",
        startTime: "10:00",
        endDate: "2024-09-02",
        endTime: "15:00",
      });
    });

    test("calls backStep when back button is clicked", () => {
      const mockNextStep = jest.fn();
      const mockBackStep = jest.fn();
      render(
        <DateTimeInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={formData}
        />,
      );
      fireEvent.click(screen.getByText("Back"));
      expect(mockBackStep).toHaveBeenCalled();
    });

    test("changing start time does not affect end time if end time is set", () => {
      const mockNextStep = jest.fn();
      render(
        <DateTimeInput
          nextStep={mockNextStep}
          backStep={() => {}}
          formData={formData}
        />,
      );

      const startTimeInput = screen.getByLabelText("Start Time:");
      const endTimeInput = screen.getByLabelText("End Time:");

      // Change start time to 10:00
      fireEvent.change(startTimeInput, { target: { value: "10:00" } });

      // Check that end time remains unchanged
      expect(endTimeInput.value).toBe("13:06");
    });

    test("changing end time to before start time updates start time", () => {
      const mockNextStep = jest.fn();
      render(
        <DateTimeInput
          nextStep={mockNextStep}
          backStep={() => {}}
          formData={formData}
        />,
      );

      const startTimeInput = screen.getByLabelText("Start Time:");
      const endTimeInput = screen.getByLabelText("End Time:");

      // Change end time to 11:00 (before the current start time of 12:06)
      fireEvent.change(endTimeInput, { target: { value: "11:00" } });

      // Check that start time is updated to 10:00 (one hour before the new end time)
      expect(startTimeInput.value).toBe("10:00");
    });

    test("changing end date to before start date updates start date", () => {
      const mockNextStep = jest.fn();
      render(
        <DateTimeInput
          nextStep={mockNextStep}
          backStep={() => {}}
          formData={formData}
        />,
      );

      const startDateInput = screen.getByLabelText("Start Date:");
      const endDateInput = screen.getByLabelText("End Date:");

      // Change end date to 2024-09-04 (before the current start date of 2024-09-05)
      fireEvent.change(endDateInput, { target: { value: "2024-09-04" } });

      // Check that start date is updated to the same as end date
      expect(startDateInput.value).toBe("2024-09-04");
    });

    test("calls backStep when back button is clicked", () => {
      const mockNextStep = jest.fn();
      const mockBackStep = jest.fn();
      render(
        <DateTimeInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={formData}
        />,
      );
      fireEvent.click(screen.getByText("Back"));
      expect(mockBackStep).toHaveBeenCalled();
    });
  });

  describe("rendering with provided formData", () => {
    test("renders DateTimeInput with provided formData", () => {
      const mockNextStep = jest.fn();
      const mockBackStep = jest.fn();
      const formData = {
        startDate: "2024-09-01",
        startTime: "08:00",
        endDate: "2024-09-02",
        endTime: "18:00",
      };
      render(
        <DateTimeInput
          nextStep={mockNextStep}
          backStep={mockBackStep}
          formData={formData}
        />,
      );
      const startDateInput = screen.getByLabelText("Start Date:");
      const startTimeInput = screen.getByLabelText("Start Time:");
      const endDateInput = screen.getByLabelText("End Date:");
      const endTimeInput = screen.getByLabelText("End Time:");
      expect(startDateInput.value).toBe(formData.startDate);
      expect(startTimeInput.value).toBe(formData.startTime);
      expect(endDateInput.value).toBe(formData.endDate);
      expect(endTimeInput.value).toBe(formData.endTime);
    });
  });
});
