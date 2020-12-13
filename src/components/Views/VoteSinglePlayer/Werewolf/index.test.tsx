/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { VillageServiceContextProvider } from '../../../../context/VillageService';
import { getWerewolfVotes } from '../../../../store/connectorHelpers';

import { mapStateToProps, WerewolfVoteSinglePlayer } from '.';

jest.mock('../../../../store/connectorHelpers', () => ({
  getWerewolfVotes: jest.fn((): string => 'werewolf-votes'),
}));

describe('Components > Views > VoteSinglePlayer > Werewolf', () => {
  const baseProps = {
    werewolfVotes: {
      alex: 1,
      harry: 3,
    },
  };

  it('renders as expected', () => {
    const result = render(<WerewolfVoteSinglePlayer {...baseProps} />);

    expect(result.getByText('You are a Werewolf')).toBeInTheDocument();
    expect(
      result.getByText('Click on a player to vote to kill them')
    ).toBeInTheDocument();
    expect(
      result.getByText('A player is only killed when all werewolf votes agree')
    ).toBeInTheDocument();
    expect(result.getByText('alex - Current votes 1')).toBeInTheDocument();
    expect(result.getByText('harry - Current votes 3')).toBeInTheDocument();
  });

  describe('handles interactions correctly', () => {
    it('handles clicking on player names', () => {
      const mockVillageService = {
        werewolfVoteForPlayer: jest.fn(),
      } as any;

      const result = render(
        <VillageServiceContextProvider value={mockVillageService}>
          <WerewolfVoteSinglePlayer {...baseProps} />
        </VillageServiceContextProvider>
      );

      fireEvent.click(result.getByText('alex - Current votes 1'));

      expect(mockVillageService.werewolfVoteForPlayer).toHaveBeenCalledTimes(1);
      expect(mockVillageService.werewolfVoteForPlayer).toHaveBeenCalledWith(
        'alex'
      );
    });
  });

  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      const mockState = {
        some: 'mock-state',
      } as any;

      const result = mapStateToProps(mockState);

      expect(getWerewolfVotes).toHaveBeenCalledTimes(1);
      expect(getWerewolfVotes).toHaveBeenCalledWith(mockState);

      expect(result).toEqual({
        werewolfVotes: 'werewolf-votes',
      });
    });
  });
});
