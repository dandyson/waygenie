import "./App.css";
import React, { useState } from "react";
import LocationInput from "./components/LocationInput";
import DateTimeInput from "./components/DateTimeInput";
import InterestsInput from "./components/InterestsInput";
import TravelStyleInput from "./components/TravelStyleInput";
import Itinerary from "./components/Itinerary";
import fetchItinerary from "./api/fetchItinerary";

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    interests: [],
    travelStyle: "",
  });
  const [aiResponse, setAiResponse] = useState(null);

  const nextStep = async (data) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    if (step === 4) {
      setStep(5); // Move to step 5 to show the spinner

      const response = await fetchItinerary(updatedFormData);

      try {
        const parsedResponse =
          typeof response === "string" ? JSON.parse(response) : response;
        setAiResponse(parsedResponse);
      } catch (err) {
        console.error("Error parsing itinerary response:", err);
        setAiResponse(null);
      }
    } else {
      setStep(step + 1);
    }
  };

  const backStep = () => {
    setStep(step - 1);
  };

  const resetStep = () => {
    setStep(1);
    setFormData({
      location: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      interests: [],
      travelStyle: "",
    });
    setAiResponse(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[linear-gradient(0deg,_rgba(0,141,252,1)_0%,_rgba(4,4,247,1)_0%,_rgba(0,99,255,1)_100%)]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        {(() => {
          switch (step) {
            case 1:
              return <LocationInput formData={formData} nextStep={nextStep} />;
            case 2:
              return (
                <DateTimeInput
                  formData={formData}
                  nextStep={nextStep}
                  backStep={backStep}
                />
              );
            case 3:
              return (
                <InterestsInput
                  formData={formData}
                  nextStep={nextStep}
                  backStep={backStep}
                />
              );
            case 4:
              return (
                <TravelStyleInput
                  formData={formData}
                  nextStep={nextStep}
                  backStep={backStep}
                />
              );
            case 5:
              return (
                <Itinerary aiResponse={aiResponse} resetStep={resetStep} />
              );
            default:
              return <LocationInput formData={formData} nextStep={nextStep} />;
          }
        })()}
      </div>
    </div>
  );
};

export default App;
