/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { JoinOrCreate } from '.';
import { VillageServiceContextProvider } from '../../../context/VillageService';

describe('<JoinOrCreate />', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders as expected', () => {
    const result = render(<JoinOrCreate />);

    const nameInput = result.getByPlaceholderText('Player Name');
    expect(nameInput).toBeInTheDocument();

    const lobbyIdInput = result.getByPlaceholderText('Game Code');
    expect(lobbyIdInput).toBeInTheDocument();

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
          <JoinOrCreate />
        </VillageServiceContextProvider>
      );

      const nameInput = result.getByPlaceholderText('Player Name');
      const lobbyIdInput = result.getByPlaceholderText('Game Code');

      fireEvent.change(nameInput, { target: { value: 'Dave' } });
      fireEvent.change(lobbyIdInput, { target: { value: 'abcd' } });

      await result.findByDisplayValue('ABCD');

      fireEvent.click(result.getByText('Join Village'));

      expect(mockVillageService.createVillage).toHaveBeenCalledTimes(0);
      expect(mockVillageService.joinVillage).toHaveBeenCalledTimes(1);
      expect(mockVillageService.joinVillage).toHaveBeenCalledWith(
        'Dave',
        'ABCD'
      );
    });

    it('with no game code', async () => {
      const mockVillageService: any = {
        joinVillage: jest.fn(),
        createVillage: jest.fn(),
      };

      const result = render(
        <VillageServiceContextProvider value={mockVillageService}>
          <JoinOrCreate />
        </VillageServiceContextProvider>
      );

      const nameInput = result.getByPlaceholderText('Player Name');

      fireEvent.change(nameInput, { target: { value: 'Dave' } });

      await result.findByDisplayValue('Dave');

      fireEvent.click(result.getByText('Create Village'));

      expect(mockVillageService.joinVillage).toHaveBeenCalledTimes(0);
      expect(mockVillageService.createVillage).toHaveBeenCalledTimes(1);
      expect(mockVillageService.createVillage).toHaveBeenCalledWith('Dave');
    });

    it('does not function without a player name', () => {
      const mockVillageService: any = {
        joinVillage: jest.fn(),
        createVillage: jest.fn(),
      };

      const result = render(
        <VillageServiceContextProvider value={mockVillageService}>
          <JoinOrCreate />
        </VillageServiceContextProvider>
      );

      fireEvent.click(result.getByText('Create Village'));

      expect(mockVillageService.createVillage).toHaveBeenCalledTimes(0);
      expect(mockVillageService.joinVillage).toHaveBeenCalledTimes(0);
    });
  });
});
