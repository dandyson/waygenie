import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import React from 'react';
import { Auth0ContextInterface, User } from '@auth0/auth0-react';
import { AxiosResponse } from 'axios';

// Configure testing-library to use React.act
configure({ asyncUtilTimeout: 5000 });

// Mock modules
jest.mock('@auth0/auth0-react', () => {
  const auth0 = jest.requireActual('@auth0/auth0-react');
  return {
    ...auth0,
    useAuth0: jest.fn(),
  };
});

jest.mock('axios', () => {
  const mockAxiosResponse = {
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  return {
    get: jest.fn().mockResolvedValue(mockAxiosResponse),
    post: jest.fn().mockResolvedValue(mockAxiosResponse),
    isAxiosError: jest.fn().mockReturnValue(false),
  };
});

// Mock fetchItinerary
jest.mock('./api/fetchItinerary', () => {
  return jest.fn().mockResolvedValue({
    status: 'completed',
    result: {
      introduction: '',
      itinerary: '',
      events: [],
      travelMethods: '',
    },
  });
});

// Suppress React Router v7 warnings in tests
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes?.('React Router')) {
    return;
  }
  originalConsoleWarn(...args);
};

// Suppress act() warnings
const originalError = console.error;
console.error = (...args) => {
  if (args[0]?.includes?.('ReactDOMTestUtils.act')) {
    return;
  }
  originalError(...args);
}; 