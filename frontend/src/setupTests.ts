import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import React from 'react';

// Configure testing-library to use React.act
configure({ asyncUtilTimeout: 5000 });

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