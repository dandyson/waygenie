import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DateTimeInput from './DateTimeInput';

test('renders DateTimeInput with default values', () => {
  render(<DateTimeInput nextStep={() => {}} backStep={() => {}} />);

  // THe component should render with the default start date and time as now, and the end date and time as one hour ahead
  
  const startDateInput = screen.getByLabelText('Start Date:');
  const startTimeInput = screen.getByLabelText('Start Time:');
  const endDateInput = screen.getByLabelText('End Date:');
  const endTimeInput = screen.getByLabelText('End Time:');

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hh = today.getHours();
  let min = today.getMinutes();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const todayDate = `${yyyy}-${mm}-${dd}`;
  const todayTime = `${hh < 10 ? '0' : ''}${hh}:${min < 10 ? '0' : ''}${min}`;
  
  const oneHourAhead = new Date(today.getTime() + 60 * 60 * 1000);
  let endHH = oneHourAhead.getHours();
  let endMin = oneHourAhead.getMinutes();
  const endDate = `${oneHourAhead.getFullYear()}-${(oneHourAhead.getMonth() + 1).toString().padStart(2, '0')}-${oneHourAhead.getDate().toString().padStart(2, '0')}`;
  const endTime = `${endHH < 10 ? '0' : ''}${endHH}:${endMin < 10 ? '0' : ''}${endMin}`;

  expect(startDateInput.value).toBe(todayDate);
  expect(startTimeInput.value).toBe(todayTime);
  expect(endDateInput.value).toBe(endDate);
  expect(endTimeInput.value).toBe(endTime);
});

test('renders DateTimeInput with labels and handles date and time changes', async () => {
  const mockNextStep = jest.fn();
  const mockBackStep = jest.fn();
  
  render(<DateTimeInput nextStep={mockNextStep} backStep={mockBackStep} />);
  
  const startDateInput = screen.getByLabelText('Start Date:');
  const startTimeInput = screen.getByLabelText('Start Time:');
  const endDateInput = screen.getByLabelText('End Date:');
  const endTimeInput = screen.getByLabelText('End Time:');
  
  fireEvent.change(startDateInput, { target: { value: '2024-09-01' } });
  fireEvent.change(startTimeInput, { target: { value: '10:00' } });
  fireEvent.change(endDateInput, { target: { value: '2024-09-02' } });
  fireEvent.change(endTimeInput, { target: { value: '15:00' } });
  
  fireEvent.click(screen.getByText('Next'));
  
  expect(mockNextStep).toHaveBeenCalledWith({
    startTime: '2024-09-01T10:00',
    endTime: '2024-09-02T15:00',
  });
});
