import { Action } from 'redux';

export interface IAction<T = unknown> extends Action {
  payload: T;
}
