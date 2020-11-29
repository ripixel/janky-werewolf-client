/* eslint-disable @typescript-eslint/no-explicit-any,react/display-name */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { DesktopViewController } from '.';

// Mock the views with testids
jest.mock('../../Desktop/NoPhase', () => (): JSX.Element => (
  <div data-testid='views-desktop-nophase' />
));

describe('<DesktopViewController>', () => {
  describe('should render correctly', () => {
    it('with no phase', () => {
      const result = render(<DesktopViewController />);

      expect(result.getByTestId('views-desktop-nophase')).toBeInTheDocument();
    });
  });
});
