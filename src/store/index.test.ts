import { createStore } from 'redux';

import store from '.';
store; // stops no-unused-vars issue

jest.mock('redux');
jest.mock('./reducers', () => 'rootReducer');

describe('store', () => {
  it('inits correctly', () => {
    expect(createStore as jest.Mock).toHaveBeenCalledTimes(1);
    expect(createStore as jest.Mock).toHaveBeenCalledWith(
      'rootReducer',
      undefined // Redux devtools
    );
  });
});
