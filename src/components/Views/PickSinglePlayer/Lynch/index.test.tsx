/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';

import { PLAYER_TEAM } from '../../../../types/player';
import { VillageServiceContextProvider } from '../../../../context/VillageService';
import { getAllPlayers } from '../../../../store/connectorHelpers';

import { mapStateToProps, LynchPickSinglePlayer } from '.';

jest.mock('../../../../store/connectorHelpers', () => ({
  getAllPlayers: jest.fn((): string => 'all-players'),
}));

describe('Components > Views > PickSinglePlayer > Lynch', () => {
  const baseProps = {
    players: [
      {
        name: 'tom',
        attributes: {
          alive: true,
          team: PLAYER_TEAM.EVIL,
        },
      },
      {
        name: 'dave',
        attributes: {
          alive: false,
          team: PLAYER_TEAM.UNKNOWN,
        },
      },
      {
        name: 'alex',
        attributes: {
          alive: true,
          team: PLAYER_TEAM.UNKNOWN,
        },
      },
    ] as any[],
  };

  it('renders as expected', () => {
    const result = render(<LynchPickSinglePlayer {...baseProps} />);

    expect(result.getByText('You are the Moderator')).toBeInTheDocument();
    expect(
      result.getByText('Click on a player to lynch them')
    ).toBeInTheDocument();
    expect(result.getByText('tom')).toBeInTheDocument();
    expect(() => result.getByText('dave')).toThrow();
    expect(result.getByText('alex')).toBeInTheDocument();
    expect(result.getByText('Sleep Without Lynching')).toBeInTheDocument();
  });

  it('handles clicking on a player correclty', () => {
    const mockVillageService = {
      lynchPlayer: jest.fn(),
    } as any;

    const result = render(
      <VillageServiceContextProvider value={mockVillageService}>
        <LynchPickSinglePlayer {...baseProps} />
      </VillageServiceContextProvider>
    );

    fireEvent.click(result.getByText('alex'));

    expect(mockVillageService.lynchPlayer).toHaveBeenCalledTimes(1);
    expect(mockVillageService.lynchPlayer).toHaveBeenCalledWith('alex');
  });

  it('handles clicking sleep correclty', () => {
    const mockVillageService = {
      sleepNow: jest.fn(),
    } as any;

    const result = render(
      <VillageServiceContextProvider value={mockVillageService}>
        <LynchPickSinglePlayer {...baseProps} />
      </VillageServiceContextProvider>
    );

    fireEvent.click(result.getByText('Sleep Without Lynching'));

    expect(mockVillageService.sleepNow).toHaveBeenCalledTimes(1);
  });

  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      const mockState = {
        some: 'mock-state',
      } as any;

      const result = mapStateToProps(mockState);

      expect(getAllPlayers).toHaveBeenCalledTimes(1);
      expect(getAllPlayers).toHaveBeenCalledWith(mockState, true);

      expect(result).toEqual({
        players: 'all-players',
      });
    });
  });
});
