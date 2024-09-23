import React, { useState, useEffect } from 'react';

const Itinerary = ({ aiResponse, resetStep }) => {
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (aiResponse) {
      setIsGenerating(false);  // Stop loading spinner when AI response arrives
    }
  }, [aiResponse]);

  const reloadPage = () => {
    window.location.reload();
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
          <div dangerouslySetInnerHTML={
            { __html: aiResponse }
          }></div>
          <div>{aiResponse}</div>
          <hr className="mt-4 mb-8"></hr>







          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={resetStep}
              className="flex items-center bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
              <span className="ms-2">Edit Itinerary</span>
            </button>
            <button
              type="button"
              onClick={reloadPage}
              className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="ms-2">Generate New Itinerary</span>
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
