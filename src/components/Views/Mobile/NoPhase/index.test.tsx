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

    const button = result.getByText('Create Village');
    expect(button).toBeInTheDocument();
  });

  describe('handles button click correctly', () => {
    it('with game code', async () => {
      const mockVillageService: any = {
        joinVillage: jest.fn(),
        createVillage: jest.fn(),
      };

      const result = render(
        <VillageServiceContextProvider value={mockVillageService}>
          <MobileNoPhaseView />
        </VillageServiceContextProvider>
      );

      const nameInput = result.getByPlaceholderText('Player Name');
      const gameCodeInput = result.getByPlaceholderText('Game Code');

      fireEvent.change(nameInput, { target: { value: 'Dave' } });
      fireEvent.change(gameCodeInput, { target: { value: '123' } });

      await result.findByDisplayValue('123');

      fireEvent.click(result.getByText('Join Village'));

      expect(mockVillageService.createVillage).toHaveBeenCalledTimes(0);
      expect(mockVillageService.joinVillage).toHaveBeenCalledTimes(1);
      expect(mockVillageService.joinVillage).toHaveBeenCalledWith(
        'Dave',
        '123'
      );
    });

    it('with no game code', async () => {
      const mockVillageService: any = {
        joinVillage: jest.fn(),
        createVillage: jest.fn(),
      };

      const result = render(
        <VillageServiceContextProvider value={mockVillageService}>
          <MobileNoPhaseView />
        </VillageServiceContextProvider>
      );

      const nameInput = result.getByPlaceholderText('Player Name');

      fireEvent.change(nameInput, { target: { value: 'Dave' } });

      await result.findByDisplayValue('Dave');

      fireEvent.click(result.getByText('Create Village'));

      expect(mockVillageService.joinVillage).toHaveBeenCalledTimes(0);
      expect(mockVillageService.createVillage).toHaveBeenCalledTimes(1);
      expect(mockVillageService.createVillage).toHaveBeenCalledWith(
        'Janktown',
        'Dave'
      );
    });

    it('does not function without a player name', () => {
      const mockVillageService: any = {
        joinVillage: jest.fn(),
        createVillage: jest.fn(),
      };

      const result = render(
        <VillageServiceContextProvider value={mockVillageService}>
          <MobileNoPhaseView />
        </VillageServiceContextProvider>
      );

      fireEvent.click(result.getByText('Create Village'));

      expect(mockVillageService.createVillage).toHaveBeenCalledTimes(0);
      expect(mockVillageService.joinVillage).toHaveBeenCalledTimes(0);
    });
  });
});
