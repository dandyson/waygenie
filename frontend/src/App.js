import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import LocationInput from './LocationInput';
import DateTimeInput from './DateTimeInput';
import InterestsInput from './InterestsInput';
import TravelStyleInput from './TravelStyleInput';
import Itinerary from './Itinerary';

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

  const nextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const backStep = () => {
    setStep(step - 1);
    console.log({step});
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[linear-gradient(0deg,_rgba(0,141,252,1)_0%,_rgba(4,4,247,1)_0%,_rgba(0,99,255,1)_100%)]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        {step === 1 && <LocationInput formData={formData} nextStep={(location) => nextStep({ location })} />}
        {step === 2 && <DateTimeInput formData={formData} nextStep={(data) => nextStep(data)} backStep={backStep} />}
        {step === 3 && <InterestsInput formData={formData} nextStep={(interests) => nextStep({ interests })} backStep={backStep} />}
        {step === 4 && <TravelStyleInput formData={formData} nextStep={(travelStyle) => nextStep({ travelStyle })} backStep={backStep} />}
        {step > 4 && <Itinerary formData={formData} resetStep={() => setStep(1)} />}
      </div>
    </div>
  );
};

export default App;
