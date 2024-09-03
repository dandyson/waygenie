import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import LocationInput from './LocationInput';
import DateTimeInput from './DateTimeInput';
import InterestsInput from './InterestsInput';
import TravelStyleInput from './TravelStyleInput';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: '',
    startTime: '',
    endTime: '',
    interests: [],
    travelStyle: ''
  });

  const nextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const backStep = () => {
    setStep(step - 1);
    console.log({step});
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(0deg,_rgba(0,141,252,1)_0%,_rgba(4,4,247,1)_0%,_rgba(0,99,255,1)_100%)]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        {step === 1 && <LocationInput nextStep={(location) => nextStep({ location })} />}
        {step === 2 && <DateTimeInput nextStep={(startTime, endTime) => nextStep({ startTime, endTime })} backStep={backStep} />}
        {step === 3 && <InterestsInput nextStep={(interests) => nextStep({ interests })} backStep={backStep} />}
        {step === 4 && <TravelStyleInput nextStep={(travelStyle) => nextStep({ travelStyle })} backStep={backStep} />}
        {step > 4 && <div>
          <div class="flex flex-col justify-center items-center text-center">
            <h4 class="block text-gray-700 font-extrabold mb-2 text-3xl mb-8">Generating Itinerary...</h4>
            <div class="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default App;
