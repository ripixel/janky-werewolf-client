/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { MobileViewController } from '.';

// Mock the views with testids
jest.mock('../../Mobile/NoPhase', () => (): JSX.Element => (
  <div data-testid='views-mobile-nophase' />
));

describe('<MobileViewController>', () => {
  describe('should render correctly', () => {
    it('with no phase', () => {
      const result = render(<MobileViewController />);

      expect(result.getByTestId('views-mobile-nophase')).toBeInTheDocument();
    });
  });
});
