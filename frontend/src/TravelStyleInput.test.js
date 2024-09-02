import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TravelStyleInput from './TravelStyleInput';

test('renders TravelStyleInput and handles input correctly', () => {
  const mockNextStep = jest.fn();
  const mockBackStep = jest.fn();
  render(<TravelStyleInput nextStep={mockNextStep} backStep={mockBackStep} />);

  const input = screen.getByPlaceholderText('Enter a city');
  fireEvent.change(input, { target: { value: 'Laid-back' } });
  expect(input.value).toBe('Laid-back');

  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);
  expect(mockNextStep).toHaveBeenCalledWith('Laid-back');

  const backButton = screen.getByText('Back');
  fireEvent.click(backButton);
  expect(mockBackStep).toHaveBeenCalled();
});
