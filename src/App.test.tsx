import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders', () => {
    render(<App />);
    const H1 = screen.getByText(/Redux/i);
    expect(H1).toBeInTheDocument();
  })
});