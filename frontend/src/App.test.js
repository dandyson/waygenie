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

  expect(screen.getByLabelText('Start Date:')).toBeInTheDocument();
  expect(screen.getByLabelText('Start Time:')).toBeInTheDocument();
  expect(screen.getByLabelText('End Date:')).toBeInTheDocument();
  expect(screen.getByLabelText('End Time:')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Start Date:'), { target: { value: '2024-09-01' } });
  fireEvent.change(screen.getByLabelText('Start Time:'), { target: { value: '10:00' } });
  fireEvent.change(screen.getByLabelText('End Date:'), { target: { value: '2024-09-02' } });
  fireEvent.change(screen.getByLabelText('End Time:'), { target: { value: '15:00' } });

  fireEvent.click(screen.getByText('Next'));

  // Step 3: InterestsInput
  expect(screen.getByLabelText('Interest 1:')).toBeInTheDocument();
  expect(screen.getByLabelText('Interest 2:')).toBeInTheDocument();
  expect(screen.getByLabelText('Interest 3:')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Interest 1:'), { target: { value: 'History' } });
  fireEvent.change(screen.getByLabelText('Interest 2:'), { target: { value: 'Coffee' } });
  fireEvent.change(screen.getByLabelText('Interest 3:'), { target: { value: 'Parks' } });

  fireEvent.click(screen.getByText('Next'));

  // Step 4: TravelStyleInput
  expect(screen.getByText("What's your travelling style?")).toBeInTheDocument();
  const selectElement = screen.getByLabelText("What's your travelling style?");
  fireEvent.change(selectElement, { target: { value: 'laid-back' } });
  expect(selectElement.value).toBe('laid-back');
  // test change of value
  fireEvent.change(selectElement, { target: { value: 'everything' } });
  expect(selectElement.value).toBe('everything');
  
  fireEvent.click(screen.getByText('Next'));

  // Final Step
  expect(screen.getByText('Itinerary generated!')).toBeInTheDocument();
});
