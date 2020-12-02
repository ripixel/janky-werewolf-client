import { Action } from '../types';

export enum USER_ACTION_TYPES {
  SET_NAME = 'USER-SET_NAME',
}

export type SetNameAction = Action<string>;
export const setName = (name: string): SetNameAction => ({
  type: USER_ACTION_TYPES.SET_NAME,
  payload: name,
});
