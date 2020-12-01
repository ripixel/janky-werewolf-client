/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/display-name */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import App from '.';
import { render } from '@testing-library/react';

// Mock components with a testids
jest.mock(
  '../Layout',
  () => (props: { children: React.ReactNode }): JSX.Element => {
    return <div data-testid='layout'>{props.children}</div>;
  }
);
jest.mock('../ViewController', () => (): JSX.Element => (
  <div data-testid='viewcontroller' />
));

// Mock the redux provider with a testid and throw an error if no Store prop passed so test fails
jest.mock('react-redux', () => ({
  Provider: (props: any): JSX.Element => {
    if (!props.store) {
      throw new Error('No Store passed');
    }
    return <div data-testid='provider'>{props.children}</div>;
  },
}));

describe('<App>', () => {
  it('renders as expected', () => {
    const result = render(<App />);

    expect(result.getByTestId('layout')).toBeInTheDocument();
    expect(result.getByTestId('viewcontroller')).toBeInTheDocument();
    expect(result.getByTestId('provider')).toBeInTheDocument();
  });
});
