/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/display-name */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import App from '.';
import { render } from '@testing-library/react';

// Mock components with a testids
jest.mock('../../store', () => 'storemock');
jest.mock('../Layout', () => (props: any): JSX.Element => {
  return <div data-testid='layout'>{props.children}</div>;
});
jest.mock('../ViewController', () => (): JSX.Element => (
  <div data-testid='viewcontroller' />
));
jest.mock('react-redux', () => ({
  Provider: (props: any): JSX.Element => {
    return (
      <div data-testid='reduxprovider' data-store={props.store}>
        {props.children}
      </div>
    );
  },
}));
jest.mock('../../context/VillageService', () => ({
  VillageServiceContextProvider: (props: any): JSX.Element => {
    return (
      <div data-testid='villageservicecontextprovider' data-value={props.value}>
        {props.children}
      </div>
    );
  },
  initVillageServiceContext: (): string => 'initVillageServiceContextReturn',
}));

describe('Components > App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders as expected', () => {
    const result = render(<App />);

    expect(
      result.getByTestId('villageservicecontextprovider')
    ).toBeInTheDocument();
    expect(result.getByTestId('villageservicecontextprovider')).toHaveAttribute(
      'data-value',
      'initVillageServiceContextReturn'
    );
    expect(result.getByTestId('layout')).toBeInTheDocument();
    expect(result.getByTestId('viewcontroller')).toBeInTheDocument();
    expect(result.getByTestId('reduxprovider')).toBeInTheDocument();
    expect(result.getByTestId('reduxprovider')).toHaveAttribute(
      'data-store',
      'storemock'
    );
  });
});
