import React, { useState } from 'react';

const DateTimeInput = ({ nextStep, backStep }) => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && startTime && endDate && endTime) {
      nextStep({
        startTime: `${startDate}T${startTime}`,
        endTime: `${endDate}T${endTime}`,
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
          stroke-width="1.5"
          stroke="currentColor"
          className="w-12 h-12 text-blue-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <form
        className="flex flex-col items-center w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 text-center">
          <h4
            className="block text-gray-700 font-extrabold mb-2 text-3xl"
          >
            When will you be visiting?
          </h4>
          <p className="mb-6">Please provide a start and end date for your trip, including the times</p>
        </div>
        <div className="flex flex-col items-center w-full">
  <div className="flex items-center space-x-4 mb-4 w-full max-w-md">
    <div className="flex flex-col w-1/2">
      <label htmlFor="start-date" className="block text-gray-700 text-sm font-medium mb-1">Start Date:</label>
      <input
        id="start-date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
      />
      <label htmlFor="start-time" className="block text-gray-700 text-sm font-medium mb-1">Start Time:</label>
      <input
        id="start-time"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="flex items-center">
      <p className="text-gray-700">To</p>
    </div>
    <div className="flex flex-col w-1/2">
      <label htmlFor="end-date" className="block text-gray-700 text-sm font-medium mb-1">End Date:</label>
      <input
        id="end-date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
      />
      <label htmlFor="end-time" className="block text-gray-700 text-sm font-medium mb-1">End Time:</label>
      <input
        id="end-time"
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  </div>
</div>

        <div className="flex items-center justify-between w-full mt-6">
          <button
            type="button"
            className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default DateTimeInput;
