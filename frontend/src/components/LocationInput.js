import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const UK_CITIES = {
  England: [
    "Bristol",
    "Leeds",
    "Leicester",
    "Newcastle",
    "Nottingham",
    "Plymouth",
    "Portsmouth",
    "Sheffield",
    "Southampton",
  ],
  Scotland: ["Aberdeen", "Dundee", "Glasgow", "Inverness", "Perth", "Stirling"],
  Wales: ["Bangor", "Cardiff", "Newport", "Swansea"],
  "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newry"],
  "Historical Cities": [
    "Canterbury",
    "Durham",
    "Exeter",
    "Chester",
    "Winchester",
    "St Albans",
    "Stratford-upon-Avon",
    "Windsor",
  ],
};

const POPULAR_UK_CITIES = [
  "London",
  "Edinburgh",
  "Manchester",
  "Birmingham",
  "Liverpool",
  "York",
  "Bath",
  "Cambridge",
  "Oxford",
  "Brighton",
];

const LocationInput = ({ formData, nextStep }) => {
  const [location, setLocation] = useState(formData.location);
  const [showOtherCities, setShowOtherCities] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      nextStep({ location });
    }
  };

  useEffect(() => {
    setLocation(formData.location);
  }, [formData.location]);

  const handleOtherCitiesClick = () => {
    setShowOtherCities(true);
    // Set the first city from England as default selection
    if (!location || POPULAR_UK_CITIES.includes(location)) {
      setLocation(UK_CITIES.England[0]);
    }
  };

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
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="mb-4 text-center">
          <h4 className="block text-gray-700 font-extrabold mb-2 text-3xl">
            Where are you going?
          </h4>

          <p className="mb-4">Select a UK city to visit</p>

          {/* Desktop View - Radio Buttons */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              {POPULAR_UK_CITIES.map((city) => (
                <label
                  key={city}
                  className={`
                    flex items-center justify-center p-3 border cursor-pointer transition-colors
                    ${
                      location === city
                        ? "bg-blue-500 hover:bg-blue-700 text-white font-bold"
                        : "bg-white hover:bg-blue-100 text-blue-500"
                    }
                    rounded focus:outline-none focus:shadow-outline
                  `}
                >
                  <input
                    type="radio"
                    name="location"
                    value={city}
                    checked={location === city}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setShowOtherCities(false);
                    }}
                    className="absolute opacity-0 w-0 h-0" // Visually hidden but functionally present
                    aria-label={`Select ${city}`}
                  />
                  {city}
                </label>
              ))}
            </div>
            <div className="flex justify-center">
              <label
                className={`
                  flex items-center justify-center w-48 p-3 border cursor-pointer transition-colors
                  ${
                    showOtherCities
                      ? "bg-blue-500 hover:bg-blue-700 text-white font-bold"
                      : "bg-white hover:bg-blue-100 text-blue-500"
                  }
                  rounded focus:outline-none focus:shadow-outline
                `}
              >
                <input
                  type="radio"
                  name="location"
                  checked={showOtherCities}
                  onChange={handleOtherCitiesClick}
                  className="hidden"
                />
                Other Cities
              </label>
            </div>

            {showOtherCities && (
              <div className="mt-4">
                <select
                  data-testid="desktop-dropdown"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {Object.entries(UK_CITIES).map(([region, cities]) => (
                    <optgroup key={region} label={region}>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Mobile View */}
          <div className="md:hidden w-full">
            <select
              data-testid="mobile-dropdown"
              className="shadow border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select a city...</option>
              <optgroup label="Popular Destinations">
                {POPULAR_UK_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </optgroup>
              {Object.entries(UK_CITIES).map(([region, cities]) => (
                <optgroup key={region} label={region}>
                  {cities.sort().map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
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

LocationInput.propTypes = {
  formData: PropTypes.shape({
    location: PropTypes.string,
  }).isRequired,
  nextStep: PropTypes.func.isRequired,
  backStep: PropTypes.func,
};

export default LocationInput;
