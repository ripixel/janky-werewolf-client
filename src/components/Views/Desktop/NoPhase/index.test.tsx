import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { DesktopNoPhaseView } from '.';

describe('<DesktopNoPhaseView>', () => {
  it('renders as expected', () => {
    const mockOnClick = jest.fn();
    const result = render(
      <DesktopNoPhaseView onCreateVillageClick={mockOnClick} />
    );

    const input = result.getByPlaceholderText('Village Name');
    expect(input).toBeInTheDocument();

    const button = result.getByText('Create Village');
    expect(button).toBeInTheDocument();
  });

  it('handles create button click correctly', async () => {
    const mockOnClick = jest.fn();
    const result = render(
      <DesktopNoPhaseView onCreateVillageClick={mockOnClick} />
    );

    const input = result.getByPlaceholderText('Village Name');
    const button = result.getByText('Create Village');

    fireEvent.change(input, { target: { value: 'New' } });
    await result.findByDisplayValue('New');

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('New');
  });
});
