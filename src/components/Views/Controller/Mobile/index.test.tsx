/* eslint-disable @typescript-eslint/no-explicit-any,react/display-name */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { MobileViewController } from '.';
import { PHASE_NAME } from '../../../../types/phase';

// Mock the views with testids
jest.mock('../../Mobile/NoPhase', () => (): JSX.Element => (
  <div data-testid='views-mobile-nophase' />
));
jest.mock('../../Mobile/Lobby', () => (): JSX.Element => (
  <div data-testid='views-mobile-lobby' />
));

describe('<MobileViewController>', () => {
  describe('should render correctly', () => {
    it('with no phase', () => {
      const result = render(<MobileViewController />);

      expect(result.getByTestId('views-mobile-nophase')).toBeInTheDocument();
    });

    it('with lobby phase', () => {
      const result = render(
        <MobileViewController phaseName={PHASE_NAME.LOBBY} />
      );

      expect(result.getByTestId('views-mobile-lobby')).toBeInTheDocument();
    });
  });
});
