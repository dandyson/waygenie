import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LocationInput from './LocationInput';

test('renders LocationInput and handles input correctly', () => {
  const mockNextStep = jest.fn();
  render(<LocationInput nextStep={mockNextStep} />);

  const input = screen.getByPlaceholderText('Enter a location...');
  fireEvent.change(input, { target: { value: 'London' } });
  expect(input.value).toBe('London');

  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);
  expect(mockNextStep).toHaveBeenCalledWith('London');
});
