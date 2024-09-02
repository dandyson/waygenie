import React, { useState } from 'react';

const DateTimeInput = ({ nextStep, backStep }) => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && startTime && endDate && endTime) {
      nextStep({
        startTime: `${startDate}T${startTime}`,
        endTime: `${endDate}T${endTime}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>When are you visiting?</label>
      <div>
        <label htmlFor="start-date">Start Date:</label>
        <input 
          id="start-date" 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="start-time">Start Time:</label>
        <input 
          id="start-time" 
          type="time" 
          value={startTime} 
          onChange={(e) => setStartTime(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="end-date">End Date:</label>
        <input 
          id="end-date" 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="end-time">End Time:</label>
        <input 
          id="end-time" 
          type="time" 
          value={endTime} 
          onChange={(e) => setEndTime(e.target.value)} 
        />
      </div>
      <button type="submit">Next</button>
      <button type="button" onClick={backStep}>Back</button>
    </form>
  );
};

export default DateTimeInput;
