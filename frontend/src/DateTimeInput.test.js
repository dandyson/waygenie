import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DateTimeInput from './DateTimeInput';

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
