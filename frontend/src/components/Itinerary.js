import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Itinerary = ({ aiResponse, resetStep }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState(null);
  const [parsedResponse, setParsedResponse] = useState(null);

  useEffect(() => {
    if (aiResponse) {
      setIsGenerating(false);

      console.log(aiResponse);

      try {
        // If aiResponse is a string, try to parse it into an object
        const parsed =
          typeof aiResponse === "string" ? JSON.parse(aiResponse) : aiResponse;
        setParsedResponse(parsed);

        // Check for errors in the parsed response
        if (parsed.error) {
          setError(parsed.error);
        } else {
          setError(null); // Clear error if response is valid
        }
      } catch (err) {
        // Handle JSON parsing errors
        setError("There was an error processing the itinerary.");
        setParsedResponse(null);
      }
    }
  }, [aiResponse]);

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h4 className="block text-gray-700 font-extrabold mb-2 text-3xl mb-8">
          Generating Itinerary...
        </h4>
        <div
          role="status"
          className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"
        ></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md m-8">
      {error ? (
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="red"
            className="size-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <h3 className="text-3xl text-red-500 text-center font-semibold my-4">
            ERROR:
          </h3>
          <p className="text-red-500 text-center text-lg">
            There was an error generating your itinerary - please try again.
          </p>
        </div>
      ) : (
        parsedResponse && (
          <>
            <h3 className="text-3xl text-center font-semibold mb-4">
              YOUR ITINERARY:
            </h3>
            <hr className="my-4" />
            <p className="mb-4">{parsedResponse.introduction}</p>
            <h3 className="text-xl font-semibold mb-2">EVENTS:</h3>
            <ul className="m-8 max-w-screen-md">
              {parsedResponse.events ? (
                parsedResponse.events.length > 0 ? (
                  parsedResponse.events.map((event, index) => (
                    <li
                      key={index}
                      className="group relative flex flex-col pb-8 pl-7 last:pb-0"
                    >
                      <div className="absolute bottom-0 left-[calc(0.25rem-0.5px)] top-0 w-px bg-blue-700/10 group-first:top-3"></div>
                      <div className="absolute left-0 top-2 h-2 w-2 rounded-full border border-sky-300 bg-zinc-950"></div>
                      <p className="font-bold tracking-[0.1em] text-lg">
                        {event.time}
                      </p>
                      <hr className="my-2" />
                      <h4 className="mt-2 font-display text-2xl font-semibold text-sky-500">
                        {event.title}
                      </h4>
                      <p>{event.description}</p>
                    </li>
                  ))
                ) : (
                  <li className="text-red-500">No events found.</li>
                )
              ) : (
                <li className="text-red-500">No events found.</li>
              )}
            </ul>
            <p className="mt-4">{parsedResponse.travelMethods}</p>
          </>
        )
      )}
      <button
        onClick={resetStep}
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Start Over
      </button>
    </div>
  );
};

Itinerary.propTypes = {
  aiResponse: PropTypes.oneOfType([
    PropTypes.shape({
      introduction: PropTypes.string.isRequired,
      events: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        }),
      ).isRequired,
      travelMethods: PropTypes.string.isRequired,
      error: PropTypes.string,
    }),
    PropTypes.oneOf([null]),
  ]),
  resetStep: PropTypes.func.isRequired,
};

export default Itinerary;
