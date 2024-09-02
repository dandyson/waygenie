import React, { useState } from 'react';

const InterestsInput = ({ nextStep, backStep }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      nextStep(location);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>What sort of things would you like to see?</label>
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

export default InterestsInput;
