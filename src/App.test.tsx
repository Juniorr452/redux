import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app', () => {
  render(<App />);
  const H1 = screen.getByText(/Redux/i);
  expect(H1).toBeInTheDocument();
});
