import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateTimeInput from './DateTimeInput';

test('renders DateTimeInput and handles input correctly', () => {
  const mockNextStep = jest.fn();
  const mockBackStep = jest.fn();
  render(<DateTimeInput nextStep={mockNextStep} backStep={mockBackStep} />);

  const input = screen.getByPlaceholderText('Enter a city');
  fireEvent.change(input, { target: { value: '2024-09-02 10:00' } });
  expect(input.value).toBe('2024-09-02 10:00');

  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);
  expect(mockNextStep).toHaveBeenCalledWith('2024-09-02 10:00');

  const backButton = screen.getByText('Back');
  fireEvent.click(backButton);
  expect(mockBackStep).toHaveBeenCalled();
});
