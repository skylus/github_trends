import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  })

  it('should render checkbox', () => {
    const checkbox = screen.getByText(/Show only starred/i);
    expect(checkbox).toBeInTheDocument();
  })
});
