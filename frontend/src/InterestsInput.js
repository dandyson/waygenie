import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const InterestsInput = ({ formData, nextStep, backStep }) => {
  const [interests, setInterests] = useState(
    formData.interests && formData.interests.length > 0
      ? formData.interests
      : [""],
  );

  useEffect(() => {
    // Sync formData.interests to local state if it's an array
    if (Array.isArray(formData.interests)) {
      setInterests(formData.interests.length > 0 ? formData.interests : [""]);
    }
  }, [formData.interests]);

  const handleChange = (index, value) => {
    const newInterests = [...interests];
    newInterests[index] = value;
    setInterests(newInterests);
  };

  const addInterest = () => {
    setInterests([...interests, ""]);
  };

  const removeInterest = (index) => {
    if (interests.length > 1) {
      const newInterests = interests.filter((_, i) => i !== index);
      setInterests(newInterests);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep({interests});
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="mb-2">
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

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h4 className="block text-gray-700 font-extrabold mb-2 text-3xl">
            Your Interests
          </h4>
          <p className="mb-4">Please provide your interests for the trip.</p>
        </div>
        {interests.map((interest, index) => (
          <div key={index} className="mb-4 flex items-center">
            <div className="w-full">
              <input
                type="text"
                value={interest}
                placeholder="Enter Interest..."
                onChange={(e) => handleChange(index, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Only show remove button if there's more than one interest */}
            {interests.length > 1 && index > 0 && (
              <button
                type="button"
                onClick={() => removeInterest(index)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addInterest}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Interest
        </button>
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

InterestsInput.propTypes = {
  formData: PropTypes.shape({
    interests: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  nextStep: PropTypes.func.isRequired,
  backStep: PropTypes.func.isRequired,
};

export default InterestsInput;
