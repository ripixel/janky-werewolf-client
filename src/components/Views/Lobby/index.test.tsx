/* eslint-disable @typescript-eslint/no-explicit-any,react/display-name */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { LobbyView } from '.';
import { PLAYER_ROLE, PLAYER_TEAM } from '../../../types/player';

// Mock the sub-views with testids
jest.mock('./Moderator', () => (): JSX.Element => (
  <div data-testid='moderator-view' />
));
jest.mock('./Player', () => (): JSX.Element => (
  <div data-testid='player-view' />
));

describe('<LobbyView>', () => {
  describe('should render correctly', () => {
    it('as moderator', () => {
      const result = render(
        <LobbyView
          self={{
            name: 'Matt',
            attributes: {
              alive: true,
              role: PLAYER_ROLE.MODERATOR,
              team: PLAYER_TEAM.UNKNOWN,
            },
          }}
        />
      );

      expect(result.getByTestId('moderator-view')).toBeInTheDocument();
    });

    it('as player', () => {
      const result = render(
        <LobbyView
          self={{
            name: 'James',
            attributes: {
              alive: true,
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
            },
          }}
        />
      );

      expect(result.getByTestId('player-view')).toBeInTheDocument();
    });
  });
});
