// Itinerary.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Itinerary from './Itinerary';

test('renders Itinerary component', () => {
  render(<Itinerary />);
  
  // Check if the heading is in the document
  const headingElement = screen.getByText(/YOUR ITINERARY:/i);
  expect(headingElement).toBeInTheDocument();

  // Check if the paragraph is in the document
  const paragraphElement = screen.getByText(/LUNCH - Franco Mancas/i);
  expect(paragraphElement).toBeInTheDocument();
});
