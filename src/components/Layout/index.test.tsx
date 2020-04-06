/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/display-name */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Layout from '.';

// Mock the layouts with testids
jest.mock('./Desktop', () => (props: any): JSX.Element => (
  <div data-testid='desktop-layout'>{props.children}</div>
));
jest.mock('./Mobile', () => (props: any): JSX.Element => (
  <div data-testid='mobile-layout'>{props.children}</div>
));

const setUserAgent = (userAgent: string): void => {
  Object.defineProperty(navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  });
};

describe('<Layout>', () => {
  describe('renders as expected', () => {
    beforeEach(() => {
      setUserAgent('');
    });

    it('on iPad', () => {
      setUserAgent('SomeUserAgent.v1243String.iPad 123v48');
      const result = render(<Layout />);

      expect(result.getByTestId('mobile-layout')).toBeInTheDocument();
      expect(
        result.getByText('Here is where the ViewController will go')
      ).toBeInTheDocument();
    });

    it('on iPhone', () => {
      setUserAgent('SomeUserAgent.v1243String.iPhone 123v48');
      const result = render(<Layout />);

      expect(result.getByTestId('mobile-layout')).toBeInTheDocument();
      expect(
        result.getByText('Here is where the ViewController will go')
      ).toBeInTheDocument();
    });

    it('on iPod', () => {
      setUserAgent('SomeUserAgent.v1243String.iPod 123v48');
      const result = render(<Layout />);

      expect(result.getByTestId('mobile-layout')).toBeInTheDocument();
      expect(
        result.getByText('Here is where the ViewController will go')
      ).toBeInTheDocument();
    });

    it('on android', () => {
      setUserAgent('SomeUserAgent.v1243String.android 123v48');
      const result = render(<Layout />);

      expect(result.getByTestId('mobile-layout')).toBeInTheDocument();
      expect(
        result.getByText('Here is where the ViewController will go')
      ).toBeInTheDocument();
    });

    it('on webOS', () => {
      setUserAgent('SomeUserAgent.v1243String.webOS 123v48');
      const result = render(<Layout />);

      expect(result.getByTestId('mobile-layout')).toBeInTheDocument();
      expect(
        result.getByText('Here is where the ViewController will go')
      ).toBeInTheDocument();
    });

    it('on desktop', () => {
      setUserAgent('SomeUserAgent.v1243String.Mozilla 123v48');
      const result = render(<Layout />);

      expect(result.getByTestId('desktop-layout')).toBeInTheDocument();
      expect(
        result.getByText('Here is where the ViewController will go')
      ).toBeInTheDocument();
    });
  });
});
