import "./App.css";
import React, { useState } from "react";
import Login from "./components/Login";
import LocationInput from "./components/LocationInput";
import DateTimeInput from "./components/DateTimeInput";
import InterestsInput from "./components/InterestsInput";
import TravelStyleInput from "./components/TravelStyleInput";
import Itinerary from "./components/Itinerary";
import fetchItinerary from "./api/fetchItinerary";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/NavBar";

const App = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const nextStep = async (data) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    if (step === 4) {
      setStep(5); // Move to step 5 to show the spinner
      setError(null);

      try {
        const token = await getAccessTokenSilently();
        const response = await fetchItinerary(updatedFormData, token);
        const parsedResponse =
          typeof response === "string" ? JSON.parse(response) : response;
        setAiResponse(parsedResponse);
      } catch (err) {
        console.error("Error parsing itinerary response:", err);
        setError(
          "There was an error generating your itinerary - please try again.",
        );
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
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <div className="min-h-screen flex items-center justify-center p-8 bg-[linear-gradient(0deg,_rgba(0,141,252,1)_0%,_rgba(4,4,247,1)_0%,_rgba(0,99,255,1)_100%)]">
              <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                {(() => {
                  switch (step) {
                    case 1:
                      return (
                        <LocationInput
                          formData={formData}
                          nextStep={nextStep}
                        />
                      );
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
                        <Itinerary
                          aiResponse={aiResponse}
                          resetStep={resetStep}
                          error={error}
                        />
                      );
                    default:
                      return (
                        <LocationInput
                          formData={formData}
                          nextStep={nextStep}
                        />
                      );
                  }
                })()}
              </div>
            </div>
          </>
        }
      />
    </Routes>
  );
};

export default App;
