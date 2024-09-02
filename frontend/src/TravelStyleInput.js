import React, { useState } from 'react';

const TravelStyleInput = ({ nextStep, backStep }) => {
  const [travelStyle, setTravelStyle] = useState('');

  const handleChange = (e) => {
    setTravelStyle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (travelStyle) {
      nextStep(travelStyle);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="travel-style">What's your travelling style?</label>
      <select 
        name="travel-style" 
        id="travel-style" 
        value={travelStyle} 
        onChange={handleChange}
      >
        <option value="laid-back">Laid Back</option>
        <option value="everything">See as much as possible</option>
        <option value="none">I Don't Mind</option>
      </select>
      <br />
      <button type="submit">Next</button>
      <button type="button" onClick={backStep}>Back</button>
    </form>
  );
};

export default TravelStyleInput;
