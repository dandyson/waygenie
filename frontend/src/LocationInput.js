import React, { useEffect, useState } from 'react';

const LocationInput = ({ formData, nextStep }) => {
  const [location, setLocation] = useState(formData.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      nextStep(location);
    }
  };

  useEffect(() => {
    setLocation(formData.location);
  }, [formData.location]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
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
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
          />
        </svg>
      </div>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 text-center">
          <h4
            className="block text-gray-700 font-extrabold mb-2 text-3xl"
          >
            Where are you going?
          </h4>
          <p className="mb-4">Please enter a city that you plan to visit</p>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter a location..."
          />
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationInput;
