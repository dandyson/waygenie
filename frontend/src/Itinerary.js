import React, { useState } from "react";
import PropTypes from "prop-types";

const Itinerary = ({ resetStep }) => {
  const [isGenerating] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div>
      {isGenerating ? (
        <div className="flex flex-col justify-center items-center text-center">
          <h4 className="block text-gray-700 font-extrabold mb-2 text-3xl mb-8">
            Generating Itinerary...
          </h4>
          <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
        </div>
      ) : (
        <div>
          <h2 className="text-center text-3xl font-bold">YOUR ITINERARY:</h2>
          <hr className="mt-4 mb-8"></hr>
          <ul className="m-8 max-w-screen-md">
            <li className="group relative flex flex-col pb-8 pl-7 last:pb-0">
              <div className="absolute bottom-0 left-[calc(0.25rem-0.5px)] top-0 w-px bg-blue-700/10 group-first:top-3"></div>
              <div className="absolute left-0 top-2 h-2 w-2 rounded-full border border-sky-300 bg-zinc-950"></div>
              <h3 className="mt-2 font-semibold text-2xl">
                LUNCH - Franco Mancas
              </h3>
              <p className="font-display text-2xs/6 order-first font-semibold tracking-[0.2em] text-sky-500">
                <time dateTime="2023-06-20T18:30-04:00">12:30 PM</time>
              </p>
              <p className="mt-0.5 text-md/6 text-zinc-400">
                Featuring a keynote presentation from Adam Wathan and live demos
                from community members like Sam Selikoff.
              </p>
            </li>
            <li className="group relative flex flex-col pb-8 pl-7 last:pb-0">
              <div className="absolute bottom-0 left-[calc(0.25rem-0.5px)] top-0 w-px bg-blue-700/10 group-first:top-3"></div>
              <div className="absolute left-0 top-2 h-2 w-2 rounded-full border border-sky-300 bg-zinc-950"></div>
              <h3 className="mt-2 font-semibold text-2xl">
                British Museum of Natural History
              </h3>
              <p className="font-display text-2xs/6 order-first font-semibold tracking-[0.2em] text-sky-500">
                <time dateTime="2023-06-20T17:30-04:00">2.00 PM</time>
              </p>
              <p className="mt-0.5 text-md/6 text-zinc-400">
                Settle in, grab some swag, and enjoy a drink with other members
                of the community before the keynote.
              </p>
            </li>
            <li className="group relative flex flex-col pb-8 pl-7 last:pb-0">
              <div className="absolute bottom-0 left-[calc(0.25rem-0.5px)] top-0 w-px bg-blue-700/10 group-first:top-3"></div>
              <div className="absolute left-0 top-2 h-2 w-2 rounded-full border border-sky-300 bg-zinc-950"></div>
              <h3 className="mt-2 font-semibold text-2xl">
                Catch the train home
              </h3>
              <p className="font-display text-2xs/6 order-first font-semibold tracking-[0.2em] text-sky-500">
                <time dateTime="2023-06-20T20:00-04:00">8:30 PM</time>
              </p>
              <p className="mt-0.5 text-md/6 text-zinc-400">
                Spend the rest of the evening making connections with other
                community members over canapés, snacks, and refreshments.
              </p>
            </li>
          </ul>
          <hr className="mt-4 mb-8"></hr>
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={resetStep}
              className="flex items-center bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              <span className="ms-2">Edit Itinerary</span>
            </button>
            <button
              type="submit"
              className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
            <button type="button" className="ms-2" onClick={reloadPage}>
              Generate New Itinerary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Itinerary.propTypes = {
  resetStep: PropTypes.func.isRequired,
};

export default Itinerary;
