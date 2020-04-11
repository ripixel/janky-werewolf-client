/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { DesktopNoPhaseView } from '.';
import { VillageServiceContextProvider } from '../../../../context/VillageService';

describe('<DesktopNoPhaseView>', () => {
  it('renders as expected', () => {
    const result = render(<DesktopNoPhaseView />);

    const input = result.getByPlaceholderText('Village Name');
    expect(input).toBeInTheDocument();

    const button = result.getByText('Create Village');
    expect(button).toBeInTheDocument();
  });

  it('handles create button click correctly', async () => {
    const mockVillageService: any = {
      createVillage: jest.fn(),
    };

    const result = render(
      <VillageServiceContextProvider value={mockVillageService}>
        <DesktopNoPhaseView />
      </VillageServiceContextProvider>
    );

    const input = result.getByPlaceholderText('Village Name');
    const button = result.getByText('Create Village');

    fireEvent.change(input, { target: { value: 'New' } });
    await result.findByDisplayValue('New');

    fireEvent.click(button);

    expect(mockVillageService.createVillage).toHaveBeenCalledTimes(1);
    expect(mockVillageService.createVillage).toHaveBeenCalledWith('New');
  });
});
