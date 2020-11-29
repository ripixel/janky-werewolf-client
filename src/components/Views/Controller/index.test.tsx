/* eslint-disable @typescript-eslint/no-explicit-any,react/display-name */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { PHASE_NAME } from '../../../types/phase';

import { ViewController } from '.';

// Mock the sub-controllers with testids
jest.mock('./Desktop', () => (props: any): JSX.Element => (
  <div data-testid='desktop-controller' data-phasename={props.phaseName} />
));
jest.mock('./Mobile', () => (props: any): JSX.Element => (
  <div data-testid='mobile-controller' data-phasename={props.phaseName} />
));

describe('<ViewController>', () => {
  describe('should render correctly', () => {
    it('on mobile', () => {
      const result = render(
        <ViewController isMobile={true} phaseName={PHASE_NAME.LOBBY} />
      );

      const subController = result.getByTestId('mobile-controller');
      expect(subController).toBeInTheDocument();
      expect(subController).toHaveAttribute('data-phaseName', PHASE_NAME.LOBBY);
    });

    it('on desktop', () => {
      const result = render(
        <ViewController isMobile={false} phaseName={PHASE_NAME.LOBBY} />
      );

      const subController = result.getByTestId('desktop-controller');
      expect(subController).toBeInTheDocument();
      expect(subController).toHaveAttribute('data-phaseName', PHASE_NAME.LOBBY);
    });
  });
});
