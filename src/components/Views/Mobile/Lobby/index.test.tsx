/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { MobileLobbyView } from '.';

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
      const result = render(<MobileLobbyView isModerator={true} />);

      expect(result.getByTestId('moderator-view')).toBeInTheDocument();
    });

    it('as player', () => {
      const result = render(<MobileLobbyView isModerator={false} />);

      expect(result.getByTestId('player-view')).toBeInTheDocument();
    });
  });
});
