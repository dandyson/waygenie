import React, { useState } from 'react';

const TravelStyleInput = ({ nextStep, backStep }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      nextStep(location);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>What's your travelling style?</label>
      <input 
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Enter a city" 
      />
      <button type="submit">Next</button>
      <button type="button" onClick={backStep}>Back</button>
    </form>
  );
};

export default TravelStyleInput;
