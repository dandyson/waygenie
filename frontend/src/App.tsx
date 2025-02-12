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
import CookieNotice from "./components/CookieNotice";
import { TripFormData } from "./types/api/index";

const App = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<TripFormData>({
    location: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    interests: [] as string[],
    travelStyle: "",
  });
  const [aiResponse, setAiResponse] = useState(null);

  const backgroundStyle =
    "min-h-screen flex items-center justify-center p-8 bg-[linear-gradient(0deg,_rgba(0,141,252,1)_0%,_rgba(4,4,247,1)_0%,_rgba(0,99,255,1)_100%)]";

  if (isLoading) {
    return (
      <div className={backgroundStyle}>
        <div className="flex flex-col justify-center items-center bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-max">
          <h4 className="block text-gray-700 font-extrabold text-xl sm:text-2xl md:text-4xl text-center sm:text-left mb-8">
            Loading...
          </h4>
          <div
            role="status"
            className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"
          ></div>
        </div>
      </div> // Added closing div for the outer div
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Login />
        <CookieNotice />
      </>
    );
  }

  const nextStep = async (data: Partial<TripFormData>) => {
    const updatedFormData: TripFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    if (step === 4) {
      setStep(5); // Move to step 5 to show the spinner
      setError(null);

      try {
        const token = await getAccessTokenSilently();
        const response = await fetchItinerary(updatedFormData, token);

        // Parse the outer response if it's a string
        const parsedResponse =
          typeof response === "string" ? JSON.parse(response) : response;

        // Handle the 'result' field if it exists and is a string
        if (parsedResponse && typeof parsedResponse.result === "string") {
          parsedResponse.result = JSON.parse(parsedResponse.result);
        }

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
      interests: [] as string[],
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
            <NavBar resetStep={resetStep} />
            <div className={backgroundStyle}>
              <div className="bg-white p-1 sm:p-8 rounded-lg shadow-md w-full max-w-max">
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
            <CookieNotice />
          </>
        }
      />
    </Routes>
  );
};

export default App;
