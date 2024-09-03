import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InterestsInput from './InterestsInput';

test('renders InterestsInput and handles input correctly', () => {
  const mockNextStep = jest.fn();
  const mockBackStep = jest.fn();
  render(<InterestsInput nextStep={mockNextStep} backStep={mockBackStep} />);

  const interest1 = screen.getByPlaceholderText('Enter Interest 1');
  const interest2 = screen.getByPlaceholderText('Enter Interest 2');
  const interest3 = screen.getByPlaceholderText('Enter Interest 3');

  fireEvent.change(screen.getByPlaceholderText('Enter Interest 1'), { target: { value: 'History' } });
  fireEvent.change(screen.getByPlaceholderText('Enter Interest 2'), { target: { value: 'Coffee' } });
  fireEvent.change(screen.getByPlaceholderText('Enter Interest 3'), { target: { value: 'Parks' } });
  fireEvent.change(interest1, { target: { value: 'History' } });
  fireEvent.change(interest2, { target: { value: 'Coffee' } });
  fireEvent.change(interest3, { target: { value: 'Parks' } });

  expect(interest1.value).toBe('History');
  expect(interest2.value).toBe('Coffee');
  expect(interest3.value).toBe('Parks');

  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);
  expect(mockNextStep).toHaveBeenCalledWith(["History", "Coffee", "Parks"]);

  const backButton = screen.getByText('Back');
  fireEvent.click(backButton);
  expect(mockBackStep).toHaveBeenCalled();
});
