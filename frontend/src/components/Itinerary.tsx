import React, { useEffect, useState } from "react";
import { AIResponse, ItineraryData, Event } from "../types/api/index";

type ItineraryProps = {
  aiResponse: AIResponse | null;
  resetStep: () => void;
  error: string | null;
}

const Itinerary: React.FC<ItineraryProps> = ({ aiResponse, resetStep, error }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [parsedResponse, setParsedResponse] = useState<ItineraryData | null>(null);

  useEffect(() => {
    if (aiResponse || error) {
      setIsGenerating(false);

      if (aiResponse?.result) {
        setParsedResponse(aiResponse.result as ItineraryData);
      }
    }
  }, [aiResponse, error]);

  
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h4 className="block text-gray-700 font-extrabold mb-2 text-xl sm:text-2xl md:text-4xl text-center sm:text-left mb-8">
          Generating Itinerary...
        </h4>
        <div
          role="status"
          className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center p-8">
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

        <h3 className="text-2xl md:text-4xl text-red-500 text-center font-semibold my-4">
          ERROR:
        </h3>
        <p className="text-red-500 text-center text-lg" role="alert">
          {error}
        </p>
        <button
          onClick={resetStep}
          className="mt-8 px-6 py-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md m-2 px-6 py-4 sm:p-8">
      {parsedResponse && (
        <>
          <h3 className="text-3xl md:text-4xl text-center font-semibold mb-4">
            YOUR ITINERARY:
          </h3>
          <hr className="my-4" />
          <p className="mb-4 text-md sm:text-lg">
            {parsedResponse.introduction}
          </p>
          <h3 className="text-xl font-semibold mb-2">EVENTS:</h3>
          <ul className="max-w-screen-md m-2">
            {parsedResponse.events ? (
              parsedResponse.events.length > 0 ? (
                parsedResponse.events.map((event: Event, index: number) => (
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
                    <h4 className="font-display text-xl font-semibold text-sky-500 mt-2 mb-4">
                      {event.title}
                    </h4>
                    <p className="text-md">{event.description}</p>
                  </li>
                ))
              ) : (
                <li className="text-red-500">No events found.</li>
              )
            ) : (
              <li className="text-red-500">No events found.</li>
            )}
          </ul>
          <hr className="mt-10 mb-6"></hr>
          <p className="mt-4 text-md sm:text-lg">
            {parsedResponse.travelMethods}
          </p>
        </>
      )}
      <button
        onClick={resetStep}
        className="flex justify-center items-center mt-8 px-6 py-2 bg-blue-500 text-white rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="me-1 size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
          />
        </svg>

        <span>Start Over</span>
      </button>
    </div>
  );
};

export default Itinerary;
