import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TravelStyleInput from './TravelStyleInput';

test('renders TravelStyleInput and handles input correctly', () => {
  const mockNextStep = jest.fn();
  const mockBackStep = jest.fn();
  
  render(<TravelStyleInput nextStep={mockNextStep} backStep={mockBackStep} />);
  
  // Select the dropdown element
  const selectElement = screen.getByLabelText("What's your travelling style?");
  
  // Change the value of the select element
  fireEvent.change(selectElement, { target: { value: 'laid-back' } });
  expect(selectElement.value).toBe('laid-back');
  
  // Submit the form
  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);
  expect(mockNextStep).toHaveBeenCalledWith('laid-back');
  
  // Click the back button
  const backButton = screen.getByText('Back');
  fireEvent.click(backButton);
  expect(mockBackStep).toHaveBeenCalled();
});
