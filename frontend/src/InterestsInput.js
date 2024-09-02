import React, { useState } from 'react';

const InterestsInput = ({ nextStep, backStep }) => {
  const [interest1, setInterest1] = useState('');
  const [interest2, setInterest2] = useState('');
  const [interest3, setInterest3] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collecting all interests in an array
    const interests = [interest1, interest2, interest3].filter(Boolean);
    if (interests.length > 0) {
      nextStep(interests);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="interest1">Interest 1:</label>
      <input 
        id="interest1"
        type="text" 
        value={interest1} 
        onChange={(e) => setInterest1(e.target.value)} 
        placeholder="Enter Interest 1" 
      />
      <br />
      <label htmlFor="interest2">Interest 2:</label>
      <input 
        id="interest2"
        type="text" 
        value={interest2} 
        onChange={(e) => setInterest2(e.target.value)} 
        placeholder="Enter Interest 2" 
      />
      <br />
      <label htmlFor="interest3">Interest 3:</label>
      <input 
        id="interest3"
        type="text" 
        value={interest3} 
        onChange={(e) => setInterest3(e.target.value)} 
        placeholder="Enter Interest 3" 
      />
      <br />
      <button type="submit">Next</button>
      <button type="button" onClick={backStep}>Back</button>
    </form>
  );
};

export default InterestsInput;
