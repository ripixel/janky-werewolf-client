import { Action as ReduxAction } from 'redux';

export interface Action<T = unknown> extends ReduxAction {
  payload: T;
}
