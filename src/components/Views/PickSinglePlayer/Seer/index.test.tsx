/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';

import { PLAYER_ROLE, PLAYER_TEAM } from '../../../../types/player';
import { VillageServiceContextProvider } from '../../../../context/VillageService';
import { getPlayersWithoutRole } from '../../../../store/connectorHelpers';

import { mapStateToProps, SeerPickSinglePlayer } from '.';

jest.mock('../../../../store/connectorHelpers', () => ({
  getPlayersWithoutRole: jest.fn((): string => 'players-without-role'),
}));

describe('Components > Views > PickSinglePlayer > Seer', () => {
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
    const result = render(<SeerPickSinglePlayer {...baseProps} />);

    expect(result.getByText('You are a Seer')).toBeInTheDocument();
    expect(
      result.getByText('Click on a player to find out their allegiance')
    ).toBeInTheDocument();
    expect(() => result.getByText('tom')).toThrow();
    expect(() => result.getByText('dave')).toThrow();
    expect(result.getByText('alex')).toBeInTheDocument();
  });

  it('handles clicking on a player correclty', () => {
    const mockVillageService = {
      seerInspectPlayer: jest.fn(),
    } as any;

    const result = render(
      <VillageServiceContextProvider value={mockVillageService}>
        <SeerPickSinglePlayer {...baseProps} />
      </VillageServiceContextProvider>
    );

    fireEvent.click(result.getByText('alex'));

    expect(mockVillageService.seerInspectPlayer).toHaveBeenCalledTimes(1);
    expect(mockVillageService.seerInspectPlayer).toHaveBeenCalledWith('alex');
  });

  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      const mockState = {
        some: 'mock-state',
      } as any;

      const result = mapStateToProps(mockState);

      expect(getPlayersWithoutRole).toHaveBeenCalledTimes(1);
      expect(getPlayersWithoutRole).toHaveBeenCalledWith(
        PLAYER_ROLE.MODERATOR,
        true,
        undefined,
        undefined
      );

      expect(result).toEqual({
        players: 'players-without-role',
      });
    });
  });
});
