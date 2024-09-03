import React, { useState } from 'react';

const TravelStyleInput = ({ nextStep, backStep }) => {
  const [travelStyle, setTravelStyle] = useState('');

  const handleChange = (e) => {
    setTravelStyle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (travelStyle) {
      nextStep(travelStyle);
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
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </div>
      <form
        className="flex flex-col items-center w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-6">
          <h4
            className="block text-gray-700 font-extrabold mb-2 text-3xl"
          >
            What's your travelling style?
          </h4>
          <small className="text-gray-600">
            Choose the style that best fits your travel preferences.
          </small>
        </div>
        <div className="mb-4 w-full">
          <select
            name="travel-style"
            id="travel-style"
            value={travelStyle}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="laid-back">Laid Back</option>
            <option value="everything">See as much as possible</option>
            <option value="none">I Don't Mind</option>
          </select>
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

export default TravelStyleInput;
