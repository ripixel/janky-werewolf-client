/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { PLAYER_TEAM } from '../../../types/player';

import { WinLoss, mapStateToProps } from '.';

describe('Components > Views > WinLoss', () => {
  describe('renders as expected', () => {
    it('when good team won', () => {
      const result = render(<WinLoss winner={PLAYER_TEAM.GOOD} />);

      expect(result.getByText('Good Team Won!')).toBeInTheDocument();
    });

    it('when evil team won', () => {
      const result = render(<WinLoss winner={PLAYER_TEAM.EVIL} />);

      expect(result.getByText('Evil Team Won!')).toBeInTheDocument();
    });
  });

  it('clears local storage items on render', () => {
    window.localStorage.setItem('lastLobbyId', 'lastLobbyId-test');

    render(<WinLoss winner={PLAYER_TEAM.GOOD} />);

    expect(window.localStorage.getItem('lastLobbyId')).toBeNull();
  });

  describe('mapStateToProps', () => {
    it('returns the correct props', () => {
      const mockState = {
        game: {
          phase: {
            data: {
              winner: PLAYER_TEAM.GOOD,
            },
          },
        },
      } as any;

      const result = mapStateToProps(mockState);

      expect(result).toEqual({
        winner: PLAYER_TEAM.GOOD,
      });
    });
  });
});
