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

  switch (step) {
    case 1:
      return <LocationInput nextStep={(location) => nextStep({ location })} backStep={() => backStep()} />;
    case 2:
      return <DateTimeInput nextStep={(startTime, endTime) => nextStep({ startTime, endTime })} backStep={() => backStep()} />;
    case 3:
      return <InterestsInput nextStep={(interests) => nextStep({ interests })} backStep={() => backStep()} />;
    case 4:
      return <TravelStyleInput nextStep={(travelStyle) => nextStep({ travelStyle })} backStep={() => backStep()} />;
    default:
      return <div>Itinerary generated!</div>;
  }
};

export default App;
