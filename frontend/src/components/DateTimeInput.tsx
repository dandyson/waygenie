import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DateTimeInput = ({ nextStep, backStep, formData }) => {
  const [startDate, setStartDate] = useState(formData.startDate || "");
  const [startTime, setStartTime] = useState(formData.startTime || "");
  const [endDate, setEndDate] = useState(formData.endDate || "");
  const [endTime, setEndTime] = useState(formData.endTime || "");

  useEffect(() => {
    if (!startDate || !startTime || !endDate || !endTime) {
      const now = new Date();
      const formattedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD format
      const formattedTime = now.toTimeString().split(" ")[0].slice(0, 5); // HH:MM format

      if (!startDate) setStartDate(formData.startDate || formattedDate);
      if (!startTime) setStartTime(formData.startTime || formattedTime);

      const endDateObj = new Date(now.getTime() + 60 * 60 * 1000); // Add one hour
      const endDateFormatted = endDateObj.toISOString().split("T")[0]; // YYYY-MM-DD format
      const endTimeFormatted = endDateObj
        .toTimeString()
        .split(" ")[0]
        .slice(0, 5); // HH:MM format

      if (!endDate) setEndDate(formData.endDate || endDateFormatted);
      if (!endTime) setEndTime(formData.endTime || endTimeFormatted);
    }
  }, [startDate, startTime, endDate, endTime, formData]);

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    // Only set end date to the same as start date if the new start date is after the current end date
    if (newStartDate > endDate) {
      setEndDate(newStartDate); // Set end date to the same as start date
    }

    // Calculate end time as one hour after the start time
    if (startTime) {
      const [hours, minutes] = startTime.split(":").map(Number);
      const endDateTime = new Date(newStartDate);
      endDateTime.setHours(hours + 1, minutes); // Set end time to one hour later
      setEndTime(endDateTime.toTimeString().split(" ")[0].slice(0, 5)); // Format to HH:MM
    }
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);

    // Only update end time if it is not set or if the new start time is later than the current end time
    if (!endTime || newStartTime >= endTime) {
      // Calculate end time as one hour after the start time
      if (startDate) {
        const [hours, minutes] = newStartTime.split(":").map(Number);
        const endDateTime = new Date(startDate);
        endDateTime.setHours(hours + 1, minutes); // Set end time to one hour later
        setEndTime(endDateTime.toTimeString().split(" ")[0].slice(0, 5)); // Format to HH:MM
      }
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);

    // Check if the new end date is before the start date
    if (newEndDate < startDate) {
      setStartDate(newEndDate); // Set start date to the same as end date
      // Calculate start time to be one hour before the end time if end time is set
      if (endTime) {
        const [hours, minutes] = endTime.split(":").map(Number);
        const startDateTime = new Date(newEndDate);
        startDateTime.setHours(hours - 1, minutes); // Set start time to one hour earlier
        setStartTime(startDateTime.toTimeString().split(" ")[0].slice(0, 5)); // Format to HH:MM
      }
    }
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);

    // Check if the new end time is before the start time
    if (startDate && newEndTime < startTime) {
      const [hours, minutes] = newEndTime.split(":").map(Number);
      const startDateTime = new Date(startDate);
      startDateTime.setHours(hours - 1, minutes); // Set start time to one hour earlier
      setStartTime(startDateTime.toTimeString().split(" ")[0].slice(0, 5)); // Format to HH:MM
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && startTime && endDate && endTime) {
      nextStep({
        startDate: `${startDate}`,
        startTime: `${startTime}`,
        endDate: `${endDate}`,
        endTime: `${endTime}`,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <form
        className="flex flex-col items-center w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 text-center">
          <h4 className="block text-gray-700 font-extrabold mb-2 text-2xl md:text-4xl">
            When will you be visiting?
          </h4>
          <p className="mb-4 text-lg">
            Please provide a start and end date for your trip, including the
            times
          </p>
        </div>
        <div className="flex flex-col w-full space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 md:space-y-0">
            <div className="flex flex-col w-full md:w-1/2">
              <label
                htmlFor="start-date"
                className="block text-gray-700 text-md font-medium mb-1"
              >
                Start Date:
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
              <label
                htmlFor="start-time"
                className="block text-gray-700 text-md font-medium mb-1"
              >
                Start Time:
              </label>
              <input
                id="start-time"
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center md:mx-4 my-4 md:my-0">
              <p className="text-gray-700 text-center">To:</p>
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label
                htmlFor="end-date"
                className="block text-gray-700 text-md font-medium mb-1"
              >
                End Date:
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
              <label
                htmlFor="end-time"
                className="block text-gray-700 text-md font-medium mb-1"
              >
                End Time:
              </label>
              <input
                id="end-time"
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-6">
          <button
            type="button"
            className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline back-button"
            onClick={backStep}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

DateTimeInput.propTypes = {
  nextStep: PropTypes.func.isRequired,
  backStep: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    startDate: PropTypes.string,
    startTime: PropTypes.string,
    endDate: PropTypes.string,
    endTime: PropTypes.string,
  }).isRequired,
};

export default DateTimeInput;
