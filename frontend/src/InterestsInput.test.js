import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InterestsInput from './InterestsInput';

test('renders InterestsInput and handles input correctly', () => {
  const mockNextStep = jest.fn();
  const mockBackStep = jest.fn();
  render(<InterestsInput nextStep={mockNextStep} backStep={mockBackStep} />);

  const input = screen.getByPlaceholderText('Enter a city');
  fireEvent.change(input, { target: { value: 'History' } });
  expect(input.value).toBe('History');

  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);
  expect(mockNextStep).toHaveBeenCalledWith('History');

  const backButton = screen.getByText('Back');
  fireEvent.click(backButton);
  expect(mockBackStep).toHaveBeenCalled();
});
