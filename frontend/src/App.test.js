import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders App and navigates through steps', () => {
  render(<App />);

  // Step 1: LocationInput
  expect(screen.getByText('Where are you visiting?')).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText('Enter a city'), { target: { value: 'London' } });
  fireEvent.click(screen.getByText('Next'));

  // Step 2: DateTimeInput
  expect(screen.getByText('When are you visiting?')).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText('Enter a city'), { target: { value: '2024-09-02 10:00' } });
  fireEvent.click(screen.getByText('Next'));

  // Step 3: InterestsInput
  expect(screen.getByText('What sort of things would you like to see?')).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText('Enter a city'), { target: { value: 'History' } });
  fireEvent.click(screen.getByText('Next'));

  // Step 4: TravelStyleInput
  expect(screen.getByText("What's your travelling style?")).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText('Enter a city'), { target: { value: 'Laid-back' } });
  fireEvent.click(screen.getByText('Next'));

  // Final Step
  expect(screen.getByText('Itinerary generated!')).toBeInTheDocument();
});
