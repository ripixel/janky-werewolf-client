/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { MobileNoPhaseView } from '.';
import { VillageServiceContextProvider } from '../../../../context/VillageService';

describe('<MobileNoPhaseView>', () => {
  it('renders as expected', () => {
    const result = render(<MobileNoPhaseView />);

    const nameInput = result.getByPlaceholderText('Player Name');
    expect(nameInput).toBeInTheDocument();

    const gameCodeInput = result.getByPlaceholderText('Game Code');
    expect(gameCodeInput).toBeInTheDocument();

    const button = result.getByText('Join Village');
    expect(button).toBeInTheDocument();
  });

  it('handles create button click correctly', async () => {
    const mockVillageService: any = {
      joinVillage: jest.fn(),
    };

    const result = render(
      <VillageServiceContextProvider value={mockVillageService}>
        <MobileNoPhaseView />
      </VillageServiceContextProvider>
    );

    const nameInput = result.getByPlaceholderText('Player Name');
    const gameCodeInput = result.getByPlaceholderText('Game Code');

    const button = result.getByText('Join Village');

    fireEvent.change(nameInput, { target: { value: 'Dave' } });
    fireEvent.change(gameCodeInput, { target: { value: '123' } });

    await result.findByDisplayValue('123');

    fireEvent.click(button);

    expect(mockVillageService.joinVillage).toHaveBeenCalledTimes(1);
    expect(mockVillageService.joinVillage).toHaveBeenCalledWith('Dave', '123');
  });
});
