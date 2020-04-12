/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { MobileLobbyView } from '.';
import { PLAYER_ROLE, PLAYER_TEAM } from '../../../../types/player';

// Mock the sub-views with testids
jest.mock('./Moderator', () => (): JSX.Element => (
  <div data-testid='moderator-view' />
));
jest.mock('./Player', () => (): JSX.Element => (
  <div data-testid='player-view' />
));

describe('<MobileLobbyView>', () => {
  describe('should render correctly', () => {
    it('as moderator', () => {
      const result = render(
        <MobileLobbyView
          self={{
            id: 'test',
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
        <MobileLobbyView
          self={{
            id: 'test',
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
