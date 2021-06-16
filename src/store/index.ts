/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from 'redux';
import rootReducer, { State } from './reducers';
import { Action } from './actions/types';

export const store = createStore<State, Action, unknown, unknown>(
  rootReducer,
  // Enable Redux Devtools
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
