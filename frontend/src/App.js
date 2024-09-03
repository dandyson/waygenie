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
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {step === 1 && <LocationInput nextStep={(location) => nextStep({ location })} backStep={backStep} />}
        {step === 2 && <DateTimeInput nextStep={(startTime, endTime) => nextStep({ startTime, endTime })} backStep={backStep} />}
        {step === 3 && <InterestsInput nextStep={(interests) => nextStep({ interests })} backStep={backStep} />}
        {step === 4 && <TravelStyleInput nextStep={(travelStyle) => nextStep({ travelStyle })} backStep={backStep} />}
        {step > 4 && <div>Itinerary generated!</div>}
      </div>
    </div>
  );
};

export default App;
