/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { DesktopViewController } from '.';
import { PHASE_NAME } from '../../../../types/phase';

// Mock the views with testids
jest.mock('../../Desktop/NoPhase', () => (): JSX.Element => (
  <div data-testid='views-desktop-nophase' />
));
jest.mock('../../Desktop/Lobby', () => (): JSX.Element => (
  <div data-testid='views-desktop-lobby' />
));

describe('<DesktopViewController>', () => {
  describe('should render correctly', () => {
    it('with no phase', () => {
      const result = render(<DesktopViewController />);

      expect(result.getByTestId('views-desktop-nophase')).toBeInTheDocument();
    });

    it('with lobby phase', () => {
      const result = render(
        <DesktopViewController phaseName={PHASE_NAME.LOBBY} />
      );

      expect(result.getByTestId('views-desktop-lobby')).toBeInTheDocument();
    });
  });
});
