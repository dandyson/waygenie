import './App.css';
import React, { useState } from 'react';
import LocationInput from './LocationInput';
import DateTimeInput from './DateTimeInput';
import InterestsInput from './InterestsInput';
import TravelStyleInput from './TravelStyleInput';
import Itinerary from './Itinerary';
import axios from 'axios';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    interests: [],
    travelStyle: ''
  });
  const [aiResponse, setAiResponse] = useState(null);

  // Function to handle moving to the next step
  const nextStep = async (data) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
  
    if (step === 4) {
      // Immediately move to the next step so a spinner can be shown whilst waiting for the API response
      setStep(5);
  
      try {
        const response = await axios.post('http://localhost:5000/chat', { prompt: updatedFormData });
        setAiResponse(response.data);
      } catch (error) {
        console.error('Error fetching AI response:', error);
        setAiResponse('Failed to generate itinerary');
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
      location: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      interests: [],
      travelStyle: ''
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
              return <DateTimeInput formData={formData} nextStep={nextStep} backStep={backStep} />;
            case 3:
              return <InterestsInput formData={formData} nextStep={nextStep} backStep={backStep} />;
            case 4:
              return <TravelStyleInput formData={formData} nextStep={nextStep} backStep={backStep} />;
            case 5:
              return <Itinerary aiResponse={aiResponse} resetStep={resetStep} />;
            default:
              return <LocationInput formData={formData} nextStep={nextStep} />;
          }
        })()}
      </div>
    </div>
  );
};

export default App;
