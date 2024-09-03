import React, { useState } from 'react';

const InterestsInput = ({ nextStep, backStep }) => {
  const [interest1, setInterest1] = useState('');
  const [interest2, setInterest2] = useState('');
  const [interest3, setInterest3] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collecting all interests in an array
    const interests = [interest1, interest2, interest3].filter(Boolean);
    if (interests.length > 0) {
      nextStep(interests);
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
            d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
          />
        </svg>
      </div>
      <form
        className="flex flex-col items-center w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 w-full">
          <div className="text-center mb-6">
            <h4
              className="block text-gray-700 font-extrabold mb-2 text-3xl"
            >
              What are your interests?
            </h4>
            <small>For example: Coffee, Hiking, Art, etc..</small>
          </div>
          <input
            id="interest1"
            type="text"
            value={interest1}
            onChange={(e) => setInterest1(e.target.value)}
            placeholder="Enter Interest 1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 w-full">
          <input
            id="interest2"
            type="text"
            value={interest2}
            onChange={(e) => setInterest2(e.target.value)}
            placeholder="Enter Interest 2"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 w-full">
          <input
            id="interest3"
            type="text"
            value={interest3}
            onChange={(e) => setInterest3(e.target.value)}
            placeholder="Enter Interest 3"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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

export default InterestsInput;
