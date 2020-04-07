/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { Button } from '.';

describe('<Button>', () => {
  it('should render correctly', () => {
    const mockOnClick = jest.fn();
    const result = render(<Button onClick={mockOnClick}>Test</Button>);

    const button = result.getByText('Test');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('should execute passed function on click', () => {
    const mockOnClick = jest.fn();
    const result = render(<Button onClick={mockOnClick}>Test</Button>);

    const button = result.getByText('Test');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
